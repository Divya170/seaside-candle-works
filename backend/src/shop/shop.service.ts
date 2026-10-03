import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FieldErrors, isValidEmail, str, throwIfErrors, ValidationFailedException } from '../common/validation';
import { MESSAGE_STATUSES, ORDER_STATUSES, PAYMENT_STATUSES, PH, SORTS } from '../common/constants';

export interface Product {
  id: string; name: string; img: string; pos: string; lifeImg: string; lifeAlt: string; altDesc: string;
  categoryId: string; categoryLabel: string; collections: string[]; priceCents: number | null; status: 'available' | 'soldout';
  badge: string | null; featuredRank: number | null; scent: string; size: string; shortDesc: string; description: string;
  scentNotes: string; sizeDetails: string; ingredients: string; published: boolean;
}

const SETTINGS: Record<string, number> = {
  email: 200, phone: 40, address: 200, hours: 200, story: 4000, legal: 300,
  careGuide: 3000, shippingPolicy: 3000, shippingFlat: 12, taxRate: 8, paymentNote: 600, replyTime: 200,
};

@Injectable()
export class ShopService {
  constructor(private readonly db: DatabaseService) {}

  // ---------- settings ----------

  settings(): Record<string, string> {
    const rows = this.db.all<{ key: string; value: string }>('SELECT key, value FROM settings');
    const out: Record<string, string> = {};
    for (const k of Object.keys(SETTINGS)) out[k] = rows.find((r) => r.key === k)?.value ?? '';
    return out;
  }

  /** Flat shipping in cents, or null when the shop hasn't set one (shown as "confirmed by the shop"). */
  shippingCents(): number | null {
    const v = this.settings().shippingFlat;
    return v === '' ? null : Math.round(Number(v) * 100);
  }

  /** Tax rate as a fraction, or null when not set. */
  taxRate(): number | null {
    const v = this.settings().taxRate;
    return v === '' ? null : Number(v) / 100;
  }

  updateSettings(input: Record<string, unknown>) {
    const e: FieldErrors = {};
    const changes: [string, string][] = [];
    for (const [k, max] of Object.entries(SETTINGS)) {
      if (!(k in (input || {}))) continue;
      const v = str(input[k], 20000);
      if (v.length > max) e[k] = `Keep this under ${max.toLocaleString()} characters.`;
      else if (k === 'email' && v && !isValidEmail(v)) e[k] = 'Enter a valid email, like name@example.com.';
      else if (k === 'phone' && v && v.replace(/\D/g, '').length < 10) e[k] = 'Enter a 10-digit phone number.';
      else if (k === 'shippingFlat' && v && !(/^\d+(\.\d{1,2})?$/.test(v) && Number(v) <= 500)) e[k] = 'Enter an amount in dollars, like 8 or 8.50 — or leave blank.';
      else if (k === 'taxRate' && v && !(/^\d+(\.\d{1,3})?$/.test(v) && Number(v) <= 25)) e[k] = 'Enter a percentage between 0 and 25, like 6 — or leave blank.';
      else changes.push([k, v]);
    }
    throwIfErrors(e);
    this.db.transaction(() => {
      for (const [k, v] of changes) this.db.run('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', [k, v]);
    });
    return this.settings();
  }

  // ---------- catalogue ----------

  categories() {
    return this.db.all<{ id: string; label: string }>('SELECT id, label FROM categories ORDER BY sort');
  }

  collections() {
    const counts = this.db.all<{ collection_id: string; n: number }>(
      `SELECT pc.collection_id, COUNT(*) AS n FROM product_collections pc JOIN products p ON p.id = pc.product_id WHERE p.published = 1 GROUP BY pc.collection_id`,
    );
    return this.db.all<any>('SELECT * FROM collections ORDER BY sort').map((c) => ({
      id: c.id, name: c.name, img: c.img, pos: c.pos, description: c.description, count: counts.find((x) => x.collection_id === c.id)?.n ?? 0,
    }));
  }

  products(includeHidden = false): Product[] {
    const links = this.db.all<{ product_id: string; collection_id: string }>('SELECT product_id, collection_id FROM product_collections');
    return this.db
      .all<any>(
        `SELECT p.*, c.label AS category_label FROM products p JOIN categories c ON c.id = p.category_id
          ${includeHidden ? '' : 'WHERE p.published = 1'} ORDER BY p.sort, p.id`,
      )
      .map((r) => ({
        id: r.id, name: r.name, img: r.img, pos: r.pos, lifeImg: r.life_img, lifeAlt: r.life_alt, altDesc: r.alt_desc,
        categoryId: r.category_id, categoryLabel: r.category_label, collections: links.filter((l) => l.product_id === r.id).map((l) => l.collection_id),
        priceCents: r.price_cents, status: r.status, badge: r.badge, featuredRank: r.featured_rank, scent: r.scent, size: r.size,
        shortDesc: r.short_desc, description: r.description, scentNotes: r.scent_notes, sizeDetails: r.size_details,
        ingredients: r.ingredients, published: !!r.published,
      }));
  }

  /** Featured order: ranked products first (home hero cards), then the rest in catalogue order. */
  featured(): Product[] {
    const list = this.products();
    return [...list.filter((p) => p.featuredRank !== null).sort((a, b) => a.featuredRank! - b.featuredRank!), ...list.filter((p) => p.featuredRank === null)];
  }

  /** The design's search: every word must appear in the name, scent, category or collection names. */
  matches(p: Product, q: string, colNames: Record<string, string>) {
    if (!q.trim()) return true;
    const hay = [p.name, p.scent || 'scent description', p.categoryLabel, ...p.collections.map((c) => colNames[c] || '')].join(' ').toLowerCase();
    return q.toLowerCase().trim().split(/\s+/).every((t) => hay.includes(t));
  }

  /** Shop / collection grid: ?q=&cat=&col=&avail=available|soldout&sort=featured|name|price-asc|price-desc&collection= */
  search(query: Record<string, string | undefined>) {
    const q = str(query.q, 120);
    const cat = str(query.cat, 40) || 'all';
    const col = str(query.col, 40) || 'all';
    const within = str(query.collection, 40);
    const avail = str(query.avail, 20) || 'all';
    const sort = (SORTS as readonly string[]).includes(String(query.sort)) ? String(query.sort) : 'featured';
    const colNames = Object.fromEntries(this.collections().map((c) => [c.id, c.name]));
    let list = this.featured().filter(
      (p) =>
        (!within || p.collections.includes(within)) &&
        (cat === 'all' || p.categoryId === cat) &&
        (col === 'all' || p.collections.includes(col)) &&
        (avail === 'all' || p.status === avail) &&
        this.matches(p, q, colNames),
    );
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    // products without a price sort last for price sorts
    const price = (p: Product, dir: number) => (p.priceCents === null ? Infinity : p.priceCents * dir);
    if (sort === 'price-asc') list = [...list].sort((a, b) => price(a, 1) - price(b, 1));
    if (sort === 'price-desc') list = [...list].sort((a, b) => price(a, -1) - price(b, -1));
    return { items: list, total: list.length };
  }

  product(id: string) {
    const all = this.featured();
    const p = all.find((x) => x.id === id);
    if (!p) throw new NotFoundException({ statusCode: 404, message: 'This candle isn’t available.' });
    const others = all.filter((x) => x.id !== p.id);
    const related = [...others.filter((x) => x.collections.some((c) => p.collections.includes(c))), ...others.filter((x) => !x.collections.some((c) => p.collections.includes(c)))].slice(0, 4);
    return { product: p, related };
  }

  faqs() {
    return this.db
      .all<any>('SELECT f.* FROM faqs f JOIN faq_categories c ON c.key = f.category ORDER BY c.sort, f.sort, f.id')
      .map((f) => ({ id: f.id, category: f.category, question: f.question, answer: f.answer || PH.answer, supplied: !!f.answer }));
  }

  site() {
    const st = this.settings();
    return {
      settings: st,
      placeholders: PH,
      categories: this.categories(),
      collections: this.collections(),
      products: this.featured(),
      care: this.db.all<any>('SELECT n, title, body FROM care_items ORDER BY sort').map((c) => ({ ...c, body: c.body || `[Client-approved ${c.title.toLowerCase()} guidance goes here.]` })),
      faqCategories: this.db.all('SELECT key, label FROM faq_categories ORDER BY sort'),
      faqs: this.faqs(),
      hero: this.db.all('SELECT src, pos, alt FROM hero_slides ORDER BY sort'),
      shippingCents: this.shippingCents(),
      taxRate: this.taxRate(),
      orderStatuses: ORDER_STATUSES,
      paymentStatuses: PAYMENT_STATUSES,
      messageStatuses: MESSAGE_STATUSES,
    };
  }

  // ---------- admin: products ----------

  private validateProduct(input: Record<string, any>, creating: boolean) {
    const e: FieldErrors = {};
    const name = str(input.name, 400);
    if (!name) e.name = 'Enter a product name.';
    else if (name.length > 80) e.name = 'Keep the name under 80 characters.';
    const categoryId = str(input.categoryId, 40);
    if (!this.db.get('SELECT 1 FROM categories WHERE id = ?', [categoryId])) e.categoryId = 'Choose a category.';
    let priceCents: number | null = null;
    const pr = str(input.price, 20);
    if (pr) {
      if (!/^\d+(\.\d{1,2})?$/.test(pr) || Number(pr) <= 0 || Number(pr) > 10000) e.price = 'Enter a price in dollars, like 38 or 38.50 — or leave blank.';
      else priceCents = Math.round(Number(pr) * 100);
    }
    const status = str(input.status, 20) || 'available';
    if (!['available', 'soldout'].includes(status)) e.status = 'Choose In stock or Sold out.';
    const badge = str(input.badge, 100) || null;
    if (badge && badge.length > 24) e.badge = 'Keep the badge under 24 characters.';
    const known = new Set(this.collections().map((c) => c.id));
    const collections: string[] = [...new Set((Array.isArray(input.collections) ? input.collections : []).map((x: unknown) => str(x, 40)))] as string[];
    if (collections.some((c) => !known.has(c))) e.collections = 'One of those collections no longer exists.';
    const text = (k: string, max: number) => {
      const v = str(input[k], max * 4);
      if (v.length > max) e[k] = `Keep this under ${max.toLocaleString()} characters.`;
      return v;
    };
    const d = {
      name, categoryId, priceCents, status, badge, collections,
      scent: text('scent', 120), size: text('size', 60), shortDesc: text('shortDesc', 300), description: text('description', 4000),
      scentNotes: text('scentNotes', 1000), sizeDetails: text('sizeDetails', 600), ingredients: text('ingredients', 1000),
      published: input.published === undefined ? true : !!input.published,
      img: str(input.img, 200), lifeImg: str(input.lifeImg, 200), pos: str(input.pos, 20) || '50% 50%',
      altDesc: text('altDesc', 200),
    };
    const imgs = this.images();
    if (creating || 'img' in input) { if (!imgs.includes(d.img)) e.img = 'Choose a product photo.'; }
    if (creating || 'lifeImg' in input) { if (!imgs.includes(d.lifeImg)) e.lifeImg = 'Choose a lifestyle photo.'; }
    if (!/^\d{1,3}% \d{1,3}%$/.test(d.pos)) e.pos = 'Use a focus point like “50% 50%”.';
    throwIfErrors(e);
    return d;
  }

  /** The photo library (the design's own photography). */
  images(): string[] {
    return this.db.all<{ src: string }>('SELECT DISTINCT img AS src FROM products UNION SELECT life_img FROM products UNION SELECT img FROM collections UNION SELECT src FROM hero_slides').map((r) => r.src).sort();
  }

  private writeCollections(id: string, cols: string[]) {
    this.db.run('DELETE FROM product_collections WHERE product_id = ?', [id]);
    for (const c of cols) this.db.run('INSERT INTO product_collections (product_id, collection_id) VALUES (?, ?)', [id, c]);
  }

  createProduct(input: Record<string, any>): Product {
    const d = this.validateProduct(input, true);
    const id = 'p' + Date.now().toString(36);
    const sort = this.db.get<{ s: number }>('SELECT COALESCE(MAX(sort), 0) + 1 AS s FROM products')!.s;
    this.db.transaction(() => {
      this.db.run(
        `INSERT INTO products (id, name, img, pos, life_img, life_alt, alt_desc, category_id, price_cents, status, badge, scent, size, short_desc, description, scent_notes, size_details, ingredients, published, sort)
         VALUES (?, ?, ?, ?, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, d.name, d.img, d.pos, d.lifeImg, d.altDesc, d.categoryId, d.priceCents, d.status, d.badge, d.scent, d.size, d.shortDesc, d.description, d.scentNotes, d.sizeDetails, d.ingredients, d.published ? 1 : 0, sort],
      );
      this.writeCollections(id, d.collections);
    });
    return this.products(true).find((p) => p.id === id)!;
  }

  updateProduct(id: string, input: Record<string, any>): Product {
    const cur = this.db.get<any>('SELECT * FROM products WHERE id = ?', [id]);
    if (!cur) throw new NotFoundException({ statusCode: 404, message: 'That product no longer exists.' });
    const d = this.validateProduct({ img: cur.img, lifeImg: cur.life_img, pos: cur.pos, ...input }, false);
    this.db.transaction(() => {
      this.db.run(
        `UPDATE products SET name = ?, img = ?, pos = ?, life_img = ?, alt_desc = ?, category_id = ?, price_cents = ?, status = ?, badge = ?, scent = ?, size = ?,
           short_desc = ?, description = ?, scent_notes = ?, size_details = ?, ingredients = ?, published = ?, updated_at = datetime('now') WHERE id = ?`,
        [d.name, d.img, d.pos, d.lifeImg, d.altDesc, d.categoryId, d.priceCents, d.status, d.badge, d.scent, d.size, d.shortDesc, d.description, d.scentNotes, d.sizeDetails, d.ingredients, d.published ? 1 : 0, id],
      );
      this.writeCollections(id, d.collections);
    });
    return this.products(true).find((p) => p.id === id)!;
  }

  setFeatured(ids: unknown) {
    const list = (Array.isArray(ids) ? ids : []).map((x) => str(x, 40));
    const known = new Set(this.products().map((p) => p.id));
    if (list.length > 3 || list.some((x) => !known.has(x))) throw new ValidationFailedException({ featured: 'Choose up to three published products.' });
    this.db.transaction(() => {
      this.db.run('UPDATE products SET featured_rank = NULL');
      list.forEach((pid, i) => this.db.run('UPDATE products SET featured_rank = ? WHERE id = ?', [i + 1, pid]));
    });
    return this.featured().slice(0, 3).map((p) => p.id);
  }

  removeProduct(id: string) {
    const res = this.db.run('DELETE FROM products WHERE id = ?', [id]); // past orders keep their own copy of name and price
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That product no longer exists.' });
    return { deleted: id };
  }

  // ---------- admin: collections, care, FAQ ----------

  updateCollection(id: string, input: Record<string, any>) {
    const e: FieldErrors = {};
    const name = str(input.name, 200);
    if (!name) e.name = 'Enter a collection name.';
    else if (name.length > 40) e.name = 'Keep the name under 40 characters.';
    const description = str(input.description, 4000);
    if (description.length > 600) e.description = 'Keep the description under 600 characters.';
    throwIfErrors(e);
    const res = this.db.run('UPDATE collections SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That collection no longer exists.' });
    return this.collections().find((c) => c.id === id)!;
  }

  updateCategory(id: string, label: unknown) {
    const l = str(label, 200);
    if (!l) throw new ValidationFailedException({ label: 'Enter a category name.' });
    if (l.length > 40) throw new ValidationFailedException({ label: 'Keep the name under 40 characters.' });
    const res = this.db.run('UPDATE categories SET label = ? WHERE id = ?', [l, id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That category no longer exists.' });
    return this.categories();
  }

  updateCare(n: string, input: Record<string, any>) {
    const e: FieldErrors = {};
    const title = str(input.title, 200);
    if (!title) e.title = 'Enter a title.';
    else if (title.length > 40) e.title = 'Keep the title under 40 characters.';
    const body = str(input.body, 4000);
    if (body.length > 800) e.body = 'Keep this under 800 characters.';
    throwIfErrors(e);
    const res = this.db.run('UPDATE care_items SET title = ?, body = ? WHERE n = ?', [title, body, n]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That care topic no longer exists.' });
    return { n, title, body };
  }

  private validateFaq(input: Record<string, any>) {
    const e: FieldErrors = {};
    const category = str(input.category, 40);
    if (!this.db.get('SELECT 1 FROM faq_categories WHERE key = ?', [category])) e.category = 'Choose a topic.';
    const question = str(input.question, 1000);
    if (!question) e.question = 'Write the question.';
    else if (question.length > 200) e.question = 'Keep the question under 200 characters.';
    const answer = str(input.answer, 8000);
    if (answer.length > 2000) e.answer = 'Keep the answer under 2,000 characters.';
    throwIfErrors(e);
    return { category, question, answer };
  }

  createFaq(input: Record<string, any>) {
    const d = this.validateFaq(input);
    const sort = this.db.get<{ s: number }>('SELECT COALESCE(MAX(sort), 0) + 1 AS s FROM faqs')!.s;
    const res = this.db.run('INSERT INTO faqs (category, question, answer, sort) VALUES (?, ?, ?, ?)', [d.category, d.question, d.answer, sort]);
    return this.faqs().find((f) => f.id === Number(res.lastInsertRowid))!;
  }

  updateFaq(id: number, input: Record<string, any>) {
    const d = this.validateFaq(input);
    const res = this.db.run('UPDATE faqs SET category = ?, question = ?, answer = ? WHERE id = ?', [d.category, d.question, d.answer, id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That question no longer exists.' });
    return this.faqs().find((f) => f.id === id)!;
  }

  removeFaq(id: number) {
    const res = this.db.run('DELETE FROM faqs WHERE id = ?', [id]);
    if (!res.changes) throw new NotFoundException({ statusCode: 404, message: 'That question no longer exists.' });
    return { deleted: id };
  }
}

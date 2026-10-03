import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ShopService } from '../shop/shop.service';
import { MAX_QTY, ORDER_STATUSES, PAYMENT_STATUSES } from '../common/constants';
import { uniqueRef } from '../common/refs';
import { FieldErrors, str, ValidationFailedException } from '../common/validation';

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // the design's pattern

export interface QuoteLine { id: string; name: string; unitCents: number; qty: number; lineCents: number }
export interface Quote {
  lines: QuoteLine[];
  problems: { id: string; name: string; reason: string }[];
  count: number;
  subtotalCents: number;
  shippingCents: number | null; // null = confirmed by the shop
  taxCents: number | null;
  totalCents: number;
}

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService, private readonly shop: ShopService) {}

  /**
   * Prices a cart from the database (never from the browser). Lines that can't be ordered —
   * sold out, hidden, deleted, or without a price yet — are reported in `problems`.
   */
  quote(items: unknown): Quote {
    const merged = new Map<string, number>();
    for (const it of (Array.isArray(items) ? items : []) as Record<string, unknown>[]) {
      const id = str(it?.id, 40);
      const qty = Math.floor(Number(it?.qty));
      if (!id || !Number.isFinite(qty) || qty < 1) continue;
      merged.set(id, Math.min(MAX_QTY, (merged.get(id) || 0) + qty));
    }
    const products = new Map(this.shop.products().map((p) => [p.id, p]));
    const lines: QuoteLine[] = [];
    const problems: Quote['problems'] = [];
    for (const [id, qty] of merged) {
      const p = products.get(id);
      if (!p) problems.push({ id, name: 'An item', reason: 'is no longer available' });
      else if (p.status === 'soldout') problems.push({ id, name: p.name, reason: 'is sold out' });
      else if (p.priceCents === null) problems.push({ id, name: p.name, reason: 'doesn’t have a price yet' });
      else lines.push({ id, name: p.name, unitCents: p.priceCents, qty, lineCents: p.priceCents * qty });
    }
    const subtotalCents = lines.reduce((a, l) => a + l.lineCents, 0);
    const shippingCents = lines.length ? this.shop.shippingCents() : 0;
    const rate = this.shop.taxRate();
    const taxCents = rate === null ? null : Math.round(subtotalCents * rate);
    return {
      lines, problems, count: lines.reduce((a, l) => a + l.qty, 0), subtotalCents, shippingCents, taxCents,
      totalCents: subtotalCents + (shippingCents ?? 0) + (taxCents ?? 0),
    };
  }

  /** The design's checkout rules, word for word. */
  check(input: Record<string, unknown>) {
    const v = {
      email: str(input?.email, 300), first: str(input?.first, 200), last: str(input?.last, 200), address: str(input?.address, 400),
      apt: str(input?.apt, 200), city: str(input?.city, 200), state: str(input?.state, 60), zip: str(input?.zip, 20), phone: str(input?.phone, 40),
    };
    const e: FieldErrors = {};
    if (!v.email) e.email = 'Please enter your email address.';
    else if (!EMAIL.test(v.email)) e.email = 'Enter a valid email, like name@example.com.';
    if (!v.first) e.first = 'Please enter your first name.';
    if (!v.last) e.last = 'Please enter your last name.';
    if (!v.address) e.address = 'Please enter your street address.';
    if (!v.city) e.city = 'Please enter your city.';
    if (!v.state) e.state = 'Please enter your state.';
    if (!/^\d{5}(-\d{4})?$/.test(v.zip)) e.zip = v.zip ? 'Enter a 5-digit ZIP code.' : 'Please enter your ZIP code.';
    if (v.phone && v.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number, or leave this blank.';
    for (const [k, max] of [['first', 80], ['last', 80], ['address', 200], ['city', 100], ['state', 40]] as const) if (!e[k] && v[k].length > max) e[k] = `Keep this under ${max} characters.`;
    return { v, e };
  }

  create(input: Record<string, unknown>) {
    const { v, e } = this.check(input);
    const q = this.quote(input?.items);
    if (!q.lines.length && !q.problems.length) e.items = 'Your cart is empty.';
    else if (q.problems.length) e.items = q.problems.map((p) => `${p.name} ${p.reason}`).join('; ') + '. Remove it from your cart to continue.';
    if (Object.keys(e).length) throw new ValidationFailedException(e, e.items && Object.keys(e).length === 1 ? e.items : 'Some details need attention.');
    const ref = uniqueRef(this.db, 'orders', 'SCW');
    const id = this.db.transaction(() => {
      const res = this.db.run(
        `INSERT INTO orders (ref, email, first_name, last_name, address, apt, city, state, zip, phone, subtotal_cents, shipping_cents, tax_cents, total_cents)
         VALUES (@ref, @email, @first, @last, @address, @apt, @city, @state, @zip, @phone, @sub, @ship, @tax, @total)`,
        { ref, ...v, state: v.state.toUpperCase(), sub: q.subtotalCents, ship: q.shippingCents, tax: q.taxCents, total: q.totalCents },
      );
      const oid = Number(res.lastInsertRowid);
      for (const l of q.lines)
        this.db.run('INSERT INTO order_items (order_id, product_id, name, unit_cents, qty, line_cents) VALUES (?, ?, ?, ?, ?, ?)', [oid, l.id, l.name, l.unitCents, l.qty, l.lineCents]);
      return oid;
    });
    return this.find(id);
  }

  private hydrate(rows: any[]) {
    if (!rows.length) return [];
    const ids = rows.map((r) => r.id);
    const items = this.db.all<any>(`SELECT * FROM order_items WHERE order_id IN (${ids.map(() => '?').join(',')}) ORDER BY id`, ids);
    return rows.map((r) => ({
      id: r.id, ref: r.ref, email: r.email, first: r.first_name, last: r.last_name, address: r.address, apt: r.apt, city: r.city,
      state: r.state, zip: r.zip, phone: r.phone, subtotalCents: r.subtotal_cents, shippingCents: r.shipping_cents, taxCents: r.tax_cents,
      totalCents: r.total_cents, paymentStatus: r.payment_status, status: r.status, createdAt: r.created_at.replace(' ', 'T') + 'Z',
      items: items.filter((i) => i.order_id === r.id).map((i) => ({ productId: i.product_id, name: i.name, unitCents: i.unit_cents, qty: i.qty, lineCents: i.line_cents })),
    }));
  }

  find(id: number) {
    const r = this.db.get('SELECT * FROM orders WHERE id = ?', [id]);
    if (!r) throw new NotFoundException({ statusCode: 404, message: 'That order no longer exists.' });
    return this.hydrate([r])[0];
  }

  list(status?: string, q?: string, payment?: string) {
    const where: string[] = [];
    const params: unknown[] = [];
    const st = str(status, 30);
    if (st && st !== 'All') { where.push('o.status = ?'); params.push(st); }
    const pay = str(payment, 30);
    if (pay) { where.push('o.payment_status = ?'); params.push(pay); }
    const needle = str(q, 120);
    if (needle) {
      where.push(`(o.ref LIKE ? OR o.email LIKE ? OR (o.first_name || ' ' || o.last_name) LIKE ? OR o.city LIKE ? OR EXISTS (SELECT 1 FROM order_items i WHERE i.order_id = o.id AND i.name LIKE ?))`);
      params.push(...Array(5).fill(`%${needle}%`));
    }
    const rows = this.db.all(`SELECT o.* FROM orders o ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY o.created_at DESC, o.id DESC`, params);
    return { items: this.hydrate(rows), total: this.db.get<{ n: number }>('SELECT COUNT(*) AS n FROM orders')!.n };
  }

  update(id: number, input: Record<string, unknown>) {
    this.find(id);
    const e: FieldErrors = {};
    const sets: string[] = [];
    const params: unknown[] = [];
    if ('status' in (input || {})) {
      const s = str(input.status, 30);
      if (!(ORDER_STATUSES as readonly string[]).includes(s)) e.status = 'Choose a valid status.';
      else { sets.push('status = ?'); params.push(s); }
    }
    if ('paymentStatus' in (input || {})) {
      const s = str(input.paymentStatus, 30);
      if (!(PAYMENT_STATUSES as readonly string[]).includes(s)) e.paymentStatus = 'Choose a valid payment status.';
      else { sets.push('payment_status = ?'); params.push(s); }
    }
    if (Object.keys(e).length) throw new ValidationFailedException(e);
    if (!sets.length) throw new ValidationFailedException({}, 'Nothing to update.');
    this.db.run(`UPDATE orders SET ${sets.join(', ')} WHERE id = ?`, [...params, id]);
    return this.find(id);
  }

  remove(id: number) {
    this.find(id);
    this.db.run('DELETE FROM orders WHERE id = ?', [id]);
    return { deleted: id };
  }
}

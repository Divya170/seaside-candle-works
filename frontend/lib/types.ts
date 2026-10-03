export interface Product {
  id: string; name: string; img: string; pos: string; lifeImg: string; lifeAlt: string; altDesc: string;
  categoryId: string; categoryLabel: string; collections: string[]; priceCents: number | null; status: 'available' | 'soldout';
  badge: string | null; featuredRank: number | null; scent: string; size: string; shortDesc: string; description: string;
  scentNotes: string; sizeDetails: string; ingredients: string; published: boolean;
}
export interface Collection { id: string; name: string; img: string; pos: string; description: string; count: number }
export interface Faq { id: number; category: string; question: string; answer: string; supplied: boolean }
export interface Settings {
  email: string; phone: string; address: string; hours: string; story: string; legal: string;
  careGuide: string; shippingPolicy: string; shippingFlat: string; taxRate: string; paymentNote: string; replyTime: string;
}
export interface Site {
  settings: Settings;
  placeholders: Record<string, string>;
  categories: { id: string; label: string }[];
  collections: Collection[];
  products: Product[];
  care: { n: string; title: string; body: string }[];
  faqCategories: { key: string; label: string }[];
  faqs: Faq[];
  hero: { src: string; pos: string; alt: string }[];
  shippingCents: number | null;
  taxRate: number | null;
  orderStatuses: string[];
  paymentStatuses: string[];
  messageStatuses: string[];
}
export interface CartLine { id: string; qty: number }
export interface Quote {
  lines: { id: string; name: string; unitCents: number; qty: number; lineCents: number }[];
  problems: { id: string; name: string; reason: string }[];
  count: number; subtotalCents: number; shippingCents: number | null; taxCents: number | null; totalCents: number;
}
export interface Order {
  id: number; ref: string; email: string; first: string; last: string; address: string; apt: string; city: string; state: string; zip: string; phone: string;
  subtotalCents: number; shippingCents: number | null; taxCents: number | null; totalCents: number; paymentStatus: string; status: string; createdAt: string;
  items: { productId: string; name: string; unitCents: number; qty: number; lineCents: number }[];
}
export interface Message { id: number; ref: string; name: string; email: string; subject: string; message: string; status: string; createdAt: string }

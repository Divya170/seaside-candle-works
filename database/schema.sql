-- Seaside Candle Works — SQLite schema (applied on every backend boot; idempotent)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS categories (
  id    TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sort  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS collections (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  img         TEXT NOT NULL,
  pos         TEXT NOT NULL DEFAULT '50% 50%',
  description TEXT NOT NULL DEFAULT '',
  sort        INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  img           TEXT NOT NULL,
  pos           TEXT NOT NULL DEFAULT '50% 50%',
  life_img      TEXT NOT NULL,                 -- lifestyle photo for the gallery
  life_alt      TEXT NOT NULL DEFAULT '',
  alt_desc      TEXT NOT NULL DEFAULT '',      -- what the product photo shows
  category_id   TEXT NOT NULL REFERENCES categories(id),
  price_cents   INTEGER,                       -- NULL = price not yet supplied ("[Price]"; can't be ordered)
  status        TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','soldout')),
  badge         TEXT,
  featured_rank INTEGER,                       -- home page order
  scent         TEXT NOT NULL DEFAULT '',      -- card line
  size          TEXT NOT NULL DEFAULT '',
  short_desc    TEXT NOT NULL DEFAULT '',
  description   TEXT NOT NULL DEFAULT '',
  scent_notes   TEXT NOT NULL DEFAULT '',
  size_details  TEXT NOT NULL DEFAULT '',
  ingredients   TEXT NOT NULL DEFAULT '',      -- section only shown when supplied (as in the design)
  published     INTEGER NOT NULL DEFAULT 1,
  sort          INTEGER NOT NULL DEFAULT 0,
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS product_collections (
  product_id    TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  collection_id TEXT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, collection_id)
);

CREATE TABLE IF NOT EXISTS care_items (
  n     TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body  TEXT NOT NULL DEFAULT '',              -- empty = design placeholder
  sort  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_categories (
  key   TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sort  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL REFERENCES faq_categories(key),
  question TEXT NOT NULL,
  answer   TEXT NOT NULL DEFAULT '',           -- empty = "[Approved answer — supplied by Seaside Candle Works]"
  sort     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT NOT NULL, pos TEXT NOT NULL, alt TEXT NOT NULL, sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  ref            TEXT NOT NULL UNIQUE,
  email          TEXT NOT NULL,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  address        TEXT NOT NULL,
  apt            TEXT NOT NULL DEFAULT '',
  city           TEXT NOT NULL,
  state          TEXT NOT NULL,
  zip            TEXT NOT NULL,
  phone          TEXT NOT NULL DEFAULT '',
  subtotal_cents INTEGER NOT NULL,
  shipping_cents INTEGER,                      -- NULL = to be confirmed by the shop
  tax_cents      INTEGER,                      -- NULL = to be confirmed by the shop
  total_cents    INTEGER NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'Awaiting payment',
  status         TEXT NOT NULL DEFAULT 'New',
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL,                   -- text, so history survives product deletion
  name        TEXT NOT NULL,
  unit_cents  INTEGER NOT NULL,
  qty         INTEGER NOT NULL CHECK (qty BETWEEN 1 AND 99),
  line_cents  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ref        TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'New',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_live ON products(published, sort);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);

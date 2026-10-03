# Seaside Candle Works

The Seaside Candle Works online shop (hand-poured candles, Rehoboth Beach DE) as a working application:

- `frontend/` is the Next.js 14 (App Router) shop and admin.
- `backend/` is the NestJS 10 API, which handles catalogue, cart pricing, orders and validation.
- `database/` holds SQLite 3: `app.sqlite`, `schema.sql` and `seed.sql`.

## Quick start

You need Node.js 18.18 or newer.

```bash
npm run install:all     # root, backend and frontend dependencies
npm run dev             # API on :4000, shop on :3000
```

Open http://localhost:3000. The shop admin is at `/admin`; the passcode is `seaside-shop` by default, set in `backend/.env`.

`database/app.sqlite` ships seeded. If it's deleted, the API recreates it on the next start; `npm run db:reset` returns to the seed. For production: `npm run build && npm start`.

## Before launch: what still needs the shop's input

The design was delivered before the client supplied content, so the database holds the design's own placeholders. The admin has a field for every item below.

| What | Seeded as | Where to change it |
|---|---|---|
| Product names, scents, descriptions, sizes | `[Product Name 01]`, `[Scent description]`, … | Admin › Candles |
| **Prices, stock and badges** | **The design's demo figures** ($24–$46; two sold out; "Best Seller", "Seasonal") | Admin › Candles. **Check every one.** |
| Collection and category names and descriptions | `[Category A]`, `[… collection description …]` | Admin › Collections |
| Candle-care guidance and the 15 FAQ answers | `[Client-approved … guidance]`, `[Approved answer …]` | Admin › Care & FAQ |
| Brand story, contact details, hours, legal line, reply-time promise | `[Approved brand story …]`, `[Contact Email]`, … | Admin › Shop settings |
| Shipping and tax | Not set: checkout says they're confirmed by email after ordering | Admin › Shop settings |

Anything left blank keeps showing the design's bracketed placeholder, so nothing invented appears.

A product with no price shows `[Price]` and "Coming soon", and can't be ordered. That way a missing price can never turn into a free order.

## Payments

The design leaves payment to "the connected payment provider" and marks its confirmation screen as simulated. No provider is connected in this build, because that needs the shop's own Stripe, Square or Shopify Payments account. So:

- **Placing an order:** checkout creates a real order with a real order number (SCW-xxxx). Prices come from the database, never the browser, and sold-out, hidden or unpriced items are refused.
- **Payment status:** every order starts as **Awaiting payment**. The checkout tells the customer that payment is arranged by email; you can reword this in Admin › Shop settings.
- **After payment:** staff mark the order **Paid** (or Refunded) in Admin › Orders, and move it through Confirmed → Packed → Shipped → Delivered.

**Connecting a provider later.** Add a payment step to `OrdersService.create`, in `backend/src/orders/orders.service.ts`, that charges `totalCents`. Mark the order Paid on success, and render the provider's payment fields where `paymentNote` sits in the checkout view.

## Shop pages

| Route | |
|---|---|
| `/` | Hero slideshow (pauses on hover, on request and with reduced motion), featured candles, collections, candle care, FAQ by topic, contact |
| `/shop` | Search, filters (category, collection, availability) and sort (featured, name, price both ways), all on the server; filter chips, mobile filter sheet, one- or two-column mobile grid; loading, empty and error states. `?q=` comes from the header search. |
| `/collection/[id]` | The same grid within one collection |
| `/collections` | All collections with live counts |
| `/product/[id]` | Gallery (product, detail, lifestyle) with swipe and lightbox; quantity; add to cart; description, scent, size, ingredients (only when supplied), care and shipping sections; related candles |
| `/cart` and the cart drawer | Quantities and removal. Prices come from the server, and items that can no longer be ordered are flagged. |
| `/checkout` | Contact and shipping details with the design's validation wording; error summary linking to each field (or to the cart); order summary with server-calculated subtotal, shipping, tax and total |
| `/about`, `/faq`, `/faq/[topic]`, `/contact` | Story; FAQ search and topic navigation; contact form |
| `/admin` | Shop admin |

The cart is saved in the browser under the design's key, `scw-cart`.

**Success cards:**
- **Order:** the order number, the confirmation email address and **Continue shopping**.
- **Message:** the reference (MSG-xxxx), the reply-time promise, **Shop the candles** and **Send another message**.

## Shop admin

| Tab | |
|---|---|
| Orders | Search and filter by status and by payment status; change order status and payment status; full details (address, contact, items); delete |
| Messages | Search and filter, change status, delete |
| Candles | Add, edit and delete candles: price, stock, badge, category, collections, every copy field, photos from the library, photo focus point, shown or hidden. Choose up to three candles to feature on the home page. |
| Collections | Collection names and descriptions; category names |
| Care & FAQ | The five care topics; add, edit and delete FAQ questions, with a count of answers still needed |
| Shop settings | Contact, hours, legal line, reply time, flat shipping, tax rate, payment note, brand story, and the shop-wide care and shipping text shown on product pages |

## API

All routes are prefixed with `/api`. Admin routes need the `x-admin-token` header when `ADMIN_TOKEN` is set.

| Method | Route | |
|---|---|---|
| GET | `/site` | Bootstrap: settings, placeholders, categories, collections, products, care, FAQ, hero, shipping and tax, statuses |
| GET | `/products?q=&cat=&col=&avail=&sort=&collection=` | Catalogue search and filtering |
| GET | `/products/:id` | Product and related candles |
| POST | `/cart/quote` | `{ items: [{ id, qty }] }` → priced lines, problems, subtotal, shipping, tax, total |
| POST | `/orders`, `/orders/validate` | Place an order (priced server-side) → `{ ref, … }`, or check fields |
| POST | `/messages`, `/messages/validate` | Contact form |
| POST | `/admin/session` | Check a passcode |
| GET | `/admin/summary` | Counts, including orders awaiting payment |
| GET, PATCH, DELETE | `/admin/orders[/:id]` | `?status=&q=&payment=`; PATCH `{ status, paymentStatus }` |
| GET, PATCH, DELETE | `/admin/messages[/:id]` | Messages |
| GET, POST, PUT, DELETE | `/admin/products[/:id]` | Candles (price in dollars; blank = no price) |
| PUT | `/admin/featured` | `{ ids: [...] }`, up to three home-page features |
| PATCH | `/admin/collections/:id`, `/admin/categories/:id`, `/admin/care/:n` | Names and copy |
| POST, PUT, DELETE | `/admin/faqs[/:id]` | FAQ |
| PUT | `/admin/settings` | Shop settings |

Validation failures return `400 { message, errors: { field: "message" } }`. A cart problem at checkout is returned as `errors.items`.

## Project structure

```text
seaside-candle-works/
├── backend/src/
│   ├── shop/        catalogue, search and filters, related candles, settings, admin editing
│   ├── orders/      cart pricing (quote), checkout validation, orders, admin
│   ├── messages/    contact form
│   ├── admin/       passcode check, summary counts
│   ├── common/      validation helpers, reference numbers, admin guard, constants and placeholders
│   └── database/    better-sqlite3 service: applies schema.sql, seeds when empty
├── frontend/
│   ├── app/                    routes
│   ├── components/views/       markup converted 1:1 from the design (including ProductCardView)
│   ├── components/ProductCard  the design's ProductCard component
│   ├── components/pages/       page logic (CheckoutPage, Pages)
│   ├── components/admin/       shop admin
│   ├── lib/store.tsx           cart, priced by the server on every change
│   └── public/assets/          photography as WebP (12.5 MB → 779 KB)
└── database/                   app.sqlite, schema.sql, seed.sql
```

Money is stored in cents. Each order keeps its own copy of item names, unit prices and totals, so editing or deleting a candle later never changes a past order.

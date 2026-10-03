-- Seaside Candle Works — seed data, extracted from the design. Product names and copy are the design's placeholders;
-- prices, stock and badges are the design's DEMO values (its "demoData" mode) — replace them in the admin. Runs only when products is empty.

INSERT OR IGNORE INTO settings (key, value) VALUES ('email',''),('phone',''),('address',''),('hours',''),('story',''),('legal',''),('careGuide',''),('shippingPolicy',''),('shippingFlat',''),('taxRate',''),('paymentNote',''),('replyTime','');

INSERT INTO categories (id, label, sort) VALUES
 ('a', '[Category A]', 1),
 ('b', '[Category B]', 2);

INSERT INTO collections (id, name, img, pos, description, sort) VALUES
 ('seasonal', 'Seasonal', '/assets/driftwood-lanterns.webp', '50% 58%', '[Seasonal collection description — supplied by client]', 1),
 ('best', 'Best Sellers', '/assets/sculpted.webp', '50% 45%', '[Best Sellers collection description — supplied by client]', 2);

INSERT INTO products (id, name, img, pos, life_img, life_alt, alt_desc, category_id, price_cents, status, badge, featured_rank, sort) VALUES
 ('p1', '[Product Name 01]', '/assets/amber-window.webp', '30% 62%', '/assets/seaglass-vase.webp', 'lit candles in sea-glass blue ceramics on a woven tray', 'lit candle in pale amber glass beside white coral, ocean beyond the window', 'a', 3800, 'available', 'Best Seller', 1, 1),
 ('p2', '[Product Name 02]', '/assets/sculpted.webp', '45% 45%', '/assets/shore-lighting.webp', 'two candles in smoked glass being lit with a match by the sea', 'sculpted pillar and bubble candles on a wooden board', 'b', 2400, 'available', NULL, 2, 2),
 ('p3', '[Product Name 03]', '/assets/seaglass-vase.webp', '55% 72%', '/assets/arch-room.webp', 'two pillar candles on an oak table by an arched window', 'lit candles in sea-glass blue ceramics on a woven tray', 'a', 4200, 'available', 'Seasonal', 3, 3),
 ('p4', '[Product Name 04]', '/assets/peony.webp', '30% 58%', '/assets/sculpted.webp', 'sculpted pillar and bubble candles on a wooden board', 'peony-shaped candle and ribbed glass candle on a ceramic tray', 'b', 3200, 'soldout', NULL, NULL, 4),
 ('p5', '[Product Name 05]', '/assets/shore-lighting.webp', '35% 60%', '/assets/amber-window.webp', 'lit candle in pale amber glass beside white coral, ocean beyond the window', 'two candles in smoked glass being lit with a match by the sea', 'a', 4600, 'available', NULL, NULL, 5),
 ('p6', '[Product Name 06]', '/assets/driftwood-lanterns.webp', '58% 60%', '/assets/arch-room.webp', 'two pillar candles on an oak table by an arched window', 'candles in white lanterns around driftwood at dusk', 'b', 3600, 'available', NULL, NULL, 6),
 ('p7', '[Product Name 07]', '/assets/arch-room.webp', '42% 62%', '/assets/seaglass-vase.webp', 'lit candles in sea-glass blue ceramics on a woven tray', 'two pillar candles on an oak table by an arched window', 'a', 4000, 'soldout', NULL, NULL, 7),
 ('p8', '[Product Name 08]', '/assets/pouring.webp', '50% 38%', '/assets/workshop.webp', 'coastal interior', 'wax being poured into small glass jars', 'b', 2800, 'available', NULL, NULL, 8);

INSERT INTO product_collections (product_id, collection_id) VALUES
 ('p1', 'best'),
 ('p2', 'best'),
 ('p3', 'seasonal'),
 ('p4', 'seasonal'),
 ('p5', 'best'),
 ('p6', 'seasonal');

INSERT INTO care_items (n, title, sort) VALUES
 ('01', 'First burn', 1),
 ('02', 'Wick care', 2),
 ('03', 'Burn duration', 3),
 ('04', 'Safe placement', 4),
 ('05', 'Storage', 5);

INSERT INTO faq_categories (key, label, sort) VALUES
 ('orders', 'Orders', 1),
 ('shipping', 'Shipping', 2),
 ('care', 'Candle Care', 3),
 ('returns', 'Returns', 4),
 ('product', 'Product Information', 5);

INSERT INTO faqs (category, question, sort) VALUES
 ('orders', 'How do I check the status of my order?', 1),
 ('orders', 'Can I change or cancel an order after placing it?', 2),
 ('orders', 'Do you offer gift messages or gift wrapping?', 3),
 ('shipping', 'Where do you ship?', 4),
 ('shipping', 'How long does delivery take?', 5),
 ('shipping', 'How much does shipping cost?', 6),
 ('care', 'How long should the first burn be?', 7),
 ('care', 'How should I trim the wick?', 8),
 ('care', 'Where is it safe to place a burning candle?', 9),
 ('care', 'How should I store candles I’m not using?', 10),
 ('returns', 'What is your return policy?', 11),
 ('returns', 'What if my candle arrives damaged?', 12),
 ('product', 'What are your candles made of?', 13),
 ('product', 'What sizes are available?', 14),
 ('product', 'Can I pick up an order in Rehoboth Beach?', 15);

INSERT INTO hero_slides (src, pos, alt, sort) VALUES
 ('/assets/arch-room.webp', '62% 55%', 'Two lit pillar candles on a round oak table, an arched window opening onto the sea', 1),
 ('/assets/amber-window.webp', '40% 55%', 'A lit candle in amber glass on a pale wood table beside white coral, the ocean beyond', 2),
 ('/assets/seaglass-vase.webp', '55% 65%', 'Lit candles in sea-glass blue ceramics on a woven tray in a bright coastal living room', 3);

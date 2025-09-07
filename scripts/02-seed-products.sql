-- Insert Egyptian perfume products
INSERT INTO products (name, slug, description, price, category, image_url, gallery_images, sizes, ingredients, notes, featured) VALUES
(
  'Pharaoh''s Gold',
  'pharaohs-gold',
  'A luxurious blend inspired by ancient Egyptian royalty, featuring rich amber and precious oud.',
  299.99,
  'Luxury',
  '/luxury-egyptian-perfume-bottle-gold-pharaoh.jpg',
  ARRAY['/luxury-egyptian-perfume-bottle-gold-pharaoh.jpg', '/luxury-fragrance-packaging-gold.jpg'],
  ARRAY['30ml', '50ml', '100ml'],
  ARRAY['Amber', 'Oud', 'Rose', 'Sandalwood', 'Musk'],
  '{"top":["Bergamot","Rose"],"middle":["Amber","Oud"],"base":["Sandalwood","Musk"]}',
  true
),
(
  'Nile Breeze',
  'nile-breeze',
  'Fresh and aquatic fragrance capturing the essence of the Nile River at dawn.',
  199.99,
  'Fresh',
  '/fresh-aquatic-perfume-bottle-nile-river.jpg',
  ARRAY['/fresh-aquatic-perfume-bottle-nile-river.jpg', '/blue-perfume-bottle-egyptian-design.jpg'],
  ARRAY['50ml', '100ml'],
  ARRAY['Aquatic Notes', 'Lotus', 'White Musk', 'Cedar'],
  '{"top":["Aquatic Notes","Lotus"],"middle":["White Musk"],"base":["Cedar"]}',
  true
),
(
  'Desert Rose',
  'desert-rose',
  'Romantic floral bouquet inspired by roses blooming in the Egyptian desert.',
  249.99,
  'Floral',
  '/pink-rose-perfume-bottle-desert-luxury.jpg',
  ARRAY['/pink-rose-perfume-bottle-desert-luxury.jpg', '/floral-perfume-egyptian-rose.jpg'],
  ARRAY['30ml', '50ml', '100ml'],
  ARRAY['Damascus Rose', 'Jasmine', 'Vanilla', 'Amber'],
  '{"top":["Damascus Rose","Jasmine"],"middle":["Vanilla"],"base":["Amber"]}',
  true
),
(
  'Cleopatra''s Secret',
  'cleopatras-secret',
  'Mysterious and seductive fragrance fit for a queen, with exotic spices and precious woods.',
  349.99,
  'Oriental',
  '/perfume-bottle-ancient-egyptian-design.jpg',
  ARRAY['/perfume-bottle-ancient-egyptian-design.jpg'],
  ARRAY['50ml', '100ml'],
  ARRAY['Saffron', 'Cardamom', 'Oud', 'Patchouli', 'Vanilla'],
  '{"top":["Saffron","Cardamom"],"middle":["Oud","Patchouli"],"base":["Vanilla"]}',
  false
);

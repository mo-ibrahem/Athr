-- Update products with new primary images and add hover images to gallery_images
UPDATE products 
SET 
  image_url = 'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/athr%20third%20photo.png',
  gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/1.png']
WHERE slug = 'athr-signature';

UPDATE products 
SET 
  image_url = 'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka%20first%20photo.png',
  gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/floral-perfume-egyptian-rose.jpg']
WHERE slug = 'milka-rose-garden';

UPDATE products 
SET 
  image_url = 'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe%20first%20photo.png',
  gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue-perfume-bottle-egyptian-design.jpg']
WHERE slug = 'blue-vibe-aquatic';

UPDATE products 
SET 
  image_url = 'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/boje%20first%20photo.png',
  gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/luxury-egyptian-perfume-bottle-gold-pharaoh.jpg']
WHERE slug = 'boje-amber-essence';

-- Add new products Pink Vibe and Tropix with their images
INSERT INTO products (
  id,
  name,
  slug,
  description,
  price,
  category,
  brand,
  image_url,
  gallery_images,
  in_stock,
  featured,
  sizes,
  notes,
  ingredients
) VALUES 
(
  gen_random_uuid(),
  'Pink Vibe',
  'pink-vibe-floral',
  'A delicate floral fragrance with notes of rose petals and jasmine',
  299.99,
  'floral',
  'ATHR',
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe%20first%20photo.png',
  ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink-rose-perfume-bottle-desert-luxury.jpg'],
  true,
  true,
  '[{"size": "30ml", "multiplier": 1}, {"size": "50ml", "multiplier": 1.5}, {"size": "100ml", "multiplier": 2.5}]'::jsonb,
  '{"top": ["Rose Petals", "Pink Pepper"], "middle": ["Jasmine", "Peony"], "base": ["White Musk", "Sandalwood"]}'::jsonb,
  ARRAY['Rose Extract', 'Jasmine Oil', 'Pink Pepper', 'White Musk', 'Sandalwood']
),
(
  gen_random_uuid(),
  'Tropix',
  'tropix-exotic',
  'An exotic tropical fragrance with coconut and tropical fruits',
  349.99,
  'fresh',
  'ATHR',
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20first%20photo.png',
  ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/fresh-aquatic-perfume-bottle-nile-river.jpg'],
  true,
  true,
  '[{"size": "30ml", "multiplier": 1}, {"size": "50ml", "multiplier": 1.5}, {"size": "100ml", "multiplier": 2.5}]'::jsonb,
  '{"top": ["Coconut", "Pineapple"], "middle": ["Tropical Fruits", "Frangipani"], "base": ["Vanilla", "Driftwood"]}'::jsonb,
  ARRAY['Coconut Extract', 'Pineapple', 'Tropical Fruits', 'Frangipani', 'Vanilla', 'Driftwood']
);

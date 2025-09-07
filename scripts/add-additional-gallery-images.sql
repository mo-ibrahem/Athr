-- Add additional gallery images to existing products
-- These are additions to the current gallery_images, not replacements

-- Add blue vibe.jpg to Blue Vibe product
UPDATE products 
SET gallery_images = COALESCE(gallery_images, '[]'::jsonb) || '["https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe.jpg"]'::jsonb
WHERE name ILIKE '%blue vibe%' OR slug = 'blue-vibe-aquatic-fresh';

-- Add BOJE.jpg to Boje product  
UPDATE products 
SET gallery_images = COALESCE(gallery_images, '[]'::jsonb) || '["https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/BOJE.jpg"]'::jsonb
WHERE name ILIKE '%boje%' OR slug = 'boje-amber-essence';

-- Add milka.jpg to Milka product
UPDATE products 
SET gallery_images = COALESCE(gallery_images, '[]'::jsonb) || '["https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka.jpg"]'::jsonb
WHERE name ILIKE '%milka%' OR slug = 'milka-floral-dream';

-- Add pink vibe.jpg to Pink Vibe product
UPDATE products 
SET gallery_images = COALESCE(gallery_images, '[]'::jsonb) || '["https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe.jpg"]'::jsonb
WHERE name ILIKE '%pink vibe%' OR slug = 'pink-vibe-desert-rose';

-- Add tropex.jpg to Tropix product (note: assuming tropex.jpg is for Tropix)
UPDATE products 
SET gallery_images = COALESCE(gallery_images, '[]'::jsonb) || '["https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropex.jpg"]'::jsonb
WHERE name ILIKE '%tropix%' OR slug = 'tropix-tropical-escape';

-- Verify the updates
SELECT name, slug, gallery_images 
FROM products 
WHERE name ILIKE ANY(ARRAY['%blue vibe%', '%boje%', '%milka%', '%pink vibe%', '%tropix%'])
ORDER BY name;

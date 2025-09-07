-- Update gallery_images for all products with the correct second photos
UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Blue%20Vibe%20second%20photo.png']
WHERE slug = 'blue-vibe';

UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Boje%20second%20photo.png']
WHERE slug = 'boje-amber-essence';

UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Milka%20second%20photo.png']
WHERE slug = 'milka-floral-dream';

UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Pink%20Vibe%20second%20photo.png']
WHERE slug = 'pink-vibe-sunset';

UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20second%20photo.png']
WHERE slug = 'tropix-exotic';

-- Verify the updates
SELECT name, slug, gallery_images FROM products WHERE gallery_images IS NOT NULL;

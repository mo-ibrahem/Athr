-- Update gallery_images with the correct second photo URLs provided by user
UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Boje%20second%20photo.png']
WHERE name ILIKE '%boje%' OR slug = 'boje-amber-essence';

UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Blue%20Vibe%20second%20photo.png']
WHERE name ILIKE '%blue%vibe%' OR slug = 'blue-vibe-aquatic-fresh';

UPDATE products 
SET gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Milka%20second%20photo.png']
WHERE name ILIKE '%milka%' OR slug = 'milka-floral-dream';

-- Verify the updates
SELECT name, image_url, gallery_images 
FROM products 
WHERE name ILIKE '%boje%' OR name ILIKE '%blue%vibe%' OR name ILIKE '%milka%'
ORDER BY name;

-- Add second photos to product gallery_images
UPDATE products 
SET gallery_images = ARRAY[
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/tropix%20second%20photo.png'
]
WHERE name = 'Tropix';

UPDATE products 
SET gallery_images = ARRAY[
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Blue%20Vibe%20second%20photo.png'
]
WHERE name = 'Blue Vibe';

UPDATE products 
SET gallery_images = ARRAY[
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Milka%20second%20photo.png'
]
WHERE name = 'Milka';

UPDATE products 
SET gallery_images = ARRAY[
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Pink%20Vibe%20second%20photo.png'
]
WHERE name = 'Pink Vibe';

UPDATE products 
SET gallery_images = ARRAY[
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/Boje%20second%20photo.png'
]
WHERE name = 'Boje';

-- Verify the updates
SELECT name, image_url, gallery_images FROM products ORDER BY name;

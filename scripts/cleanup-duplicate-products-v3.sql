-- Clean up duplicate products and update branding
-- Delete duplicate Pink Vibe products (evening and sunset variants)
-- Update Milka and other products with correct branding

-- First, let's see what products we have
SELECT id, name, slug, brand FROM products ORDER BY name;

-- Delete duplicate Pink Vibe products (keeping the main one)
DELETE FROM products 
WHERE name ILIKE '%pink%vibe%' 
AND (name ILIKE '%evening%' OR name ILIKE '%sunset%');

-- Update all products to use ATHR brand instead of Attar Al-Misr
UPDATE products 
SET brand = 'ATHR',
    updated_at = NOW()
WHERE brand != 'ATHR';

-- Update Milka product with new image
UPDATE products 
SET image_url = 'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka%20first%20photo.png',
    gallery_images = ARRAY['https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka.jpg'],
    updated_at = NOW()
WHERE name ILIKE '%milka%';

-- Verify the cleanup
SELECT id, name, slug, brand, image_url FROM products ORDER BY name;

-- Update products with actual image URLs
-- Replace these URLs with your actual Supabase Storage URLs or external image URLs

UPDATE products SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/pharaoh-gold.jpg' WHERE slug = 'pharaoh-gold';
UPDATE products SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/nile-breeze.jpg' WHERE slug = 'nile-breeze';
UPDATE products SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/desert-rose.jpg' WHERE slug = 'desert-rose';
UPDATE products SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/cairo-nights.jpg' WHERE slug = 'cairo-nights';
UPDATE products SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/cleopatra-essence.jpg' WHERE slug = 'cleopatra-essence';
UPDATE products SET image_url = 'https://your-project.supabase.co/storage/v1/object/public/product-images/alexandria-musk.jpg' WHERE slug = 'alexandria-musk';

-- Add more products as needed

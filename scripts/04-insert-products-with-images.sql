-- Insert perfume products with your uploaded images
INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  category, 
  fragrance_notes, 
  ingredients, 
  sizes, 
  in_stock, 
  featured
) VALUES 
(
  'Blue Vibe - Aquatic Essence',
  'A refreshing aquatic fragrance inspired by the Mediterranean breeze. This sophisticated scent captures the essence of ocean waves with hints of bergamot and sea salt.',
  299.99,
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/blue%20vibe.jpg',
  'Fresh',
  '["Bergamot", "Sea Salt", "Aquatic Notes", "White Musk", "Cedarwood"]',
  '["Alcohol Denat", "Aqua", "Parfum", "Limonene", "Linalool"]',
  '["30ml", "50ml", "100ml"]',
  true,
  true
),
(
  'Boje - Royal Amber',
  'An opulent amber fragrance that embodies Egyptian luxury. Rich and warm with notes of precious amber, vanilla, and exotic spices from ancient trade routes.',
  449.99,
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/BOJE.jpg',
  'Oriental',
  '["Amber", "Vanilla", "Cinnamon", "Cardamom", "Sandalwood"]',
  '["Alcohol Denat", "Aqua", "Parfum", "Benzyl Benzoate", "Cinnamal"]',
  '["30ml", "50ml", "100ml"]',
  true,
  true
),
(
  'Milka - Desert Rose',
  'A delicate floral composition inspired by roses blooming in the Egyptian desert. Soft, romantic, and timelessly elegant with hints of rose petals and white tea.',
  349.99,
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/milka.jpg',
  'Floral',
  '["Rose Petals", "White Tea", "Jasmine", "Peony", "Light Musk"]',
  '["Alcohol Denat", "Aqua", "Parfum", "Geraniol", "Citronellol"]',
  '["30ml", "50ml", "100ml"]',
  true,
  false
),
(
  'Pink Vibe - Sunset Bloom',
  'A vibrant floral-fruity fragrance that captures the magic of Egyptian sunsets. Playful yet sophisticated with notes of pink grapefruit, peach, and blooming flowers.',
  279.99,
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe.jpg',
  'Floral',
  '["Pink Grapefruit", "Peach", "Rose", "Peony", "White Musk"]',
  '["Alcohol Denat", "Aqua", "Parfum", "Limonene", "Geraniol"]',
  '["30ml", "50ml", "100ml"]',
  true,
  true
),
(
  'Pink Vibe - Evening Edition',
  'The evening version of our popular Pink Vibe fragrance. Deeper and more sensual with added notes of amber and vanilla for nighttime elegance.',
  329.99,
  'https://xjrukeinsiskpwjekigc.supabase.co/storage/v1/object/public/product-images/pink%20vibe.jpg',
  'Oriental',
  '["Pink Grapefruit", "Vanilla", "Amber", "Rose", "Sandalwood"]',
  '["Alcohol Denat", "Aqua", "Parfum", "Benzyl Benzoate", "Geraniol"]',
  '["30ml", "50ml", "100ml"]',
  true,
  false
);

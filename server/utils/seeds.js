// seed/seed.js
const Item = require('../models/Item');

const seedData = [
  {
    name: 'Item 1',
    location: 'Location 1',
    cost: 100,
    image: '/assets/images/img1.jpg',
  },
  {
    name: 'Item 2',
    location: 'Location 2',
    cost: 200,
    image: '/assets/images/img2.jpg',
  },
];
const gifts = [
    { name: 'Handcrafted Wooden Bowl', price: 35.99, craftsman: 'Emma Thompson', location: 'Aspen, USA' },
    { name: 'Organic Cotton Scarf', price: 24.50, craftsman: 'Olivia Lee', location: 'Brighton, UK' },
    { name: 'Ceramic Coffee Mug', price: 18.00, craftsman: 'Jack Martin', location: 'Melbourne, Australia' },
    { name: 'Bamboo Serving Tray', price: 29.99, craftsman: 'Sophia Garcia', location: 'Barcelona, Spain' },
    { name: 'Recycled Glass Vase', price: 42.75, craftsman: 'Daniel Kim', location: 'Seoul, South Korea' },
    { name: 'Leather Journal', price: 22.99, craftsman: 'Liam Patel', location: 'Mumbai, India' },
    { name: 'Wool Knit Hat', price: 19.99, craftsman: 'Amelia Baker', location: 'Dublin, Ireland' },
    { name: 'Handmade Soap Set', price: 16.50, craftsman: 'Ava Robinson', location: 'Portland, USA' },
    { name: 'Upcycled Denim Bag', price: 37.80, craftsman: 'James Brown', location: 'London, UK' },
    { name: 'Clay Pendant Necklace', price: 27.99, craftsman: 'Sophia Harris', location: 'Sydney, Australia' },
    { name: 'Wooden Puzzle Game', price: 14.99, craftsman: 'Benjamin Clark', location: 'Berlin, Germany' },
    { name: 'Handwoven Picnic Blanket', price: 55.00, craftsman: 'Lily Davis', location: 'Cape Town, South Africa' },
    { name: 'Recycled Paper Notebook', price: 9.99, craftsman: 'Noah White', location: 'Toronto, Canada' },
    { name: 'Hand-Carved Picture Frame', price: 25.99, craftsman: 'Mason Walker', location: 'Florence, Italy' },
    { name: 'Cotton Macrame Wall Hanging', price: 48.50, craftsman: 'Ella Young', location: 'Austin, USA' },
    { name: 'Hand-Dyed Silk Scarf', price: 60.00, craftsman: 'Harper Evans', location: 'Kyoto, Japan' },
    { name: 'Vintage Leather Wallet', price: 39.99, craftsman: 'William Turner', location: 'Edinburgh, UK' },
    { name: 'Aromatherapy Candle Set', price: 20.50, craftsman: 'Emily Ward', location: 'Seattle, USA' },
    { name: 'Pottery Serving Bowl', price: 46.75, craftsman: 'Isabella Mitchell', location: 'Vancouver, Canada' },
    { name: 'Silver Spoon Ring', price: 28.99, craftsman: 'Ethan Reed', location: 'Paris, France' },
    { name: 'Eco-Friendly Tote Bag', price: 13.99, craftsman: 'Alexander Carter', location: 'Los Angeles, USA' },
    { name: 'Herbal Tea Sampler', price: 15.50, craftsman: 'Charlotte Turner', location: 'Glasgow, UK' },
    { name: 'Hand-Stitched Quilt', price: 95.00, craftsman: 'Sophia Lewis', location: 'Nashville, USA' },
    { name: 'Copper Drink Coasters', price: 21.99, craftsman: 'Lucas Jackson', location: 'San Francisco, USA' },
    { name: 'Bespoke Leather Belt', price: 55.80, craftsman: 'Isabella Adams', location: 'Madrid, Spain' },
    { name: 'Decorative Wooden Box', price: 34.99, craftsman: 'Henry Miller', location: 'Copenhagen, Denmark' },
    { name: 'Organic Beeswax Wraps', price: 17.99, craftsman: 'Charlotte Nelson', location: 'Oslo, Norway' },
    { name: 'Hand-Painted Silk Tie', price: 32.00, craftsman: 'Jacob Murphy', location: 'New York, USA' },
    { name: 'Artisanal Chocolate Box', price: 22.75, craftsman: 'Grace Hall', location: 'Brussels, Belgium' },
    { name: 'Sustainable Cork Wallet', price: 25.99, craftsman: 'Daniel Clark', location: 'Lisbon, Portugal' },
    { name: 'Vintage-Style Camera Strap', price: 18.99, craftsman: 'Ella Walker', location: 'Munich, Germany' },
    { name: 'Upcycled Wooden Clock', price: 42.00, craftsman: 'Michael Rodriguez', location: 'Buenos Aires, Argentina' },
    { name: 'Eco-Friendly Bath Bombs', price: 12.50, craftsman: 'Emily Brooks', location: 'Miami, USA' },
    { name: 'Ceramic Espresso Cups', price: 19.99, craftsman: 'Samuel Lee', location: 'Tokyo, Japan' },
    { name: 'Hand-Embroidered Cushion', price: 45.99, craftsman: 'Mia Collins', location: 'Reykjavik, Iceland' },
    { name: 'Handcrafted Wooden Earrings', price: 15.50, craftsman: 'Lucas Bennett', location: 'Helsinki, Finland' },
    { name: 'Personalized Leather Keychain', price: 9.99, craftsman: 'Sophia Martin', location: 'Chicago, USA' },
    { name: 'Organic Lavender Sachets', price: 10.99, craftsman: 'Harper Green', location: 'Stockholm, Sweden' },
    { name: 'Woven Rattan Basket', price: 23.99, craftsman: 'Ava Cooper', location: 'Bali, Indonesia' },
    { name: 'Hand-Painted Ceramic Plates', price: 49.50, craftsman: 'Liam Turner', location: 'Mexico City, Mexico' },
    { name: 'Rustic Wooden Candle Holders', price: 27.50, craftsman: 'James Bell', location: 'Zurich, Switzerland' },
    { name: 'Silk Pocket Square', price: 19.99, craftsman: 'Charlotte Price', location: 'Milan, Italy' },
    { name: 'Natural Wool Blanket', price: 85.00, craftsman: 'Henry Scott', location: 'Auckland, New Zealand' },
    { name: 'Custom Handwritten Letter Art', price: 35.00, craftsman: 'Emma Richardson', location: 'Boston, USA' },
    { name: 'Hand-Carved Wooden Chess Set', price: 95.00, craftsman: 'Benjamin Perez', location: 'Lima, Peru' },
    { name: 'Eco-Friendly Bamboo Toothbrushes', price: 7.99, craftsman: 'Noah Turner', location: 'Berlin, Germany' },
    { name: 'Hand-Painted Porcelain Vase', price: 65.50, craftsman: 'Olivia White', location: 'Kyoto, Japan' },
    { name: 'Personalized Engraved Watch', price: 110.00, craftsman: 'William Evans', location: 'Vienna, Austria' },
    { name: 'Reclaimed Wood Wall Art', price: 130.00, craftsman: 'Ethan Lewis', location: 'Melbourne, Australia' },
    { name: 'Handmade Pottery Tea Set', price: 75.00, craftsman: 'Ava Thomas', location: 'Toronto, Canada' },
  ];
const seed = async () => {
  try {
    const existingItems = await Item.find();
    if (existingItems.length === 0) {
      await Item.insertMany(seedData);
      console.log('Seed data inserted');
    } else {
      console.log('Seed data already exists');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seed;
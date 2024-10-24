const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   location: { type: String },
//   price: { type: Number, required: true },
//   imageUrl: { type: String },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to user
// });

// const Item = mongoose.model('Item', itemSchema);

// module.exports = Item;
// Define the Product schema
const productSchema = new Schema({
  name: {
      type: String,
      required: true,
      trim: true,
  },
  price: {
      type: Number,
      required: true,
  },
  craftsman: {
      type: String,
      required: true,
      trim: true,
  },
  location: {
      type: String,
      required: true,
      trim: true,
  },
  imageUrl: {
      type: String,
      required: true,
      default: 'bamboo-serving-tray.png',
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

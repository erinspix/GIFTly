// models/Gift.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    craftsman: { type: String },
    location: { type: String },
    imageUrl: { type: String },
    tags: [String],
    rating: { type: Number, min: 0, max: 5 }
});

module.exports = mongoose.model('Gift', giftSchema);

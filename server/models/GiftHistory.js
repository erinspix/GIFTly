// models/GiftHistory.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftHistorySchema = new Schema({
    recipient: { type: String, required: true },
    gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift' }],
    year: { type: Number },
    totalSpent: { type: Number, default: 0 }
});

module.exports = mongoose.model('GiftHistory', giftHistorySchema);

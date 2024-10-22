// models/Collection.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    gifts: [{ type: Schema.Types.ObjectId, ref: 'Gift' }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Collection', collectionSchema);

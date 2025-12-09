const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  basePrice: {
    type: Number,
    required: true
  },
  image: String,
  sizes: [{
    name: String,
    price: Number
  }],
  materials: [{
    name: String,
    price: Number
  }],
  deliveryPrice: {
    type: Number,
    default: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
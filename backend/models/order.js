const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  customer: {
    name: { type: String, required: true },
    email: String,
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  items: [{
    productId: String,
    name: String,
    size: String,
    material: String,
    quantity: Number,
    price: Number,
    deliveryPrice: Number
  }],
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['jazzcash', 'cod'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'COD'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);
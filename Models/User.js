const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  height: {
    type: Number,
    required: true
  },

  weight: {
    type: Number,
    required: true
  },

  goal: {
    type: String,
    required: true
  },

  paymentMethod: {
    type: String,
    required: true
  },

  transactionId: {
    type: String,
    default: ''
  },

  paymentStatus: {
    type: String,
    default: 'Pending'
  },

  isAdmin: {
    type: Boolean,
    default: false
  }

}, { timestamps: true })

module.exports = mongoose.model(
  'User',
  userSchema
)
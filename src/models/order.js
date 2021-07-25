const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
      type: String,
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    contactno: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street : {
            type: String,
            required: true
        },
        line1 : {
            type: String,
            required: true
        },
        city : {
            type: String,
            required: true
        },
        pincode : {
            type: String,
            required: true
        },
        state : {
            type: String,
            required: true
        },
        country : {
            type: String,
            required: true
        },
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalamount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Accepted'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('orders',orderSchema);

module.exports = Order 
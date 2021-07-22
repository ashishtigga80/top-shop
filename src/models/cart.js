const mongoose =require('mongoose')


const cartSchema=new mongoose.Schema({  
  userId: {
    type: String,
    unique: true,
    required: true
  },
  products: [{
    productId : {
      type: String,
      unique: true,
      required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity : {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  cartTotal: {
      type: Number,
      required: true
    }
  });


const Cart= new mongoose.model("carts",cartSchema);

module.exports = Cart;
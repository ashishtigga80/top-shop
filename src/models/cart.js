const mongoose =require('mongoose')


const cartSchema=new mongoose.Schema({  
  userId: {
    type: String,
    unique: true
  },
  products: [{
      productId : {
        type: String,
        unique: true,
        sparse: true
      },
      name: {
          type: String
      },
      quantity : {
        type: Number
      },
      price: {
        type: Number,
      }
  }],
  cartTotal: {
      type: Number
    }
  });


const Cart= new mongoose.model("carts",cartSchema);

module.exports = Cart;
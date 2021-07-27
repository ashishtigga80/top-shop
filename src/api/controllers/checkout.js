const User = require('../../models/user');
const Cart = require('../../models/cart');
const Order = require('../../models/order');
const config = require('../../config/index'); 
const stripe = require('stripe')(config.StripeAPIKey);


module.exports.checkoutpay = async (req,res) => {
  try{
        const {source, shippingdetails} = req.body;
        const userId = req.user.id
        if(shippingdetails === {}) throw new Error("No Shipping Details!")
        let cart = await Cart.findOne({userId});
        if(!cart) throw new Error("Internal Server Error!")
        const email = req.user.email;
        if(cart.products.length!== 0){
            const charge = await stripe.charges.create({
                amount: cart.cartTotal * 100,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) throw new Error('Payment failed!');
            if(charge){
               const order = new Order({
                    userId: userId,
                    paymentId: charge.id,
                    firstname: shippingdetails.firstname,
                    lastname: shippingdetails.lastname,
                    contactno: shippingdetails.contactno,
                    email: shippingdetails.email,
                    address: {
                      street : shippingdetails.address.street,
                      line1 : shippingdetails.address.line1,
                      city : shippingdetails.address.city,
                      pincode :shippingdetails.address.pincode,
                      state : shippingdetails.address.state,
                      country : shippingdetails.address.country
                    },
                    products: cart.products,
                    totalamount: cart.cartTotal,
                    status: 'Dispatching',
                    date: Date.now()
                });
                cart.products.splice(0,cart.products.length)
                cart.cartTotal = 0;
                order.save()
                  .then(order => {
                    cart.save()
                      .then(cart =>  res.status(201).send({order,cart}))
                      .catch(err => res.status(500).send("Internal Server Error! Order Failed."));   
                  })
                  .catch(err => res.status(500).send(err.message)); 
               
          }
        }
        else{
            return res.status(406).send("Cart Empty!");
        }
    }
    catch(error){
      return res.status(500).send(error.message)
  }
}
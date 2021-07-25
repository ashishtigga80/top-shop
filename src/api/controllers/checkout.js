const User = require('../../models/user');
const Cart = require('../../models/cart');
const Order = require('../../models/order');
const config = require('../../config/index'); 
const stripe = require('stripe')(config.StripeAPIKey);


module.exports.checkoutpay = async (req,res) => {
  try{
        const {source, shippingdetails} = req.body;
        console.log(shippingdetails)
        const userId = req.user._id
        let cart = await Cart.findOne({userId});
        const email = req.user.email;
        if(cart.products.length!== 0){
            const charge = await stripe.charges.create({
                amount: cart.cartTotal * 100,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) throw Error('Payment failed');
            if(charge){
               const order = await Order.create({
                    userId: req.user._id,
                    paymentId: charge.id,
                    firstname: shippingdetails.firstname,
                    lastname: shippingdetails.lastname,
                    contactno: shippingdetails.contactno,
                    email: shippingdetails.email,
                    address: {
                      street : shippingdetails.street,
                      line1 : shippingdetails.line1,
                      city : shippingdetails.city,
                      pincode :shippingdetails.pincode,
                      state : shippingdetails.state,
                      country : shippingdetails.country
                    },
                    products: cart.products,
                    totalamount: cart.cartTotal,
                    status: 'Dispatching',
                    date: Date.now()
                });
                cart.products.splice(0,cart.products.length)
                cart.cartTotal = 0;
                await cart.save(function(err,cart) {
                  if (err) return console.error(err);
                }) 
                return res.status(201).send({order,cart});
            }
        }
        else{
            res.status(500).send("Cart Empty");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
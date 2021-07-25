const User = require('../../models/user');
const Cart = require('../../models/cart');
const Order = require('../../models/order');
const config = require('../../config/index'); 
const stripe = require('stripe')(config.StripeAPIKey);


module.exports.checkoutpay = async (req,res) => {
  try{
        const {source} = req.body;
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
                    firstname: 'req.body.firstname',
                    lastname: 'req.body.lastname',
                    contactno: 'req.body.contactno',
                    email: 'req.body.email',
                    address: {
                      street : 'req.body.street',
                      line1 : 'req.body.line1',
                      city : 'req.body.city',
                      pincode :'req.body.pincode',
                      state : 'req.body.state',
                      country : 'req.body.country'
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
                return res.status(201).send(order);
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
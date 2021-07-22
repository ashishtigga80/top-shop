const User = require('../../models/user');
const Cart = require('../../models/cart');
const Order = require('../../models/order');
const config = require('../../config/index'); 
const stripe = require('stripe')(config.StripeAPIKey);

module.exports.checkout = async (req,res) => {
  await Cart.findOne({userId: req.user._id},function(err, cart) {
    var checkoutdata = {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      contactno: '',
      email: req.user.username,
      address: {
        street : '',
        line1 : '',
        line2 : '',
        city : '',
        pincode : '',
        state : '',
        country : ''
      },
      products: cart.products,
      total: cart.cartTotal
    }
    res.send(checkoutdata)
  });
}

module.exports.checkoutpay = async (req,res) => {
  /*try{
        const {source} = req.body;
        const userId = req.user._id
        let cart = await Cart.findOne({userId});
        const email = req.user.email;
        if(cart.products.length()!== 0){
            const charge = await stripe.charges.create({
                amount: cart.bill,
                currency: 'inr',
                source: source,
                receipt_email: email
            })
            if(!charge) throw Error('Payment failed');
            if(charge){
               const order = await Order.create({
                    userId,
                    items: cart.products,
                    bill: cart.bill
                }); 
                await Cart.findByIdAndDelete({_id:cart.id});
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
    }*/
    let cart = await Cart.findOne({userId: req.user._id});
    const order = new Order({
                    userId: req.user._id,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    contactno: req.body.contactno,
                    email: req.body.email,
                    address: {
                      street : req.body.street,
                      line1 : req.body.line1,
                      line2 : req.body.line2,
                      city : req.body.city,
                      pincode : req.body.pincode,
                      state : req.body.state,
                      country : req.body.country
                    },
                    products: cart.products,
                    totalamount: cart.cartTotal,
                    status: 'Dispatching',
                    date: Date.now()
                  })
    await order.save(function (err, order) {
      if (err) return console.error(err);
        console.log(order);
    });
    cart.products.splice(0,cart.products.length)
    await cart.save(function(err,cart) {
      if (err) return console.error(err);
        console.log(cart);
    })
    res.redirect('/orders');
}
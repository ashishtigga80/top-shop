const Product = require('../../models/product');
const Cart = require('../../models/cart');

var cartTotal = (cart) => {
  var total = 0;
  cart.products.forEach(function(product){
    total+= product.price * product.quantity
  })
  return total  
}

module.exports.viewcart = async (req,res ) => {
  await Cart.findOne({userId: req.user._id},function(err, cart) {
    res.send(cart)
  });
}

module.exports.addtocart = async (req, res) => {
  await Cart.findOne({userId: req.user._id}, async function(err, cart) {
    if (err) {
      return res.status(500).send({errMsg: 'Internal server error'})
    }
    let index= cart.products.findIndex(x => x.productId === req.params.id)
    if(index>-1){
      cart.products[index].quantity++
    }else{
      var product = await Product.findOne({_id: req.params.id},function(err, product) {
        return product
      })
      cart.products.push({ productId: req.params.id, name: product.name, quantity: 1, price: product.price})
    }
    cart.cartTotal = cartTotal(cart)
    await cart.save();
    res.status(204).send();
  });
}

module.exports.deletefromcart = async (req, res) => {
  await Cart.findOne({userId: req.user._id},async function(err, cart) {
    index = cart.products.findIndex(x => x.productId === req.params.id)
    if( index > -1){
      cart.products.splice(index, 1);
      cart.cartTotal = cartTotal(cart)
    }  
    await cart.save();
    res.status(204).send();
  });
  
}

module.exports.updatecart = async (req, res) => {
  await Cart.findOne({userId: req.user._id}, async function(err, cart) {
    index = cart.products.findIndex(x => x.productId === req.params.id)
    if( index > -1){
      cart.products[index].quantity = req.query.quantity
      cart.cartTotal = cartTotal(cart)
    }  
    await cart.save();
    res.status(204).send();
  });
}
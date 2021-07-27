const Product = require('../../models/product');
const Cart = require('../../models/cart');

var cartTotal = (cart) => {
  var total = 0;
  cart.products.forEach(function(product){
    total+= product.price * product.quantity
  })
  return total  
}

module.exports.viewcart = (req,res ) => {
  Cart.findOne({userId: req.user._id},function(err, cart) {
    if(err) return res.status(500).send("Internal Server Error"); 
    if(!cart){
      const cart = new Cart({
              userId : req.user._id,
              products: [],
              cartTotal: 0
            })
      cart.save()
              .then(cart => res.send(cart))
              .catch(err => res.status(500).send("Internal Server Error"));            
    }
    else{
          res.send(cart)
    }
  });
}

module.exports.addtocart = (req, res) => {
  Cart.findOne({userId: req.user._id}, async function(err, cart) {
    if (err) return res.status(500).send("Unable to add to cart! Internal Server Error"); 
    let index = cart.products.findIndex(x => x.productId === req.params.id)
    if(index>-1){
      cart.products[index].quantity++
      cart.cartTotal = cartTotal(cart)
    }else{
      var product = await Product.findOne({_id: req.params.id},function(err, product) {
        if (err) return res.status(500).send("Unable to add to cart! Internal Server Error"); 
        return product
      })
      cart.products.push({ productId: req.params.id, name: product.name, quantity: 1, price: product.price})
      cart.cartTotal = cartTotal(cart)
    }
    cart.save()
              .then(cart => res.send(cart))
              .catch(err => res.status(500).send("Unable to add to cart! Internal Server Error"));
  });
}

module.exports.deletefromcart = (req, res) => {
  Cart.findOne({userId: req.user._id}, function(err, cart) {
    if (err) return res.status(500).send("Unable to delete item! Internal Server Error"); 
    index = cart.products.findIndex(x => x.productId === req.params.id)
    if( index > -1){
      cart.products.splice(index, 1);
      cart.cartTotal = cartTotal(cart)
    }  
    cart.save()
              .then(cart => res.send(cart))
              .catch(err => res.status(500).send("Unable to delete item! Internal Server Error"));
  });
  
}

module.exports.updatecart = (req, res) => {
  Cart.findOne({userId: req.user._id}, function(err, cart) {
    if (err) return res.status(500).send("Unable to update quantity! Internal Server Error"); 
    index = cart.products.findIndex(x => x.productId === req.params.id)
    if( index > -1){
      cart.products[index].quantity = req.query.quantity
      cart.cartTotal = cartTotal(cart)
    }  
    cart.save()
              .then(cart => res.send(cart))
              .catch(err => res.status(500).send("Unable to update quantity! Internal Server Error"));
  });
}
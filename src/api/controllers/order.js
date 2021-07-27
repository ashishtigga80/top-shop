const Order = require('../../models/order');

module.exports.myorders = (req, res) => {
  Order.find({userId: req.user._id}, function(err, orders) {
    if(err) return res.status(500).send("Internal Server Error"); 
    if(!orders){
      orders = [];
      res.send(orders);
    }else{
      res.send(orders);
    }
  })
}
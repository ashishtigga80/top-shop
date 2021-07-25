const Order = require('../../models/order');

module.exports.myorders = async (req, res) => {
  await Order.find({userId: req.user._id}, function(err, orders) {
    if(!orders){
      orders = [];
      res.send(orders);
    }else{
      res.send(orders);
    }
  })
}
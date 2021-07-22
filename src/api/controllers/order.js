const Order = require('../../models/order');

module.exports.myorders = async (req, res) => {
  await Order.find({userId: req.user._id}, function(err, orders) {
    var orderList = {};
    orders.forEach(function(order) {
      orderList[order._id] = order;
    });
    res.send(orderList)
  })
}
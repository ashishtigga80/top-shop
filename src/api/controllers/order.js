const Order = require('../../models/order');

module.exports.myorders = async (req, res) => {
  await Order.find({userId: req.user._id}, function(err, orders) {
    res.send(orders)
  })
}
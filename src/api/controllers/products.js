const Product = require('../../models/product');

module.exports.viewproducts = async (req, res) => {
  Product.find({}, function(err, products) {
    if (err) {
      return res.status(500).send({errMsg: 'Internal server error'})
    }
    res.send(products);  
  });
}

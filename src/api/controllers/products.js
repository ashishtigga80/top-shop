const Product = require('../../models/product');

module.exports.viewproducts = (req, res) => {
  Product.find({}, function(err, products) {
    if (err) {
      return res.status(500).send('Internal Server Error!')
    }
    res.send(products);  
  });
}

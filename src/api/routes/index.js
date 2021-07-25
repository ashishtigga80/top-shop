const express = require('express');
const { login,  signup} = require('../controllers/auth');
const {auth} = require('../middlewares/auth');
const {viewproducts} = require('../controllers/products');
const { viewcart,addtocart, deletefromcart, updatecart} = require('../controllers/cart');
const {checkoutpay} = require('../controllers/checkout');
const { myorders } = require('../controllers/order');

var router = express.Router();

router.use(express.urlencoded({ extended: true }))
router.use(express.json());


router.post('/login', login)
router.post('/signup', signup)

router.get('/products', viewproducts)

router.get('/cart',auth, viewcart)
router.post('/products/addtocart/:id',auth, addtocart)
router.delete('/products/deletefromcart/:id',auth, deletefromcart)
router.put('/products/updatecart/:id',auth, updatecart)

router.post('/cart/checkout/pay/:id',auth, checkoutpay)

router.get('/orders',auth, myorders)

module.exports = router;
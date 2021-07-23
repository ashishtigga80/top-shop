const express = require('express');
const connectEnsureLogin = require('connect-ensure-login');
const { login, logout, signup, checkauth} = require('../controllers/auth');
const {viewproducts} = require('../controllers/products');
const { viewcart,addtocart, deletefromcart, updatecart} = require('../controllers/cart');
const {checkout, checkoutpay} = require('../controllers/checkout');
const { myorders } = require('../controllers/order');

var router = express.Router();

router.use(express.urlencoded({ extended: true }))
router.use(express.json());

router.get('/api/auth', checkauth)
router.post('/login', login)
router.post('/logout',logout)
router.post('/signup', signup)

router.get('/products', viewproducts)

router.get('/cart',connectEnsureLogin.ensureLoggedIn('/login'), viewcart)
router.post('/products/addtocart/:id',connectEnsureLogin.ensureLoggedIn('/login'), addtocart)
router.delete('/products/deletefromcart/:id',connectEnsureLogin.ensureLoggedIn('/login'), deletefromcart)
router.put('/products/updatecart/:id',connectEnsureLogin.ensureLoggedIn('/login'), updatecart)

router.get('/cart/checkout',connectEnsureLogin.ensureLoggedIn('/login'), checkout)
router.post('/cart/checkout/pay',connectEnsureLogin.ensureLoggedIn('/login'), checkoutpay)

router.get('/orders',connectEnsureLogin.ensureLoggedIn('/login'), myorders)

module.exports = router;
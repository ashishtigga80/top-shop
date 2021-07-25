const passport = require('passport');
const User = require('../../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/index")
const Cart = require('../../models/cart');

module.exports.login = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          config.key,
          {
            expiresIn: 200000
          },
          (err, token) => {
             return res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });

}

module.exports.signup = (req, res) => {

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt,async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          var cart = new Cart({
            userId : newUser._id,
            products: [],
            cartTotal: 0
          })
          await cart.save();
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
} 


const passport = require('passport');
const User = require('../../models/user');
const Cart = require('../../models/cart');
const connectEnsureLogin = require('connect-ensure-login');

module.exports.login = async (req, res) => {
  await passport.authenticate('local',(err, user) => {
    if (err) {
      return res.status(500).send({errMsg: 'Internal server error'})
    }
    if (!user) {
      return res.status(401).send({errMsg: 'Incorrect email or password.'});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).send({errMsg: 'Internal server error'})
      }
      const userdata = {
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
      }
     res.status(200).send(userdata);
    });
  })(req, res);
}

module.exports.logout = (req, res) => {
   req.session.destroy(function (err) {
    if (err) {
      return res.status(500).send({errMsg: 'Internal server error'})
    }
    res.status(204).send(); 
  });
}  

module.exports.signup = (req, res) => {
  User.register({ username:req.body.username,firstname:req.body.firstname, lastname:req.body.lastname},req.body.password, async function(err,user){
    if (err) {
      return res.status(500).send({errMsg: 'Internal server error'})
    }
    else{
      var cart = new Cart({
        userId : user._id,
        products: [],
        cartTotal: 0
      })
      await cart.save(function (err, cart) {
        if (err) {
          return res.status(500).send({errMsg: 'Internal server error'})
        }
      })
      await passport.authenticate("local")(req,res,function(){
      res.status(200).send(user);
      });
    }
  });
} 

module.exports.checkauth =  (req, res) => {
  if(req.user)
    return res.send({auth: true, user : req.user})
  else{
    return res.send({auth: false})
  }  
}

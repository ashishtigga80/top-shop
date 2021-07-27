const User = require('../../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/index")

module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try{
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("No user found! Signup to continue.")
    }
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          };
          jwt.sign(payload,config.key,{expiresIn: 200000},(err, token) => {
            if(err) return res.status(500).send("Internal Server Error")
            return res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.sendStatus(401);
        }
      });
  }catch(error){
    return res.status(404).send(error.message)
  }
}

module.exports.signup = async (req, res) => {
  try{

    const user = await User.findOne({ email: req.body.email })
    if (user) {
      throw new Error("User already exist!"); 
    } 
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return res.status(500).send("Internal Server Error")
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(500).send("Internal Server Error")
        newUser.password = hash;
          newUser.save()
            .then(user => res.status(201).send("Created"))
            .catch(err => res.status(500).send("Internal Server Error"));
      });
    });

  }catch(error){

    return res.status(409).send(error.message)

  }
} 


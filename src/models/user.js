const mongoose =require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema=new mongoose.Schema({
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("users",userSchema);

module.exports = User;
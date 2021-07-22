const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const config = require('./config/index'); 
const routes = require('./api/routes/index');
const passport = require('passport');
const User = require('./models/user');

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
  
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const startServer = async () => {

  try{
    await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    console.log('DB connection successful!')
  }catch(err){
    console.log('DB connection failed!' + err);
  }

  app.listen(config.port, () => {
      console.log('Server up on ' + config.port), 
      err => {
        console.log(err);
      }
  })
}

startServer();


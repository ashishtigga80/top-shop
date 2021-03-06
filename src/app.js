const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const config = require('./config/index'); 
const routes = require('./api/routes/index');
const passport = require('passport');
const path = require('path');
require("./config/passport")(passport);

const app = express();

const origin = process.env.NODE_ENV === "development" 
  ? "http://localhost:3000" 
  : "http://example.com"

app.use(
  cors({
    credentials: true,
    origin
  }),
);
app.use(express.static(__dirname + '/../client/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(passport.initialize());

const startServer = async () => {

  try{
    await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    console.log('DB connection successful!')
  }catch(err){
    console.log('DB connection failed!' + err);
  }

  app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../client/public/index.html'));
  });

  app.listen(config.port, () => {
      console.log('Server up on ' + config.port), 
      err => {
        console.log(err);
      }
  })
}

startServer();


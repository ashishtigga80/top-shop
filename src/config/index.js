const dotenv = require('dotenv'); 

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  
   port: process.env.PORT,
   
   databaseURL: process.env.DB_URL,

   StripeAPIKey: process.env.STRIPE_KEY
   
};
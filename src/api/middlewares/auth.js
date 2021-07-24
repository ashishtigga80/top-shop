var jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config/index')
exports.auth = (req,res,next) => {
         //getting token from cookie
        function extractToken (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
        var token = extractToken(req);

         //if there is no token redirect to login
         if (!token) 
             return res.status(200).redirect('/login')

         //verifying the token    
         jwt.verify(token, config.key, function(err, decoded) {     
         //if token is expired or some other error   
         if (err) 
              return res.status(500).redirect('/login');  
        //sending obj id of the user in req after decoding the token        
        req.userId = decoded.id;
        User.findById(req.userId, 
                      { password: 0 }, // projection
                      function (err, user) {
                       if (err) return res.status(500).render('failures',{message:'Internal Server Problem.'});   
                      if(!user) return res.status(500).render('failures',{message:'DB problem.'}); 
                      req.user = user
                      next();
        })              
  });
}
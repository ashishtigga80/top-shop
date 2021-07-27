var jwt = require('jsonwebtoken');
const User = require('../../models/user');
const config = require('../../config/index')
exports.auth = (req,res,next) => {
        function extractToken (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
        var token = extractToken(req);
        if (!token) return res.sendStatus(401);
        jwt.verify(token, config.key, function(err, decoded) {
          if (err) 
                return res.sendStatus(500);      
          req.user={
              id: decoded.id,
              firstname: decoded.firstname,
              lastname: decoded.lastname,
              email: decoded.email
            }
          next();
        })
  }
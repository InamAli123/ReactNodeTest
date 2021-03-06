const jwt = require('jsonwebtoken');
var secret = 'some_secret';
module.exports = function(req, res, next) {

  //get the token from the header if present
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send('Access denied. No token provided.');
  tokenString = token.substring(7, token.length);
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(tokenString, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send('Invalid token.');
  }
};
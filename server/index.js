
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var conn = require('./dbconfig.js');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var verifyToken = require('./verifyToken');
var studentRoutes = require('./student');
var app = express();

app.use(cors());
var urlencoded = bodyParser.urlencoded({extended:false});
var json = bodyParser.json();
var secret = 'some_secret';


app.use('/',studentRoutes);






app.post('/signin',json,(req,res)=>{
	conn.query(`select * from users where email='${req.body.email}' && password='${req.body.password}'`,function(err,result){
		if(err) throw err;
		if(result.length===1){
      console.log('Found');
			var userData = {
                 email : req.body.email,
      
			}
			 let token = jwt.sign(userData, secret, { expiresIn: '15h'})
			 res.json({"status":true,"token": token});
			}
		else {
			res.json({"status":false});
		}

	})
});

app.get('/verifyJwt',function(req,res){
	  var token = req.headers['x-access-token'] || req.headers['authorization'];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send('Access denied. No token provided.');
     tokenString = token.substring(7, token.length);
  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(tokenString, secret);
    req.user = decoded;
    res.json(req.user);
  } catch (ex) {
    //if invalid token
    res.status(400).send('Invalid token.');
  }
})





app.listen(4000,function(){
	console.log('Server Listening on 4000');
})

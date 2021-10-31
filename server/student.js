
var cors = require('cors');
var bodyParser = require('body-parser');
var conn = require('./dbconfig.js');
var moment = require('moment');
var verifyToken = require('./verifyToken');
var express = require('express');
var router = express.Router();

var json = bodyParser.json();
var urlencoded = bodyParser.urlencoded({extended:false});

router.get('/students',verifyToken,(req,res)=>{
	conn.query('select * from students',(err,result)=>{
		res.json(result);
	})
})
router.post('/add_student',verifyToken,json,(req,res)=>{
	 let date_new  = moment(req.body.registerdate).toISOString();
	conn.query(`insert into students (id,name,email,reg_date)
    values(Null,'${req.body.name}','${req.body.email}','${date_new}')`,function(error,result){
      if(!error && result.affectedRows===1){
        res.json({response:'Data Added Successfully',errors:0,flag:true});
      }
      else {
        res.json({response:'Errors',errors:error,flag:false});
      }
    })
})

router.get('/get_student',verifyToken,function(req,res){
	conn.query('select * from students where id='+req.query.student_id,(err,result)=>{
		res.json(result);
	})
})

router.post('/edit_student',verifyToken,json,(req,res)=>{
	 let date_new  = moment(req.body.registerdate).toISOString();
	conn.query(`update students set name='${req.body.name}',email='${req.body.email}',reg_date='${date_new}' where id=${req.query.student_id}`,function(error,result){
      if(!error && result.affectedRows===1){
        res.json({response:'Record Edited Successfully',errors:0,flag:true});
      }
      else {
        res.json({response:'Errors',errors:error,flag:false});
      }
    })
});
router.get('/delete_student/:id',verifyToken,(req,res)=>{
	conn.query('delete from students where id ='+req.params.id,(error,result)=>{
		if(!error && result.affectedRows===1){
			res.json({response:'Record Deleted successfully',deleted:true});
		}
		else {
			res.json({response:'Errors',errors:error,deleted:false});
		}
	})
})

module.exports = router;
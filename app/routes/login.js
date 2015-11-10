var express = require('express');
var login = express.Router();
var http = require('http');
var User = require('../models/user.js');

login.route('/')
.get(function(req,res){
	res.render('login',{title:'SGS'});
});

login.route('/')
.post(function(req,res){

	/*
		User.find(function(err,docs){
			if(!err){
				console.log(docs);
			}else{
				console.log(err);
			}
		});
	*/

		req.body.email&&User.findOne({ 'email': req.body.email }, 'dni name password roles', function (err, person) {

		  if (err) {
		  	console.log(err);
		  	res.send(false)
		  }else{
			  	//console.log(req.body);
			  	console.log(person);
			  	if(person&&(person.password==req.body.password)){
			  			console.log("password correct");
								req.session.email = req.body.email;
								req.session.roles = person.roles;
					  	res.send({
					  			email:req.session.email
					  		,name:person.name
					  		,roles:person.roles
					  	});
			  	};
		  };
		  //res.send(false)
		});

});


module.exports = login;



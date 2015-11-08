var express = require('express');
var index = express.Router();
var User = require('../models/user.js');
/*
var user = new User({
    "dni": "46463112",
    "name": "Gustavo",
    "lastname": "Gonzales",
    "borndate": "31/07/1990",
    "email": "gustavo.gonda@gmail.com",
    "password": "12345",
    "roles": [
        "563fa7a0e4b0ecb0579df927"
    ],
    "direccion": "456 The Five Avenue, Trump Tower",
    "departamento": "",
    "provincia": "",
    "distrito": ""
});

user.save(function(err, user) {
  if (err) return console.error(err);
  console.dir(user);
});
*/
index.route('/')
.get(function(req,res){
		if(req.session.email){
			res.redirect('/sgsapp')
		}else{
			res.redirect('/login')
		}
});


index.route('/login')
.get(function(req,res){
	res.render('login',{title:'SGS'});
});

index.route('/login')
.post(function(req,res){

});

var isAuthenticated = function(req,res,next){

	if(req.session.email){
		next();
	}else{
		res.redirect('/login');
	}

};

index.route('/sgsapp')
.get(isAuthenticated,function(req,res){
			res.render('index',{
				title:'SGS',
				email:req.session.email
			});
});

module.exports = index;

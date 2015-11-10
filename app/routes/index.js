var express = require('express');
var index = express.Router();
var User = require('../models/user.js');

index.route('/')
.get(function(req,res){
		if(req.session.email){
			res.redirect('/sgsapp')
		}else{
			res.redirect('/login')
		}
});





module.exports = index;

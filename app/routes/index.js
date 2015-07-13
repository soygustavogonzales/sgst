var express = require('express');
var index = express.Router();

index.route('/')
.get(function(req,res){
		res.render('index',{title: 'Express'})
})
index.nameSpace = "/"
module.exports = index;

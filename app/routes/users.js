var express = require('express');
var users = express.Router();
var User = require('../models/user.js');

var listAll = function(req,res){
	var query = User.find();
	query.exec(function (err, docs) {
		res.json(docs)
	});
}

var create = function(req,res){
	User.create(req.body, function (err, ground) {
	  if (err) res.send(err);
	  res.send(ground)
	})
};

var remove = function(req,res){
	User.find({_id:req.params.id}).remove(function(err){
			console.log(err);
			res.send(true);
	})
};

var update = function(req,res){

	console.log(req.body._id);
	User.findById(req.params.id, function (err, ground) {
		console.log(ground._id);
	  if (err) {
	  	res.send(false);
	  }
	  else{
	  	Object.keys(req.body)
	  	.forEach(function(attr){
						 if(attr!='id'||attr!='__v'){
						 		ground[attr] = req.body[attr];
						 } 		
	  	});
		  ground.save(function(){
		  	res.send(true);
		  });
	  }
	});
	
};

users.route('/').get(listAll);
users.route('/').post(create);
users.route('/:id').delete(remove);
users.route('/:id').put(update);

module.exports = users;

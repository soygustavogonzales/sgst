var express = require('express');
var grounds = express.Router();
var Ground = require('../models/ground.js');

var listAll = function(req,res){
	var query = Ground.find();
	query.exec(function (err, docs) {
		res.json(docs)
	});
}

var create = function(req,res){
	Ground.create(req.body, function (err, ground) {
	  if (err) res.send(err);
	  res.send(ground)
	})
};

var remove = function(req,res){
	Ground.find({_id:req.params.id}).remove(function(err){
			console.log(err);
			res.send(true);
	})
};

var update = function(req,res){

	console.log(req.body._id);
	Ground.findById(req.params.id, function (err, ground) {
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

grounds.route('/').get(listAll);
grounds.route('/').post(create);
grounds.route('/:id').delete(remove);
grounds.route('/:id').put(update);

module.exports = grounds;

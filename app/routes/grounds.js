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
	//console.log(req.body);
	var ground = new Ground(req.body)
	ground.save(function(err){
  if(err)
   console.log(err);
  else
   res.send(true);
	})
};

var remove = function(req,res){
	Ground.find({_id:req.params.id}).remove(function(err){
			console.log(err);
			res.send(true);
	})
};

var update = function(req,res){

	var q = Model.where({ _id: req.params.id });
	q.setOptions({ multi: true, overwrite: true })
	q.update(req.body);
	q.update(function(){
		res.send(true);		
	});
	
};

grounds.route('/list').get(listAll);
grounds.route('/create').post(create);
grounds.route('/delete/:id').delete(remove);
grounds.route('/update/:id').put(update);

module.exports = grounds;

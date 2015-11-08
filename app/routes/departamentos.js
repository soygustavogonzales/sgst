var express = require('express');
var Departamentos = express.Router();
var Departamento = require('../models/departamento.js');

var listAll = function(req,res){
	var query = Departamento.find();
	query.exec(function (err, docs) {
		res.json(docs)
	});
}

var create = function(req,res){
	//console.log(req.body);
	var Departamento = new Departamento(req.body)
	Departamento.save(function(err){
  if(err)
   console.log(err);
  else
   res.send(true);
	})
};

var remove = function(req,res){
	Departamento.find({_id:req.params.id}).remove(function(err){
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

Departamentos.route('/list').get(listAll);
Departamentos.route('/create').post(create);
Departamentos.route('/delete/:id').delete(remove);
Departamentos.route('/update/:id').put(update);

module.exports = Departamentos;

var express = require('express');
var users = express.Router();

users.route('/list')
.get(function(req,res){
		res.json([
				{
					name:"omar",
					lastname:"gonzales"
				},
				{
					name:"erick",
					lastname:"gonzales"
				}
		])
})
module.exports = users;

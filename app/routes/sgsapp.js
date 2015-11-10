var express = require('express');
var sgsapp = express.Router();
var https = require('https');



var isAuthenticated = function(req,res,next){

	if(req.session.email){
		next();
	}else{
		res.redirect('/login');
	}

};

sgsapp.route('/')
.get(isAuthenticated,function(req,res){
			
	console.log(req.session.email);
	console.log(req.session.roles);
	var src = "https://api.mongolab.com/api/1/databases/",
	apiKey = "apiKey=0oCyMLZSK6EP9cmujUBHImYf2Pnh-bRT";
	
	var parserQuery = function(queryFirst,queryLast){
		return src+queryFirst+apiKey+(queryLast||"")
	}

		
			var page = null;
			https.get(parserQuery("sgsdb/collections/rol/"+req.session.roles[0]+"?"), function(response){

					response.on('data', function(d) {
						if(d.toString('utf8')){
							try{

			   	 var userRole = JSON.parse(d.toString('utf8'));
						}catch(e){

						}
			    console.log(userRole.nombre);

					    switch(userRole.nombre){
					    	case 'vendedor':
					    		page = "salesman";
					    		break;
					    	case 'comprador':
					    		page = "buyer";
					    		break;
					    	default:
					    		page = 'Tu no tienes roles !';
					    		break;
					    }
							};

							res.render(page,{
								title:'SGS',
								email:req.session.email
							});

			  });


			}).on('error', function(e){
					console.log(e);
			});


});

module.exports = sgsapp;

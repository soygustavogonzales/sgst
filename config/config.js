var q = require('q'),
fs = require('fs'),
l = console.log,
path_ = '../app/routes';

var list_routes = [
	{
		nameSpace:'/',
		path:path_+'/'+'index'
	},
	{
		nameSpace:'/users',
		path:path_+'/'+'users'
	}
]

module.exports.readFiles_ = function(path) {
	var defer =  q.defer(), listFilesJS = new Array() 
	fs.readdir(path,function(err,files){
			nroIndexFiles = files.length-1
			if (err)
				l(err)
			else{
					files.forEach(function(filename,index){
						var newPath = path+'/'+filename
							fs.stat(newPath,function(err,stats){
									if(err){
										defer.reject(err)
									}
									else
										if(stats.isFile()){//si es un archivo
											l("Es un archivo")
											listFilesJS.push({
												filename:filename,
												path:path
											})
											if(index==nroIndexFiles){
													l(listFilesJS)
													defer.resolve(listFilesJS)
											}
										}
										else if(stats.isDirectory()){//si es una carpeta
											console.error("Es un directorio")
										}
							})
					})
				
			}
	})
	return defer.promise
}



module.exports.initRoutes = function(app){

			list_routes.forEach(function(r,index){
				var rout = require(r.path)
				app.use(r.nameSpace,rout)
			})

};

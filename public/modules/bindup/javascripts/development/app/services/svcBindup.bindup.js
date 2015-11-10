var svcBindup = function($resource,$q){

		this.Bindup = $resource('/bindup/:id', null, {
				'update':{method:'PUT'}
		});

		this.create = function(data){

				var defer = $q.defer();
				var bindup = new this.Bindup();
				bindup = angular.extend(bindup,data);
				//console.log(Object.keys(bindup));
				bindup.$save(function(newBindup){
						defer.resolve(newBindup)
				});
				return defer.promise; 
		};

		this.getAll = function(){
				return this.Bindup.query().$promise;
		};

		this.update = function(opt){
			return this.Bindup.update(opt.conditions,opt.data).$promise
		};

		

}

svcBindup.$inject = [
	'$resource'
	,'$q'
];

bindupApp.service('svcBindup',svcBindup);
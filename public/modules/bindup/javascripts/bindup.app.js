var bindupApp = angular.module('bindupApp',[]);

buyerApp.requires.push('bindupApp');

buyerApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('bindup',{
			url:'/',
			templateUrl:'/modules/bindup/views/bindup.html',
			controller:'ctrlBindup'
		})
}])
/*
*/
var ctrlBindup = function(
	$scope
	,uiGmapGoogleMapApi
	,$mdDialog
	,$mdToast
	,$http
	,ftySharedScope
	,$resource
	,svcGrounds
 ,svcMongoAPI
 ,$firebaseArray
 ,$firebaseObject
	){

		$scope.subastas = {};
		$scope.subastas.grounds = [];

	var ref = new Firebase("https://sgsapp.firebaseio.com");
	var listSub_ = $firebaseObject(ref);
	var obj = $firebaseObject(ref);

	obj.$watch(function() {
	  
	  console.log(obj);
	  $scope.subastas.forEach(function(subasta){
	  		var puja = obj[subasta._id.$oid];
	  		var puja_ = puja.split(',');
	  		subasta.pujas = [{
	  			comprador:puja_[2],
	  			monto:puja_[1]
	  		}]
	  });

	});

	//console.log(listSub_);


	$scope.pujar = function($index){
			console.log(angular.element('.monto'+$index).val());
			obj[$scope.subastas[$index]._id.$oid] = "102030,"+angular.element('.monto'+$index).val()+",Renzo@gmail.com";
			obj.$save().then(function(ref) {
			  ref.key() === obj.$id; // true
			}, function(error) {
			  console.log("Error:", error);
			});
	};

	uiGmapGoogleMapApi.then(function(){
  svcMongoAPI.get("sgsdb/collections/subastas/?").then(function(data){

  	$scope.subastas = data.data;
  	console.log($scope.subastas);
  	$scope.subastas.forEach(function(subasta){
  		/*

							obj[subasta._id.$oid] = 15+10;
							obj.$save().then(function(ref) {
							  ref.key() === obj.$id; // true
							}, function(error) {
							  console.log("Error:", error);
							});
  		*/

  		
  		console.log(subasta);
  		terrenoId = subasta.terrenoId;
 	  svcMongoAPI.get("sgsdb/collections/grounds/"+terrenoId+"?").then(function(data){
		  		subasta.ground = data.data;
		  		//$scope.$apply();
  					//console.log(data.data);
		  });
  	});
  		/*
  		*/

  });

	});
};


ctrlBindup.$inject = [
'$scope'
,'uiGmapGoogleMapApi'
,'$mdDialog'
,'$mdToast'
,'$http'
,'ftySharedScope'
,'$resource'
,'svcGrounds'
,'svcMongoAPI'
,'$firebaseArray'
,'$firebaseObject'
];

bindupApp.controller('ctrlBindup',ctrlBindup);
bindupApp.controller('ctrlModal', ['$rootScope','$scope','$mdDialog','$compile', function($rootScope,$scope,$mdDialog,$compile){

			$scope.content = {
				title:"Creando Terreno"
			};



		Object.observe($scope.ground, function(){

		});
		/*
		*/
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {

  	//console.log($scope.ground);
  	//console.log($rootScope);
    $mdDialog.hide(answer);
  };
}])
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
bindupApp.factory("ftySharedScope",['$rootScope', function($rootScope) {
    var scope = $rootScope.$new(true);
    scope.user = {};
    return scope;
}]);
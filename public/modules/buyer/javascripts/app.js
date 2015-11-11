var buyerApp = angular.module('buyerApp',[
		,'angucomplete-alt'
		,'ngMaterial'
		,'ui.router'
		,'ngMessages'
		,'LocalStorageModule'
		,'ngSanitize'
	 ,'uiGmapgoogle-maps'
	 ,'ngImageInputWithPreview'
	 ,'angular-loading-bar'
	 ,'ngAnimate'
	 ,'ngResource'
	 ,'ngCookies'
	 ,'firebase'
	 ]);

buyerApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

buyerApp.config(['localStorageServiceProvider',function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('buyerApp');
 localStorageServiceProvider
    .setStorageType('sessionStorage');

}])


/*
buyerApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	
}])
*/

buyerApp.controller('ctrlBuyer', [
  '$rootScope'
  ,'$scope'
  ,'$mdBottomSheet'
  ,'svcMongoAPI'
  ,'$cookies'
  ,'$q'
  ,'ftySharedScope'
  , function(
    $rootScope
    ,$scope
    ,$mdBottomSheet
    ,svcMongoAPI
    ,$cookies
    ,$q
    ,ftySharedScope
    ){

    function getPrivs(){
      
      var defer = $q.defer();
      var userJSON = null;
      var userString = $cookies.get('userSession');
      userString&&userString.trim()
      if(userString&&userString.trim()){
        try{
          userJSON = JSON.parse(userString);

        }catch(e){
          userJSON = null;
        }
      }

      if(userJSON.email){

        //console.log(userJSON.roles);
        svcMongoAPI.get("sgsdb/collections/rol/"+userJSON.roles[0]+"?").then(function(data){
          //console.log(data.data.privilegios);
          /*
          */
          var priv = [];
          var priv_ = data.data.privilegios;
          data.data.privilegios.forEach(function(privId){

              svcMongoAPI.get("sgsdb/collections/privilegio/"+privId+"?").then(function(data){
                //console.log(data.data);
                priv.push(data.data)
                if(priv.length == priv_.length){
                  defer.resolve(priv);
                }
              });
          });
          
        });
      }
      return defer.promise;
    }

    getPrivs()
    .then(function(privList){
      //console.log(privList);
      ftySharedScope.user.privilegios = privList 
      
    })


  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/modules/buyer/views/menu-bottom.html',
      controller: 'ctrlMenuBottom',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

}])





buyerApp.controller('ctrlMenuBottom',
  [
  '$scope'
  ,'$mdBottomSheet'
  ,'svcMongoAPI'
  ,'$cookies'
  ,'$q'
  ,'ftySharedScope'
  , function(
    $scope
    ,$mdBottomSheet
    ,svcMongoAPI
    ,$cookies
    ,$q
    ,ftySharedScope
    ) {


    $scope.items = ftySharedScope.user.privilegios;
    
    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
}]);

var svcGrounds = function($resource,$q){

		this.Ground = $resource('/grounds/:id', null, {
				'update':{method:'PUT'}
		});

		this.create = function(data){

				var defer = $q.defer();
				var ground = new this.Ground();
				ground = angular.extend(ground,data);
				//console.log(Object.keys(ground));
				ground.$save(function(newGround){
						defer.resolve(newGround)
				});
				return defer.promise; 
		};

		this.getAll = function(){
				return this.Ground.query().$promise;
		};

		this.update = function(opt){
			return this.Ground.update(opt.conditions,opt.data).$promise
		};

		

}

svcGrounds.$inject = [
	'$resource'
	,'$q'
];

buyerApp.service('svcGrounds',svcGrounds);
buyerApp
.service('svcMongoAPI', ['$http',function ($http) {
	var src = "https://api.mongolab.com/api/1/databases/",
	apiKey = "apiKey=0oCyMLZSK6EP9cmujUBHImYf2Pnh-bRT";
	var parserQuery = function(queryFirst,queryLast){
		return src+queryFirst+apiKey+(queryLast||"")
	}

	this.get = function(queryFirst,queryLast){
		return $http.get(parserQuery(queryFirst,queryLast))
	}

	this.post = function(queryFirst,queryLast,data){
		return $http.post(parserQuery(queryFirst,queryLast),data,
			{headers:{
			"Content-Type": "application/json"
		}})
	}
	this.put = function(queryFirst,queryLast,data){
		return $http.put(parserQuery(queryFirst,queryLast),data,
			{headers:{
			"Content-Type": "application/json"
		}})
	}
	this.delete = function(queryFirst,queryLast){
		return $http.delete(parserQuery(queryFirst,queryLast))
	}

}])
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
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
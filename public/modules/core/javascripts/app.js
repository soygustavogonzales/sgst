var coreApp = angular.module('coreApp',[
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
	 ]);
coreApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

coreApp.config(['localStorageServiceProvider',function(localStorageServiceProvider) {
	localStorageServiceProvider
		.setPrefix('coreApp');
 localStorageServiceProvider
    .setStorageType('sessionStorage');

}])


/*
coreApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	
}])
*/

coreApp.controller('ctrlCore', [
  '$rootScope'
  ,'$scope'
  ,'$mdBottomSheet'
  ,'svcMongoAPI'
  ,'$cookies'
  ,'ftySharedScope'
  ,'$q'
  , function(
    $rootScope
    ,$scope
    ,$mdBottomSheet
    ,svcMongoAPI
    ,$cookies
    ,ftySharedScope
    ,$q
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
      templateUrl: '/modules/core/views/menu-bottom.html',
      controller: 'ctrlMenuBottom',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
/*
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
        console.group("start");
          console.log(fromState);
        console.groupEnd("start");
    });

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
        console.group("end");
          console.log(fromState);
        console.groupEnd("end");
    });
*/

}])

coreApp.run(['$http','$templateCache',function($http, $templateCache) {
		/*
    var urls = [
      'img/icons/share-arrow.svg',
      'img/icons/upload.svg',
      'img/icons/copy.svg',
      'img/icons/print.svg',
      'img/icons/hangout.svg',
      'img/icons/mail.svg',
      'img/icons/message.svg',
      'img/icons/copy2.svg',
      'img/icons/facebook.svg',
      'img/icons/twitter.svg'
    ];

    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });
		*/

  }]);




coreApp.controller('ctrlMenuBottom',
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

coreApp
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
coreApp.service('svcSample1', [ function(){
	//...
}])
//..
var homeApp = angular.module('homeApp',['ngMaterial','ui.router']);
/*
*/
homeApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

homeApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'/modules/home/views/home.html',
			controller:'ctrlHome'
		})
}])

coreApp.requires.push('homeApp')
;
homeApp.controller('ctrlHome', ['$scope', function($scope){
	console.log("ctrlHome");
}])
var groundsApp = angular.module('groundsApp',[]);

coreApp.requires.push('groundsApp');

coreApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('grounds',{
			url:'/',
			templateUrl:'/modules/grounds/views/grounds.html',
			controller:'ctrlGrounds'
		})
}])
/*
*/
var ctrlGrounds = function(
	$scope
	,uiGmapGoogleMapApi
	,$mdDialog
	,$mdToast
	,$http
	,ftySharedScope
	,$resource
	,svcGrounds
  ,svcMongoAPI
	){


  
  $http.get('/departamentos/list').then(function(response){
      ftySharedScope.departamentos = response.data;
	});

	uiGmapGoogleMapApi.then(function(){
				//console.log("Google Maps is Ready")
				svcGrounds.getAll().then(function(response){
						//console.log(response);
						$scope.grounds = response;
						//console.log($scope.grounds);
				});

	});

$scope.showCreateGround = function(ev){

   $mdDialog.show({
     controller: 'ctrlModalCreateGrounds',
     templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
     parent: angular.element(document.body),
     targetEvent: ev,
     clickOutsideToClose:true
   })
   .then(function(ground) {

   		svcGrounds.create(ground)
					.then(function(newGround){

								console.log(newGround)
								if(newGround){

						    $scope.grounds.push(newGround)
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno eliminado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    );
								}
							
					});
   }, function() {
     $scope.status = 'You cancelled the dialog.';
     console.log($scope.status);
   });
};

$scope.showConfirmRemove = function($index,ev){

		 var confirm = $mdDialog.confirm()
         .title('Eliminar')
         .content('¿ Estás seguro de eliminar este terreno ?.')
         .ariaLabel('Terrenos')
         .targetEvent(ev)
         .ok('Si, Eliminar!')
         .cancel('No.');

   $mdDialog.show(confirm).then(function() {

     $scope.status = 'Eliminar';
     var groundId = $scope.grounds[$index]._id
     console.log($scope.grounds[$index]._id);
     $http.delete('/grounds/'+groundId)
     .then(function(status){

							console.log(status.data);
     		if(status.data){

	      		$scope.grounds.splice($index,1)
				     $mdToast.show(
					      $mdToast.simple()
					        .content('Terreno eliminado satisfactoriamente')
					        .position('bottom left')
					        .hideDelay(3000)
					    );
     			
     		}
     		
     });
   }, function() {
     $scope.status = 'cancelar';
     console.log($scope.status);
   })
}

$scope.showEditGround = function($index,ev) {

				ftySharedScope.ground = $scope.grounds[$index];
				var groundId = $scope.grounds[$index]._id;

    $mdDialog.show({
      controller: 'ctrlModalEditGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(ground) {

    		console.log(ground);
    		svcGrounds.update({
    			conditions:{
    				id:groundId
    			},
    			data:ground
    		})
    			.then(function(response){
								console.log(response);
      		if(response.$resolved){
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno actualizado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    )
      		}    				
    		})
    		/*
	     $http.post('/grounds/update/'+groundId,ground)
      .then(function(status){

								console.log(status.data);
      		if(status.data){
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno actualizado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    )
      		}
      })
    		*/
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });
};

};


ctrlGrounds.$inject = [
'$scope'
,'uiGmapGoogleMapApi'
,'$mdDialog'
,'$mdToast'
,'$http'
,'ftySharedScope'
,'$resource'
,'svcGrounds'
,'svcMongoAPI'
];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
groundsApp.controller('ctrlModalCreateGrounds', ['$rootScope','$scope','$mdDialog','$compile', function($rootScope,$scope,$mdDialog,$compile){

			$scope.content = {
				title:"Creando Terreno"
			};

			setTimeout(function(){

					angular.element('img[style-preview]').click(function(event) {
						console.log('click en img[style-preview]');
						angular.element('input[image-with-preview]').trigger('click');
					});

			}, 1000);


		$scope.ground  = {
			image:{
				src:"http://placehold.it/100x100"
			}
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
groundsApp.controller('ctrlModalEditGrounds', ['$scope','$mdDialog','$compile','uiGmapGoogleMapApi','ftySharedScope', function($scope,$mdDialog,$compile,uiGmapGoogleMapApi,ftySharedScope){

			$scope.ground = ftySharedScope.ground;
			$scope.departamentos = ftySharedScope.departamentos;
			//console.log($scope.ground);
			$scope.content = {
				title:"Editando Terreno"
			};

			

			setTimeout(function(){
					angular.element('img[style-preview]').click(function(event) {
						//console.log('click en img[style-preview]');
						angular.element('input[image-with-preview]').trigger('click');
					});

			}, 1000);

		/*
		Object.observe($scope.ground, function(){

		});
		*/
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}])
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

groundsApp.service('svcGrounds',svcGrounds);
groundsApp.factory("ftySharedScope",['$rootScope', function($rootScope) {
    var scope = $rootScope.$new(true);
    scope.ground = {};
    scope.departamentos = {};
    scope.user = {};
    return scope;
}]);
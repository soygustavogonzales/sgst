var coreApp = angular.module('coreApp',['angucomplete-alt','ngMaterial','ui.router','ngMessages','LocalStorageModule','ngSanitize', 'uiGmapgoogle-maps','ngImageInputWithPreview']);
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

coreApp.controller('ctrlCore', ['$rootScope','$scope','$mdBottomSheet', function($rootScope,$scope,$mdBottomSheet){
  console.log("ctrlCore")

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




coreApp.controller('ctrlMenuBottom',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Gestionar Terrenos', icon: 'fa fa-building',href:"grounds" },
    { name: 'Home', icon: 'fa fa-home',href:"home" },
    { name: 'Gestionar Subastas', icon: 'fa fa-legal',href:"auctions" },
    { name: 'Mis datos', icon: 'fa fa-user',href:"data" },
    { name: 'Configuraciones', icon: 'fa fa-wrench',href:"setups" }
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}]);
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
			url:'/grounds',
			templateUrl:'/modules/grounds/views/grounds.html',
			controller:'ctrlGrounds'
		})
}])
/*
*/
var ctrlGrounds = function($scope,uiGmapGoogleMapApi,$mdDialog,$mdToast,$http,ftySharedScope){
	uiGmapGoogleMapApi.then(function(){
				console.log("Google Maps is Ready")
				$http.get('/grounds/list').then(function(response){
						$scope.grounds = response.data;
						console.log($scope.grounds);
				});
				/*
				setTimeout(function(){
						console.log("changing coordinates")
						$scope.grounds.forEach(function(element, index){
							element.coordinates = {
								latitude:-12.091140,
								longitude:-77.038493
							}
						});
						$scope.$apply();
				}, 25000);
				*/
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

						$http.post('/grounds/create',ground)
						.then(function(status){
									console.log(status.data);
									if(status.data){
					    		$mdToast.show(
							      $mdToast.simple()
							        .content('Terreno creado satisfactoriamente')
							        .position('bottom left')
							        .hideDelay(3000)
							    );
							    $scope.grounds.push(ground)
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
      $http.delete('/grounds/delete/'+groundId)
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
    $mdDialog.show({
      controller: 'ctrlModalEditGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(ground) {

	     $http.update('/grounds/update/'+groundId,ground)
      .then(function(status){

								console.log(status.data);
      		if(status.data){
		      		$scope.grounds.splice($index,1)
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno actualizado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    )
      		}
      })
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });
  };

};


ctrlGrounds.$inject = ['$scope','uiGmapGoogleMapApi','$mdDialog','$mdToast','$http','ftySharedScope'];

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
			//console.log($scope.ground);
			$scope.content = {
				title:"Editando Terreno"
			};

			

			setTimeout(function(){
					angular.element('img[style-preview]').click(function(event) {
						console.log('click en img[style-preview]');
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
groundsApp.factory("ftySharedScope",['$rootScope', function($rootScope) {
    var scope = $rootScope.$new(true);
    scope.ground = {};
    return scope;
}]);
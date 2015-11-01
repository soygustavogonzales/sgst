var coreApp = angular.module('coreApp',['angucomplete-alt','ngMaterial','ui.router','ngMessages','LocalStorageModule','ngSanitize', 'uiGmapgoogle-maps']);
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
var ctrlGrounds = function($scope,uiGmapGoogleMapApi,$mdDialog){
	uiGmapGoogleMapApi.then(function(){
				console.log("Google Maps is Ready")
				$scope.grounds = [
						{
							regPub:"10203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"11203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"12203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque necessitatibus natus ex inventore dolorem ipsum totam culpa ullam dolores, qui!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"13203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 15, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"14203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 5, longitude: -73 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						}
				]
	});

	$scope.showConfirmRemove = function(ev){
			 var confirm = $mdDialog.confirm()
          .title('Eliminar')
          .content('¿ Estás seguro de eliminar este terreno ?.')
          .ariaLabel('Terrenos')
          .targetEvent(ev)
          .ok('Si, Eliminar!')
          .cancel('No.');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'Eliminar';
      console.log($scope.status);
    }, function() {
      $scope.status = 'cancelar';
      console.log($scope.status);
    })
	}

$scope.showEditGround = function(ev) {
    $mdDialog.show({
      controller: 'ctrlModalEditGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
      console.log($scope.status);
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });
  };

};

ctrlGrounds.$inject = ['$scope','uiGmapGoogleMapApi','$mdDialog'];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
groundsApp.controller('ctrlModalEditGrounds', ['$scope','$mdDialog', function($scope,$mdDialog){
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
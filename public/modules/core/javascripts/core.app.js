var coreApp = angular.module('coreApp',['angucomplete-alt','ngMaterial','ui.router','ngMessages','LocalStorageModule','ngSanitize']);
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

coreApp.controller('ctrlCore', ['$scope','$mdBottomSheet', function($scope,$mdBottomSheet){
  console.log("ctrlCore")
  $scope.alert = '';
  $scope.isOpen = false;
  $scope.demo = {
    isOpen: false,
    count: 0,
    selectedAlignment: 'md-right'
  };
  $scope.demo2 = {
    isOpen: false,
    count: 0,
    selectedAlignment: 'md-right'
  };
  $scope.ya = function(){
  	console.log("hola")
  	$scope.demo.isOpen = $scope.demo.isOpen?false:true;
  }
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
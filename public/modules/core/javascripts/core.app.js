var coreApp = angular.module('coreApp',['ngMaterial','ui.router','ngMessages','LocalStorageModule']);
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

coreApp.run(['localStorageService','svcArticles',function(localStorageService,svcArticles){
		svcArticles.getAllArticles()
		.then(function(response){

			while(typeof(response.data)=="string"){
				response.data = JSON.parse(response.data)
			};
  	localStorageService.set('articles',JSON.stringify(response.data));
		},
		function(err){
			console.log(err);
		});
		

}])
/*
coreApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	
}])
*/
;
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



;
coreApp.controller('ctrlMenuBottom',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Ventas', icon: 'fa fa-credit-card',href:"sales" },
    { name: 'Inicio', icon: 'fa fa-home',href:"home" },
    { name: 'Compras', icon: 'fa fa-cart-plus',href:"shopping" },
    { name: 'Reportes', icon: 'fa fa-area-chart',href:"reports" },
    { name: 'Configuraciones', icon: 'fa fa-wrench',href:"setup" },
    { name: 'Twitter', icon: 'fa fa-street-view',href:"sales" },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}]);;
coreApp.service('svcSample1', [ function(){
	//...
}]);
//..
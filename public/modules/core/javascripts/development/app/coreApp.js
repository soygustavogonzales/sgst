var coreApp = angular.module('coreApp',['ngMaterial','ui.router']);
/*
*/
coreApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

coreApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	/*
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'/modules/home/views/home.html',
			controller:'ctrlHome'
		})
		.state('ventas',{
			url:'/ventas',
			templateUrl:'',
			controller:'ctrlVentas'
		})
		.state('compras',{
			url:'/compras',
			templateUrl:'',
			controller:'ctrlCompras'
		})
	*/
}])

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
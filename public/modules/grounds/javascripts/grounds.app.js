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
var ctrlGrounds = function($scope){
	$scope.saiHi = "hola desde ctrlGrounds"
};

ctrlGrounds.$inject = ['$scope'];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
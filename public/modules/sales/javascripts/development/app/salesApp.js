var salesApp = angular.module('salesApp',['ngMaterial','ui.router']);
/*
*/
salesApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}]);

salesApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('sales',{
			url:'/',
			views:{
				'@':{
					templateUrl:'/modules/sales/views/sales.html',
					controller:'ctrlSales'
				},
				'info@sales':{
						templateUrl:'/modules/sales@info/views/sales@info.html',
						controller:'ctrlInfo'
				},
				'detail@sales':{
						template:'<em>hello from detail@sales</em>',
						controller:'ctrlInfo'
				}
			}
		})
}])

coreApp.requires.push('salesApp')

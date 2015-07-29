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

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

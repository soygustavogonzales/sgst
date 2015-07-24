var coreApp = angular.module('coreApp',['ngMaterial','ui.router']);
/*
*/
coreApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])


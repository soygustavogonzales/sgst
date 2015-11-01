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
var ctrlGrounds = function($scope,uiGmapGoogleMapApi){
	uiGmapGoogleMapApi.then(function(){
				console.log("Google Maps is Ready")
				$scope.grounds = [
						{
							regPub:"10203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/200x200"
						},
						{
							regPub:"11203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/200x200"
						},
						{
							regPub:"12203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque necessitatibus natus ex inventore dolorem ipsum totam culpa ullam dolores, qui!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/200x200"
						},
						{
							regPub:"13203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 15, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/200x200"
						},
						{
							regPub:"14203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 5, longitude: -73 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/200x200"
						}
				]
	});

};

ctrlGrounds.$inject = ['$scope','uiGmapGoogleMapApi'];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
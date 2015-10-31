/*
*/
var ctrlGrounds = function($scope){
	$scope.saiHi = "hola desde ctrlGrounds"
};

ctrlGrounds.$inject = ['$scope'];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
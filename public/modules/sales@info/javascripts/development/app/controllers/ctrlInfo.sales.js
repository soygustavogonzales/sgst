/*
*/
var ctrlInfo = function($scope){
	$scope.saiHi = "hola desde ctrlInfo"
	alert($scope.saiHi)
};

//ctrlInfo.$inject = ['$scope'];

salesApp.controller('ctrlInfo',['$scope',ctrlInfo]);
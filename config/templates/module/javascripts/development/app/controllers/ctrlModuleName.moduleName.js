/*
*/
var ctrlInfo = function($scope){
	$scope.saiHi = "hola desde ctrlInfo"
};

ctrlInfo.$inject = ['$scope'];

salesApp.controller('ctrlInfo',ctrlInfo);
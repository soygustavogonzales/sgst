var salesApp = angular.module('salesApp',['ngMaterial','ui.router']);
/*
*/
salesApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

salesApp.config(['$stateProvider','$urlRouterProvider', function( $stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('sales',{
			url:'/',
			templateUrl:'/modules/sales/views/sales.html',
			controller:'ctrlSales'
		})
}])

coreApp.requires.push('salesApp')
;
salesApp.controller('ctrlSales', ['$scope','localStorageService', function($scope,localStorageService){


  $scope.querySearch = function (query) {
    
    var jsonData =  JSON.parse(localStorageService.get('articles'))
    while(typeof(jsonData) == "string"){
      console.log(jsonData);
      jsonData = JSON.parse(jsonData)
    }
    var results = query ? jsonData.filter(createFilterFor(query)) : jsonData;
    return results;
  }

  $scope.selectedItemChange = function(item) {
    console.info('Item changed to ' + JSON.stringify(item));
  }

  function createFilterFor(query) {
    console.log(query);
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
      var result_ = state.value.indexOf(lowercaseQuery) === 0 
      console.log(result_);
      return result_;
    };

  }
}]);
salesApp.service('svcArticles', ['$http','$q', function($http,$q){
/**/
	this.getAllArticles = function(){

			return $http.get('http://localhost:3001/sales.articulos');

	}

}])
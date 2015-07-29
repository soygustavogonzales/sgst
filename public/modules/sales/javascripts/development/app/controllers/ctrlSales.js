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
}])
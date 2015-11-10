coreApp.controller('ctrlMenuBottom',
  [
  '$scope'
  ,'$mdBottomSheet'
  ,'svcMongoAPI'
  ,'$cookies'
  ,'$q'
  ,'ftySharedScope'
  , function(
    $scope
    ,$mdBottomSheet
    ,svcMongoAPI
    ,$cookies
    ,$q
    ,ftySharedScope
    ) {


    $scope.items = ftySharedScope.user.privilegios;
    
    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
}]);

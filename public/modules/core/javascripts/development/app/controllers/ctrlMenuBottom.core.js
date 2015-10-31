coreApp.controller('ctrlMenuBottom',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Gestionar Terrenos', icon: 'fa fa-building',href:"grounds" },
    { name: 'Home', icon: 'fa fa-home',href:"home" },
    { name: 'Gestionar Subastas', icon: 'fa fa-legal',href:"auctions" },
    { name: 'Mis datos', icon: 'fa fa-user',href:"data" },
    { name: 'Configuraciones', icon: 'fa fa-wrench',href:"setups" }
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}]);
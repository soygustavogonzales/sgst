coreApp.controller('ctrlMenuBottom',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Ventas', icon: 'fa fa-credit-card',href:"sales" },
    { name: 'Inicio', icon: 'fa fa-home',href:"home" },
    { name: 'Compras', icon: 'fa fa-cart-plus',href:"shopping" },
    { name: 'Reportes', icon: 'fa fa-area-chart',href:"reports" },
    { name: 'Configuraciones', icon: 'fa fa-wrench',href:"setup" },
    { name: 'Twitter', icon: 'fa fa-street-view',href:"sales" },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}]);
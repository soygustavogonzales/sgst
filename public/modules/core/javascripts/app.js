var coreApp = angular.module('coreApp',['ngMaterial','ui.router']);
/*
*/
coreApp.config(['$mdIconProvider',function($mdIconProvider) {
	$mdIconProvider
			.defaultFontSet('fontawesome');
}])

;coreApp.controller('ctrlBottomSheetExample', ['$scope','$mdBottomSheet', function($scope,$mdBottomSheet){
  $scope.alert = '';

  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-list-template.html',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-grid-template.html',
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

}])

coreApp.controller('ListBottomSheetCtrl',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {

  $scope.items = [
    { name: 'Share', icon: 'fa fa-bed' },
    { name: 'Upload', icon: 'fa fa-forumbee' },
    { name: 'Copy', icon: 'fa fa-mars' },
    { name: 'Print this page', icon: 'fa fa-neuter' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}])
coreApp.controller('GridBottomSheetCtrl',['$scope','$mdBottomSheet', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'fa fa-bed' },
    { name: 'Mail', icon: 'fa fa-forumbee' },
    { name: 'Message', icon: 'fa fa-mars' },
    { name: 'Copy', icon: 'fa fa-neuter' },
    { name: 'Facebook', icon: 'fa fa-ship' },
    { name: 'Twitter', icon: 'fa fa-street-view' },
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}])
coreApp.run(['$http','$templateCache',function($http, $templateCache) {
		/*
    var urls = [
      'img/icons/share-arrow.svg',
      'img/icons/upload.svg',
      'img/icons/copy.svg',
      'img/icons/print.svg',
      'img/icons/hangout.svg',
      'img/icons/mail.svg',
      'img/icons/message.svg',
      'img/icons/copy2.svg',
      'img/icons/facebook.svg',
      'img/icons/twitter.svg'
    ];

    angular.forEach(urls, function(url) {
      $http.get(url, {cache: $templateCache});
    });
		*/

  }]);



;coreApp.service('svcSample1', [ function(){
	//...
}]);//..
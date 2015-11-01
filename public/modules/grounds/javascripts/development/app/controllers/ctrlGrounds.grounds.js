/*
*/
var ctrlGrounds = function($scope,uiGmapGoogleMapApi,$mdDialog){
	uiGmapGoogleMapApi.then(function(){
				console.log("Google Maps is Ready")
				$scope.grounds = [
						{
							regPub:"10203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"11203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"12203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 48.87291, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque necessitatibus natus ex inventore dolorem ipsum totam culpa ullam dolores, qui!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"13203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 15, longitude: 2.3537 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						},
						{
							regPub:"14203040",
							direction:"Av.ABC #123",
							coordinates:{ latitude: 5, longitude: -73 },
							notes:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, unde?",
							picture:"http://placehold.it/100x100"
						}
				]
	});

	$scope.showConfirmRemove = function(ev){
			 var confirm = $mdDialog.confirm()
          .title('Eliminar')
          .content('¿ Estás seguro de eliminar este terreno ?.')
          .ariaLabel('Terrenos')
          .targetEvent(ev)
          .ok('Si, Eliminar!')
          .cancel('No.');
    $mdDialog.show(confirm).then(function() {
      $scope.status = 'Eliminar';
      console.log($scope.status);
    }, function() {
      $scope.status = 'cancelar';
      console.log($scope.status);
    })
	}

$scope.showEditGround = function(ev) {
    $mdDialog.show({
      controller: 'ctrlModalEditGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
      console.log($scope.status);
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });
  };

};

ctrlGrounds.$inject = ['$scope','uiGmapGoogleMapApi','$mdDialog'];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
/*
*/
var ctrlGrounds = function($scope,uiGmapGoogleMapApi,$mdDialog,$mdToast,$http,ftySharedScope){
	uiGmapGoogleMapApi.then(function(){
				console.log("Google Maps is Ready")
				$http.get('/grounds/list').then(function(response){
						$scope.grounds = response.data;
						console.log($scope.grounds);
				});
				/*
				setTimeout(function(){
						console.log("changing coordinates")
						$scope.grounds.forEach(function(element, index){
							element.coordinates = {
								latitude:-12.091140,
								longitude:-77.038493
							}
						});
						$scope.$apply();
				}, 25000);
				*/
	});

	$scope.showCreateGround = function(ev){

    $mdDialog.show({
      controller: 'ctrlModalCreateGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(ground) {

						$http.post('/grounds/create',ground)
						.then(function(status){
									console.log(status.data);
									if(status.data){
					    		$mdToast.show(
							      $mdToast.simple()
							        .content('Terreno creado satisfactoriamente')
							        .position('bottom left')
							        .hideDelay(3000)
							    );
							    $scope.grounds.push(ground)
									}
								
						});
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });

	};

	$scope.showConfirmRemove = function($index,ev){

			 var confirm = $mdDialog.confirm()
          .title('Eliminar')
          .content('¿ Estás seguro de eliminar este terreno ?.')
          .ariaLabel('Terrenos')
          .targetEvent(ev)
          .ok('Si, Eliminar!')
          .cancel('No.');

    $mdDialog.show(confirm).then(function() {

      $scope.status = 'Eliminar';
      var groundId = $scope.grounds[$index]._id
      console.log($scope.grounds[$index]._id);
      $http.delete('/grounds/delete/'+groundId)
      .then(function(status){

								console.log(status.data);
      		if(status.data){

		      		$scope.grounds.splice($index,1)
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno eliminado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    );
      			
      		}
      		
      });
    }, function() {
      $scope.status = 'cancelar';
      console.log($scope.status);
    })
	}

$scope.showEditGround = function($index,ev) {

				ftySharedScope.ground = $scope.grounds[$index];
    $mdDialog.show({
      controller: 'ctrlModalEditGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(ground) {

	     $http.update('/grounds/update/'+groundId,ground)
      .then(function(status){

								console.log(status.data);
      		if(status.data){
		      		$scope.grounds.splice($index,1)
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno actualizado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    )
      		}
      })
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });
  };

};


ctrlGrounds.$inject = ['$scope','uiGmapGoogleMapApi','$mdDialog','$mdToast','$http','ftySharedScope'];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
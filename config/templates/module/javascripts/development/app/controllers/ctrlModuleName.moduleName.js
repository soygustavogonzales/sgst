/*
*/
var ctrlGrounds = function(
	$scope
	,uiGmapGoogleMapApi
	,$mdDialog
	,$mdToast
	,$http
	,ftySharedScope
	,$resource
	,svcGrounds
	){


	$http.get('/departamentos/list').then(function(response){
			ftySharedScope.departamentos = response.data;
	});

	uiGmapGoogleMapApi.then(function(){
				//console.log("Google Maps is Ready")
				svcGrounds.getAll().then(function(response){
						//console.log(response);
						$scope.grounds = response;
						//console.log($scope.grounds);
				});

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

   		svcGrounds.create(ground)
					.then(function(newGround){

								console.log(newGround)
								if(newGround){

						    $scope.grounds.push(newGround)
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno eliminado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    );
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
     $http.delete('/grounds/'+groundId)
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
				var groundId = $scope.grounds[$index]._id;

    $mdDialog.show({
      controller: 'ctrlModalEditGrounds',
      templateUrl: '/modules/grounds/views/partials/modalEditGround.grounds.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(ground) {

    		console.log(ground);
    		svcGrounds.update({
    			conditions:{
    				id:groundId
    			},
    			data:ground
    		})
    			.then(function(response){
								console.log(response);
      		if(response.$resolved){
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno actualizado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    )
      		}    				
    		})
    		/*
	     $http.post('/grounds/update/'+groundId,ground)
      .then(function(status){

								console.log(status.data);
      		if(status.data){
					     $mdToast.show(
						      $mdToast.simple()
						        .content('Terreno actualizado satisfactoriamente')
						        .position('bottom left')
						        .hideDelay(3000)
						    )
      		}
      })
    		*/
    }, function() {
      $scope.status = 'You cancelled the dialog.';
      console.log($scope.status);
    });
};

};


ctrlGrounds.$inject = [
'$scope'
,'uiGmapGoogleMapApi'
,'$mdDialog'
,'$mdToast'
,'$http'
,'ftySharedScope'
,'$resource'
,'svcGrounds'
];

groundsApp.controller('ctrlGrounds',ctrlGrounds);
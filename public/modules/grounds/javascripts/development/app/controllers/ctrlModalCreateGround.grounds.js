groundsApp.controller('ctrlModalCreateGrounds', ['$rootScope','$scope','$mdDialog','$compile', function($rootScope,$scope,$mdDialog,$compile){

			$scope.content = {
				title:"Creando Terreno"
			};

			setTimeout(function(){

					angular.element('img[style-preview]').click(function(event) {
						console.log('click en img[style-preview]');
						angular.element('input[image-with-preview]').trigger('click');
					});

			}, 1000);


		$scope.ground  = {
			image:{
				src:"http://placehold.it/100x100"
			}
		};

		Object.observe($scope.ground, function(){

		});
		/*
		*/
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {

  	//console.log($scope.ground);
  	//console.log($rootScope);
    $mdDialog.hide(answer);
  };
}])
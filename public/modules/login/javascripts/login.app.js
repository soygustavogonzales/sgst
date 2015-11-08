var loginApp = angular.module('loginApp', [
    'ngMaterial',
    'ngResource'
])
loginApp
.controller('ctrlLogin', function($scope,$resource,$http){

		$scope.send = function(){
			console.log($scope.user);
			$http.post('/login',$scope.user)
			.then(function(response){
					console.log(response);
			});
		};


})
;
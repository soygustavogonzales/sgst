loginApp
.controller('ctrlLogin', [
			'$scope'
		,'$resource'
		,'$http'
		,'$location'
		,'svcMongoAPI'
		,'$cookies'
	,function(
		$scope
		,$resource
		,$http
		,$location
		,svcMongoAPI
		,$cookies
		){

		$scope.send = function(){
			

			
			$http.post('/login',$scope.user)
			.then(function(response){

					if(response.data){
						console.log(response.data);
						if(Object.prototype.toString.call(response.data)=="[object Object]"){
							var user = JSON.stringify(response.data);
							$cookies.put('userSession',user);
						}
						window.location = window.location.origin + '/sgsapp'
					}
			});


		};


}])
;
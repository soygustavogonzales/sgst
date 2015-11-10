var loginApp = angular.module('loginApp', [
    'ngMaterial'
    ,'ngResource'
    ,'ngCookies'
])
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
loginApp
.service('svcMongoAPI', ['$http',function ($http) {
	var src = "https://api.mongolab.com/api/1/databases/",
	apiKey = "apiKey=0oCyMLZSK6EP9cmujUBHImYf2Pnh-bRT";
	var parserQuery = function(queryFirst,queryLast){
		return src+queryFirst+apiKey+(queryLast||"")
	}

	this.get = function(queryFirst,queryLast){
		return $http.get(parserQuery(queryFirst,queryLast))
	}

	this.post = function(queryFirst,queryLast,data){
		return $http.post(parserQuery(queryFirst,queryLast),data,
			{headers:{
			"Content-Type": "application/json"
		}})
	}
	this.put = function(queryFirst,queryLast,data){
		return $http.put(parserQuery(queryFirst,queryLast),data,
			{headers:{
			"Content-Type": "application/json"
		}})
	}
	this.delete = function(queryFirst,queryLast){
		return $http.delete(parserQuery(queryFirst,queryLast))
	}

}])
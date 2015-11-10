/*
*/
var ctrlBindup = function(
	$scope
	,uiGmapGoogleMapApi
	,$mdDialog
	,$mdToast
	,$http
	,ftySharedScope
	,$resource
	,svcGrounds
 ,svcMongoAPI
	){
		$scope.ground = {};
		$scope.ground.coordinates = {
			latitude:-12.345,
			longitude:-79.120119
		}
		$scope.subastas = {};
		$scope.subastas.grounds = [];


	uiGmapGoogleMapApi.then(function(){
  svcMongoAPI.get("sgsdb/collections/subastas/?").then(function(data){

  	$scope.subastas = data.data;
  	$scope.subastas.forEach(function(subasta){
  		terrenoId = subasta.terrenoId;
  		//console.log(terrenoId);
 	  svcMongoAPI.get("sgsdb/collections/grounds/"+terrenoId+"?").then(function(data){
		  		subasta.ground = data.data;
		  		//$scope.$apply();
  					//console.log(data.data);
		  });
  	});
  		/*
  		*/

  });

	});
};


ctrlBindup.$inject = [
'$scope'
,'uiGmapGoogleMapApi'
,'$mdDialog'
,'$mdToast'
,'$http'
,'ftySharedScope'
,'$resource'
,'svcGrounds'
,'svcMongoAPI'
];

bindupApp.controller('ctrlBindup',ctrlBindup);
coreApp.controller('ctrlCore', [
  '$rootScope'
  ,'$scope'
  ,'$mdBottomSheet'
  ,'svcMongoAPI'
  ,'$cookies'
  ,'ftySharedScope'
  ,'$q'
  , function(
    $rootScope
    ,$scope
    ,$mdBottomSheet
    ,svcMongoAPI
    ,$cookies
    ,ftySharedScope
    ,$q
    ){

    function getPrivs(){
      
      var defer = $q.defer();
      var userJSON = null;
      var userString = $cookies.get('userSession');
      userString&&userString.trim()
      if(userString&&userString.trim()){
        try{
          userJSON = JSON.parse(userString);

        }catch(e){
          userJSON = null;
        }
      }

      if(userJSON.email){

        //console.log(userJSON.roles);
        svcMongoAPI.get("sgsdb/collections/rol/"+userJSON.roles[0]+"?").then(function(data){
          //console.log(data.data.privilegios);
          /*
          */
          var priv = [];
          var priv_ = data.data.privilegios;
          data.data.privilegios.forEach(function(privId){

              svcMongoAPI.get("sgsdb/collections/privilegio/"+privId+"?").then(function(data){
                //console.log(data.data);
                priv.push(data.data)
                if(priv.length == priv_.length){
                  defer.resolve(priv);
                }
              });
          });
          
        });
      }
      return defer.promise;
    }

    getPrivs()
    .then(function(privList){
      //console.log(privList);
      ftySharedScope.user.privilegios = privList 
      
    })


  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/modules/core/views/menu-bottom.html',
      controller: 'ctrlMenuBottom',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
/*
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
        console.group("start");
          console.log(fromState);
        console.groupEnd("start");
    });

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
        console.group("end");
          console.log(fromState);
        console.groupEnd("end");
    });
*/

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




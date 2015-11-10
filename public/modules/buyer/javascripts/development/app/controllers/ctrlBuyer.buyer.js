buyerApp.controller('ctrlBuyer', [
  '$rootScope'
  ,'$scope'
  ,'$mdBottomSheet'
  ,'svcMongoAPI'
  ,'$cookies'
  ,'$q'
  ,'ftySharedScope'
  , function(
    $rootScope
    ,$scope
    ,$mdBottomSheet
    ,svcMongoAPI
    ,$cookies
    ,$q
    ,ftySharedScope
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
      templateUrl: '/modules/buyer/views/menu-bottom.html',
      controller: 'ctrlMenuBottom',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

}])





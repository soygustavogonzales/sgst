salesApp.controller('ctrlSales', ['$scope','localStorageService','$mdDialog','$sanitize','$sce','$compile', function($scope,localStorageService,$mdDialog,$sanitize,$sce,$compile){
  /*
  $scope.cad = "<strong>hola mundo</strong> gracias!! <script>alert('jajaja')</script>"
  $scope.html_ = $sanitize($scope.cad); //suprime los tags <script>
  $scope.html__ = $sce.trustAsHtml($scope.cad);
  */
  var countForms = 1;
  $scope.addFormArticle = function(){
    var formList = angular.element('[form-list]')
    var i = countForms;
    var html =  '<section flex="100"> <section layout-sm="column"> <md-autocomplete flex-gt-lg="99" flex-lg="99" flex-gt-md="99" flex-gt-sm="99" flex-sm="99" md-search-text="articulo'+i+'" md-search-text-change="change(articulo'+i+')" placeholder="Busca el articulo" md-items="item in querySearch(articulo'+i+')" md-item-text="item.display" md-selected-item-change="selectedItemChange(item)" class="search-article"><span md-highlight-text="articulo'+i+'" md-highlight-flags="^i">{{item.display}}</span></md-autocomplete> <md-input-container flex-gt-lg="99" flex-lg="99" flex-gt-md="99" flex-gt-sm="99" flex-sm="99"> <input maxlength="30" md-maxlength="30" type="text" required="required" name="articulo'+i+'" ng-model="articulo" class="hide"/> <ng-messages for="frmVentas.articulo'+i+'.$error"> <ng-message when="required">Escriba el articulo</ng-message> <ng-message when="md-maxlength">No se permite mas de 30 caracteres</ng-message> </ng-messages> </md-input-container> </section> <section layout="row" layout-sm="column"> <md-input-container flex-gt-md="20" flex-sm="99"> <label>Cantidad</label> <input type="number" min="1" max="99" required="required" name="cantidad'+i+'" ng-model="cantidad'+i+'"/> <ng-messages for="frmVentas.cantidad'+i+'.$error"> <ng-message when="required">Un numero</ng-message> <ng-message when="max">Maximo 99 unidades</ng-message> <ng-message when="min">Minimo 1 unidad</ng-message> </ng-messages> </md-input-container> <md-input-container flex-gt-md="20" flex-sm="99"> <label>Precio</label> <input disabled="disabled" name="precio'+i+'" ng-model="precio'+i+'"/> </md-input-container> <md-input-container flex-gt-md="60" flex-sm="99"> <label>Descripcion</label> <textarea maxlength="300" md-maxlength="300" placeholder="Comentario sobre este articulo o venta específica" columns="0" name="descripcion'+i+'" ng-model="descripcion'+i+'"></textarea> </md-input-container> </section> <section layout="row" layout-align="end start"> <md-button ng-click="addFormArticle()">Agregar otro articulo</md-button> </section> </section>'
    var html_ = $compile(html)($scope)
    formList.append(html_)
    setTimeout(function(){
      $scope.$apply()

    },100)
    countForms++;
    //console.log(html_);
  }
  $scope.sendNewBuy = function(){
    var data = {};
    
  }
  $scope.showConfirmBuy = function($event){

    var confirm = $mdDialog.confirm()
        .parent(angular.element(document.body))
        .title('¿ confirmar venta ?')
        //.content('Confirmar venta')
        .ariaLabel('confirmBuy')
        .ok('confirmar')
        .cancel('cancelar')
        .targetEvent($event);

      $mdDialog.show(confirm)
      .then(function(){
        console.log("OK");
      },function(){
        console.log("CANCEL");
      });

  }

  $scope.querySearch = function (query) {
    
    var jsonData =  JSON.parse(localStorageService.get('articles'))
    while(typeof(jsonData) == "string"){
      console.log(jsonData);
      jsonData = JSON.parse(jsonData)
    }
    var results = query ? jsonData.filter(createFilterFor(query)) : jsonData;
    return results;
  }

  $scope.selectedItemChange = function(item) {
    console.info('Item changed to ' + JSON.stringify(item));
  }

  function createFilterFor(query) {
    console.log(query);
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(state) {
      var result_ = state.value.indexOf(lowercaseQuery) === 0 
      console.log(result_);
      return result_;
    };

  }
}])
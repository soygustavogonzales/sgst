groundsApp.factory("ftySharedScope",['$rootScope', function($rootScope) {
    var scope = $rootScope.$new(true);
    scope.ground = {};
    scope.departamentos = {};
    scope.user = {};
    return scope;
}]);
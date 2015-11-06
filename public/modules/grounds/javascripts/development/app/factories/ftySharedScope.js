groundsApp.factory("ftySharedScope",['$rootScope', function($rootScope) {
    var scope = $rootScope.$new(true);
    scope.ground = {};
    return scope;
}]);
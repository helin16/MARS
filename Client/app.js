var app = angular.module('melts', ['ngMaterial']);

app.controller('MainController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
});
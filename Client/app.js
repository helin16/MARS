var app = angular.module('melts', ['ngMaterial']);

app.controller('MainController', function($scope, $mdSidenav) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.units = [
  {title: "ENG1001", description: "yo"},
  {title: "ENG1002", description: "yo2"},
  {title: "ENG1003", description: "yo3"}
  ]

  $scope.questions = [
  {title: "Lecture 1", description: "yo"},
  {title: "Lecture 2", description: "yo2"},
  {title: "Lecture 3", description: "yo2"},
  {title: "Lecture 4", description: "yo2"},
  {title: "Lecture 5", description: "yo2"},
  {title: "Lecture 6", description: "yo2"},
  {title: "Lecture 7", description: "yo2"},
  {title: "Lecture 8", description: "yo2"},
  {title: "Lecture 9", description: "yo2"},
  {title: "Lecture 10", description: "yo2"},
  {title: "Lecture 11", description: "yo2"},
  {title: "Lecture 12", description: "yo3"}
  ]
});
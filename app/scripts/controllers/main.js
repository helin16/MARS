'use strict';

/**
 * @ngdoc function
 * @name yoproApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yoproApp
 */
angular.module('yoproApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

app.controller('JoinFeedController', function($scope, $mdDialog) {
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.join = function() {
    $mdDialog.hide();
  };
})
app.controller('MyPollsController', function($scope, $mdSidenav, $state) {

  // Note this can be an easy settings option (set default start up screen)
  $state.go('myPolls.upcoming')

  $scope.openLeftMenu = function() {
  	$mdSidenav('left').toggle();
  	//$mdSidenav('groups').close(); // TODO: Find a way to do this in editcollection ctrlr
  };

  $scope.goToState = function (state) {
    $state.go(state)
    $mdSidenav('left').close();
  }
  
})

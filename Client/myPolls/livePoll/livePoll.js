app.controller('LivePollController', function($scope, $routeParams) {

	$scope.markGroupAsFinished = function () {
		$scope.upcoming[0].done = true;
	}


})
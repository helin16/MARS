app.controller('AnswerHomeController', function($scope, $routeParams, $location, $mdDialog) {

	// TODO Add service to pull feed

	// TODO Add socket io service to live update feed

	// Front page summary feed (holds all subscribed collections)
	$scope.subscriptions = [
		{collection: "ENG1001", activePoll: false, question: null},
		{collection: "ENG1002", activePoll: true, question: "Assuming an ideal inverting Op Amp, what would the gain be, if R1 was 300k ohms and R2 was 100k?"},
		{collection: "ENG1003", activePoll: true, question: "How many different data types are there in JavaScript?"}
	];

	// TODO Add watch to keep track
	$scope.activePoll = false;

	for (var i in $scope.subscriptions) {
		if ($scope.subscriptions[i].activePoll === true) {
			$scope.activePoll = true;
		}
		console.log($scope.activePoll)
	}

	$scope.alert = '';
	$scope.showAlert = function(ev) {
		$mdDialog.show({
      		controller: 'JoinFeedController',
      		templateUrl: 'answer/home/joinFeed/joinFeed.html',
      		parent: angular.element(document.body),
      		targetEvent: ev
    	})
		.then(
			function(answer) {
			  	$scope.alert = 'You said the information was "' + answer + '".';
			},
			function() {
			  	$scope.alert = 'You cancelled the dialog.';
			}
		);
	};
})

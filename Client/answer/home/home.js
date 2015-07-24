app.controller('AnswerHomeController', function($scope, $routeParams, $location, $mdDialog, $timeout) {

	// TODO Add service to pull feed

	// TODO Add socket io service to live update feed

	// NOTE: Upon recieving new Polls through socket or on initial request, check if activePollsn length ===1 and if so, set it as selectedPoll otherwise just add it to activePolls

	// Front page (holds all active polls from subscribed collections)
	$scope.subscribed = true;
	$scope.activePolls = [];
	$scope.selectedPoll = null;

	// Simulate retrieving active polls
	$timeout(activePollsRecieved, 1500);

	// Simulate recieving a new poll
	$timeout(newPoll, 6000);

	function activePollsRecieved() {
		$scope.activePolls = [
			// {
			// 	collection: "ENG1001",
			// 	question: "What is this subject? An ideal inverting Op Amp?",
			// 	answers: [
			// 		{ label: 'The gain, G, would be 0.3333', value: 1 },
			// 		{ label: 'The gain, G, would be 3', value: 2 },
			// 		{ label: 'The gain, G, would be 3*10^4', value: 3 },
			// 		{ label: 'The gain, G, would be -3', value: 4 }
			// 	]
			// },
			// {
			// 	collection: "ENG1002",
			// 	question: "Assuming an ideal inverting Op Amp, what would the gain be, if R1 was 300k ohms and R2 was 100k?",
			// 	answers: [
			// 		{ label: 'The gain, G, would be 0.3333', value: 1 },
			// 		{ label: 'The gain, G, would be 3', value: 2 },
			// 		{ label: 'The gain, G, would be 3*10^4', value: 3 },
			// 		{ label: 'The gain, G, would be -3', value: 4 }
			// 	]
			// },
			{
				collection: "ENG1003",
				question: "How many different data types are there in JavaScript?",
				answers: [
					{ label: 'The gain, G, would be 0.3333', value: 1 },
					{ label: 'The gain, G, would be 3', value: 2 },
					{ label: 'The gain, G, would be 3*10^4', value: 3 },
					{ label: 'The gain, G, would be -3', value: 4 }
				]
			}
		];

		// If there's only one poll, set it as the activePoll
		if ($scope.activePolls.length === 1) $scope.selectedPoll = $scope.activePolls[0];
	}

	function newPoll () {
		$scope.activePolls.push({
				collection: "ENG1004",
				question: "A new unit full of potential?",
				answers: [
					{ label: 'The gain, G, would be 0.3333', value: 1 },
					{ label: 'The gain, G, would be 3', value: 2 },
					{ label: 'The gain, G, would be 3*10^4', value: 3 },
					{ label: 'The gain, G, would be -3', value: 4 }
				]
			})
	}

	$scope.selectPoll = function (poll) {
		console.log(poll)
		$scope.selectedPoll = poll;
	}

	$scope.submit = function () {
		console.log("Sending answers...")
		$scope.selectedPoll = null;
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

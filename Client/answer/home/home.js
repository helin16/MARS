app.controller('AnswerHomeController', function($scope, $routeParams, $location, $mdDialog, $timeout) {

	// TODO Add service to pull feed

	// TODO Add socket io service to live update feed

	// NOTE: Upon recieving new Polls through socket or on initial request, check if activePollsn length ===1 and if so, set it as selectedPoll otherwise just add it to activePolls

	// Front page (holds all active polls from subscribed collections)
	$scope.subscribed = true;
	$scope.activePolls = [];
	$scope.selectedPoll = null;
	$scope.pollIndex = 0;

	// Simulate retrieving active polls
	$timeout(activePollsRecieved, 1000);

	// Simulate recieving a new poll
	$timeout(newPoll, 1000);

	function activePollsRecieved() {
		$scope.activePolls = [
			{
				collection: "ENG1001",
				question: "What is this subject? An ideal inverting Op Amp?",
				answers: [
					{ label: 'The gain, G, would be 0.3333' },
					{ label: 'The gain, G, would be 3' },
					{ label: 'The gain, G, would be 3*10^4' },
					{ label: 'The gain, G, would be -3' }
				]
			},
			{
				collection: "ENG1002",
				question: "Assuming an ideal inverting Op Amp, what would the gain be, if R1 was 300k ohms and R2 was 100k?",
				answers: [
					{ label: 'The gain, G, would be 0.3333' },
					{ label: 'The gain, G, would be 3' },
					{ label: 'The gain, G, would be 3*10^4' },
					{ label: 'The gain, G, would be -3' }
				]
			},
			{
				collection: "ENG1003",
				question: "How many different data types are there in JavaScript?",
				answers: [
					{ label: 'The gain, G, would be 0.3333' },
					{ label: 'The gain, G, would be 3' },
					{ label: 'The gain, G, would be 3*10^4' },
					{ label: 'The gain, G, would be -3' }
				]
			}
		];

		// Set first poll as active poll
		if ($scope.activePolls.length > 0) {
			$scope.selectedPoll = $scope.activePolls[0];
		}
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

		if ($scope.activePolls.length === 1) {
			$scope.selectedPoll = $scope.activePolls[0];
		}
	}

	// $scope.selectPoll = function (poll) {
	// 	console.log(poll)
	// 	$scope.selectedPoll = poll;
	// }

	$scope.nextPoll = function (event) {
		if ($scope.pollIndex > $scope.activePolls.length - 2) {
			$scope.pollIndex = 0;
		} else {
			$scope.pollIndex++;
		}
		$scope.selectedPoll = $scope.activePolls[$scope.pollIndex]
	}

	// $scope.submit = function () {
	// 	console.log("Sending answers...")
	// 	$scope.selectedPoll = null;
	// }

	$scope.submitAnswer = function () {
		console.log("sending answer");
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

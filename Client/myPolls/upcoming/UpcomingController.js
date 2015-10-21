app.controller('UpcomingController', function($scope, $state, resultsService) {

	$scope.markGroupAsFinished = function () {
		$scope.upcoming[0].done = true;
	}

	// temp for testing
	$scope.run = function (questionId) {
		resultsService.newSession(questionId);
		$state.go('myPolls.resultsPlugin_draw');
	}

	// TODO Create a service to pull this data

	$scope.upcoming = [
		{
			collection: "ENG1003",
			color: "blue",
			group: "Lecture 4",
			polls: [
				{
					question: "What are the 5 datatypes in JavaScript?",
					id: "123"
				},
				{
					question: "Is JavaScript a high or low level language?",
					id: "124"
				},
				{
					question: "When does a for-loop end?",
					id: "125"
				},
				{
					question: "What's the largest number I can store in a Number in JavaScript?",
					id: "126"
				}
			],
			done: false
		},
		{
			collection: "ECE2064",
			color: "green",
			group: "Lecture 3",
			polls: [
				{
					question: "Is there actually a unit called ECE2064?",
					id: "127"
				},
				{
					question: "I ask because it sounds familiar but I don't actually know?",
					id: "128"
				},
				{
					question: "Was the question before this even a question?",
					id: "129"
				}
			],
			done: false
		},
		{
			collection: "ECE5011",
			color: "red",
			group: "Lecture 3",
			polls: [
				{
					question: "What are the 5 datatypes in JavaScript?",
					id: "130"
				},
				{
					question: "Is JavaScript a high or low level language?",
					id: "131"
				},
				{
					question: "When does a for-loop end?",
					id: "132"
				},
				{
					question: "What's the largest number I can store in a Number in JavaScript?",
					id: "133"
				}
			],
			done: false
		}
	]

})

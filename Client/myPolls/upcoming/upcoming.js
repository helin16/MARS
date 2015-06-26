app.controller('UpcomingController', function($scope, $routeParams) {

	$scope.done = function () {
		$scope.upcoming[0].done = true;
	}

	// TODO Create a service to pull this data

	$scope.upcoming = [
		{
			collection: "ENG1003",
			group: "Lecture 4",
			polls: [
				{
					question: "What are the 5 datatypes in JavaScript?"
				},
				{
					question: "Is JavaScript a high or low level language?"
				},
				{
					question: "When does a for-loop end?"
				},
				{
					question: "What's the largest number I can store in a Number in JavaScript?"
				}
			],
			done: false
		},
		{
			collection: "ECE2064",
			group: "Lecture 3",
			polls: [
				{
					question: "Is there actually a unit called ECE2064?"
				},
				{
					question: "I ask because it sounds familiar but I don't actually know?"
				},
				{
					question: "Was the question before this even a question?"
				}
			],
			done: false
		},
		{
			collection: "ECE5011",
			group: "Lecture 3",
			polls: [
				{
					question: "What are the 5 datatypes in JavaScript?"
				},
				{
					question: "Is JavaScript a high or low level language?"
				},
				{
					question: "When does a for-loop end?"
				},
				{
					question: "What's the largest number I can store in a Number in JavaScript?"
				}
			],
			done: false
		}
	]

})
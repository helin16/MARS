app.controller('AnswerPollController', function($scope) {
	
	// TODO Request $routeParams.pollId poll;
	
    $scope.question = "Assuming an ideal inverting Op Amp, what would the gain be, if R1 was 300k ohms and R2 was 100k?";

    $scope.answers= [
		{ label: 'The gain, G, would be 0.3333', value: 1 },
		{ label: 'The gain, G, would be 3', value: 2 },
		{ label: 'The gain, G, would be 3*10^4', value: 3 },
		{ label: 'The gain, G, would be -3', value: 4 }
	];

	// TODO Add socket io service for posting live answers

	// TODO Add socket io service for re routing to the poll feed
	
})

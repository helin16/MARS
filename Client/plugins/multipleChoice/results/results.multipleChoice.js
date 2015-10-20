app.controller('MultipleChoiceResultsPluginController', [
	'$scope',
	'$mdDialog',
	'$interval',
	'resultsService',
	'd3Service',
	function(
	$scope, 
	$mdDialog,
	$interval,
	resultsService,
	d3Service
	) {

  // hard-code data
  $scope.scores = {};
  $scope.scores.scores = [
    {option: "A", score: 0},
    {option: "B", score: 0},
    {option: 'C', score: 0},
    {option: 'D', score: 0}
  ];

	// Holds the session answers for displaying
	var results = {};

	resultsService.onNewAnswerUpdate($scope, function(data) {
		var results = resultsService.getAnswers()

		for (var user in results) {
		  $scope.scores.scores[ results[user].data ].score++
		}
	})

	// $scope.pollCode = "QF177" 


	// // Simulate new votes
	// $interval(newVotes, 100);

	// function newVotes() {
	// 	$scope.results.forEach(function(x,i) {
	// 		x.votes += Math.floor(Math.random()*2 + ((i+2)%2))
	// 	});

	// 	var highest = 0;

	// 	$scope.results.forEach(function(x) {
	// 		if (x.votes > highest) highest = x.votes;
	// 	});

	// 	if (highest > 100) $scope.highestVotes = highest;
	// }


}])

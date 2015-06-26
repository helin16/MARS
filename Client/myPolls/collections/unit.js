app.controller('TeacherUnitController', function($scope, $routeParams) {
	$scope.name = "TeacherUnitController";
	$scope.params = $routeParams;
	
	$scope.units = [
		{title: "ENG1001", description: "yo"},
		{title: "ENG1002", description: "yo2"},
		{title: "ENG1003", description: "yo3"}
	]

	$scope.lectures = [
		{
			title: "Lecture 1",
			open: false,
			questions: [
				{
					text: "what is the biggest monkey you've ever seen?",
					answers: [
						{
							text: "100"
						}
					]
				},
				{
					text: "what is the biggest giraffe you've ever seen?",
					answers: [
						{
							text: "3000"
						}
					]
				},
			]
		},
		{title: "Lecture 2", description: "yo2"},
		{title: "Lecture 3", description: "yo2"},
		{title: "Lecture 4", description: "yo2"},
		{title: "Lecture 5", description: "yo2"},
		{title: "Lecture 6", description: "yo2"},
		{title: "Lecture 7", description: "yo2"},
		{title: "Lecture 8", description: "yo2"},
		{title: "Lecture 9", description: "yo2"},
		{title: "Lecture 10", description: "yo2"},
		{title: "Lecture 11", description: "yo2"},
		{title: "Lecture 12", description: "yo3"}
	]

	$scope.expand = function () {
		this.lecture.open = !this.lecture.open;
	};

})
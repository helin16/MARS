app.controller('EditCollectionController', function($scope, $routeParams, $mdSidenav, $mdDialog) {
	
	$mdSidenav('groups').open();

	$scope.groups = [
		{
			name: "Lecture 1",
			open: false,
			polls: [
				{
					question: "What are the 5 datatypes in JavaScript?",
					answers: [
						{
							text: "test answer 1"
						}
					]
				},
				{
					question: "Is JavaScript a high or low level language?",
					answers: [
						{
							text: "test answer 1"
						}
					]
				},
				{
					question: "When does a for-loop end?",
					answers: [
						{
							text: "test answer 1"
						}
					]
				}
			]
		},
		{
			name: "Lecture 2",
			open: false
		},
		{
			name: "Lecture 3",
			open: false
		},
		{
			name: "Lecture 4",
			open: false
		},
		{
			name: "Lecture 5",
			open: false
		},
		{
			name: "Lecture 6",
			open: false
		},
		{
			name: "Lecture 7",
			open: false
		},
		{
			name: "Lecture 8",
			open: false
		},
		{
			name: "Lecture 9",
			open: false
		},
		{
			name: "Lecture 10",
			open: false
		},
		{
			name: "Lecture 11",
			open: false
		},
		{
			name: "Lecture 12",
			open: false
		},
		{
			name: "Lecture 13",
			open: false
		},
	]

	$scope.openGroup = function () {
		this.group.open = !this.group.open;
	};

	$scope.alert = '';
	$scope.addCollaborators = function(ev) {
		$mdDialog.show({
      		controller: 'AddCollaboratorsController',
      		templateUrl: 'myPolls/collections/addCollaborators/addCollaborators.html',
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
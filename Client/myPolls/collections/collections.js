app.controller('CollectionsController', function($scope, $routeParams, $mdDialog) {

	$scope.collections = [
		{
			name: "ENG1003",
			id: "ENG1003",
			color: "blue",
			collaborators: ["nsherbur", "tgoh"],
			created: "12 July 2015"
		},
		{
			name: "ECE2064",
			id: "ECE2064",
			color: "green",
			collaborators: ["jonli", "mwan"],
			created: "1 June 2015"
		},
		{
			name: "ECE5011",
			id: "ECE5011",
			color: "red",
			collaborators: ["nsherbur"],
			created: "11 July 2015"
		}
	];

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
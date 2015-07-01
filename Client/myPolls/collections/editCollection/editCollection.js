app.controller('EditCollectionController', function($scope, $routeParams, $mdDialog) {


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
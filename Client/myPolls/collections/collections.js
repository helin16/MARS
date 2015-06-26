app.controller('CollectionsController', function($scope, $routeParams) {

	$scope.collections = [
		{
			name: "ENG1003",
			collaborators: ["nsherbur", "tgoh"],
			created: "12 July 2015"
		},
		{
			name: "ECE2064",
			collaborators: ["jonli", "mwan"],
			created: "1 June 2015"
		},
		{
			name: "ECE5011",
			collaborators: ["nsherbur"],
			created: "11 July 2015"
		}
	]
})
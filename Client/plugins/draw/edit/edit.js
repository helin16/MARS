app.controller('myCtrl', function($scope, $timeout) {
    
	// An example model - this will be loaded with the page
    $scope.example = {
    	name: "Ashan",
    	adjective: "cool"
    }

    // This simulates getting new data after 2sec
    $timeout(newData, 2000)

    function newData () {
    	// Update models here
    	$scope.example.adjective = "awesome"
    }

});
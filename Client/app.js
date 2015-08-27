var app = angular.module('melts', ['ngMaterial', 'ui.router']);

app.controller('MainController', function($scope, $mdSidenav) {

	$scope.openLeftMenu = function() {
		$mdSidenav('left').toggle();
		$mdSidenav('groups').close(); // TODO: Find a way to do this in editcollection ctrlr
	};

	$scope.navigateTo = function(url, event) {
		$location.path(url);
		$mdSidenav('left').close();
	};
})



.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

	$mdThemingProvider
		.theme('default')
			.primaryPalette('blue')
			.accentPalette('red')
			.backgroundPalette('grey', {
				'hue-1': '100'
			})

	$mdThemingProvider
		.theme('secondary')
			.backgroundPalette('blue')
			.dark();


	// Routing
	$urlRouterProvider.otherwise("/answer");

	$stateProvider
	.state('answer', {
	  url: "/answer",
	  templateUrl: "student/answer.html",
	  controller: "AnswerController"
	})
	.state('answer.poll', {
	  url: "/poll",
	  templateUrl: "student/answer.poll.html",
	  controller: "AnswerPollController"
	})
	// .state('state2', {
	//   url: "/state2",
	//   templateUrl: "partials/state2.html"
	// })
	// .state('state2.list', {
	//   url: "/list",
	//   templateUrl: "partials/state2.list.html",
	//   controller: function($scope) {
	//     $scope.things = ["A", "Set", "Of", "Things"];
	//   }
	// });


	// $routeProvider
	
	// // Default Root Route
	// .when('/', {
	// 	redirectTo: '/answer'
	// })

	// // Answer Routes
	// .when('/answer', {
	// 	templateUrl: 'answer/home/home.html',
	// 	controller: 'AnswerHomeController'
	// })
	// .when('/answer/:pollId', {
	// 	templateUrl: 'answer/poll/poll.html',
	// 	controller: 'AnswerPollController'
	// })

	// // My Polls Routes
	// .when('/myPolls', {
	// 	redirectTo: '/myPolls/upcoming'
	// })
	// .when('/myPolls/upcoming', {
	// 	templateUrl: 'myPolls/upcoming/upcoming.html',
	// 	controller: 'UpcomingController'
	// })
	// .when('/myPolls/livePoll/:pollId', {
	// 	templateUrl: 'myPolls/livePoll/livePoll.html',
	// 	controller: 'LivePollController'
	// })
	// .when('/myPolls/collections', {
	// 	templateUrl: 'myPolls/collections/collections.html',
	// 	controller: 'CollectionsController'
	// })
	// .when('/myPolls/collections/:collectionId', {
	// 	templateUrl: 'myPolls/collections/editCollection/editCollection.html',
	// 	controller: 'EditCollectionController'
	// })
	// .when('/myPolls/collections/:collectionId/questions/:questionId', {
	// 	templateUrl: 'myPolls/collections/editCollection/editQuestion/editQuestion.html',
	// 	controller: 'EditQuestionController'
	// })
	// .when('/myPolls/trash', {
	// 	templateUrl: 'myPolls/trash/trash.html',
	// 	controller: 'TrashController'
	// })
	// .when('/myPolls/settings', {
	// 	templateUrl: 'myPolls/settings/settings.html',
	// 	controller: 'SettingsController'
	// })
	// .when('/myPolls/support', {
	// 	templateUrl: 'myPolls/support/support.html',
	// 	controller: 'SupportController'
	// })

	// // Results Routes
	// .when('/results/:pollId', {
	// 	templateUrl: 'results/viewResults.html',
	// 	controller: 'PollResultsController'
	// })

 });
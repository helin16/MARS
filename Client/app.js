var app = angular.module('melts', ['ngMaterial', 'ui.router']);

app.controller('MainController', function($scope, $mdSidenav) {

	// $scope.openLeftMenu = function() {
	// 	$mdSidenav('left').toggle();
	// 	$mdSidenav('groups').close(); // TODO: Find a way to do this in editcollection ctrlr
	// };
	//
	// $scope.navigateTo = function(url, event) {
	// 	$location.path(url);
	// 	$mdSidenav('left').close();
	// };
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
	$urlRouterProvider.otherwise('/answer');

	$stateProvider
	.state('answer', {
	  url: '/answer',
	  templateUrl: 'student/answer.html',
	  controller: 'AnswerController'
	})
	.state('answer.subscribed', {
	  url: '/answer',
	  templateUrl: 'student/answer.html',
	  controller: 'AnswerController'
	});


	// TODO retrieve available plugins via AJAX
	var plugins = ['poll', 'draw', 'wordcloud'];	// This is a temporary array to fake this data


	// Generates a plugin's controller name based on it's plugin name
	controllerName = function(pluginName) {
	    return pluginName.charAt(0).toUpperCase() + pluginName.slice(1) + 'PluginController';
	}

	// Register 'answers', 'results' and 'settings' controllers and views for each plugin
	plugins.forEach(function(plugin) {
		$stateProvider
			.state('answer.plugin_' + plugin, {
			  templateUrl: 'plugins/' + plugin + '/answer/answer.' + plugin + '.html',
			  controller: controllerName(plugin)
			})
			.state('results.plugin_' + plugin, {
				templateUrl: 'plugins/' + plugin + '/results/results.' + plugin + '.html',
			  controller: controllerName(plugin)
			})
			.state('settings.plugin_' + plugin, {
				templateUrl: 'plugins/' + plugin + '/settings/settings.' + plugin + '.html',
			  controller: controllerName(plugin)
			})
	})


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

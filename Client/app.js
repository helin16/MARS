var app = angular.module('mars', ['ngMaterial', 'ui.router', 'btford.socket-io']);

app.controller('MainController', ['$scope', '$mdSidenav', function($scope, $mdSidenav) {

}])


// TODO: Move these factories to the services folder
.factory('responseSocket', ['socketFactory', function (socketFactory) {
  var responseIoSocket = io.connect('/response');

  var responseSocket = socketFactory({
    ioSocket: responseIoSocket
  });

  return responseSocket;
}])

.factory('editingSocket', ['socketFactory', function (socketFactory) {
  var editingIoSocket = io.connect('/editing');

  var editingSocket = socketFactory({
    ioSocket: editingIoSocket
  });

  return editingSocket;
}])


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
  .state('logout', {
    url: '/signIn',
    templateUrl: 'common/views/signIn.html',
    // controller: 'AccountController'
  })

  // Routing for responses
  $stateProvider
  .state('answer', {
    url: '/answer',
    templateUrl: 'student/answer.html',
    controller: 'AnswerController'
  })
  .state('answer.notSubscribed', {
    templateUrl: 'student/answer.notSubscribed.html'
  })
  .state('answer.subscribed', {
    templateUrl: 'student/answer.subscribed.html'
  });

  // Routing for myPolls
  $stateProvider
  .state('myPolls', {
    url: '/myPolls',
    templateUrl: 'myPolls/myPolls.html',
    controller: 'MyPollsController'
  })
  .state('myPolls.upcoming', {
    url: '/upcoming',
    templateUrl: 'myPolls/upcoming/upcoming.html',
    controller: 'UpcomingController'
  })
  .state('myPolls.collections', {
    url: '/collections',
    templateUrl: 'myPolls/collections/collections.html',
    controller: 'CollectionsController'
  })
  .state('myPolls.editCollection', {
    url: '/edit',
    templateUrl: 'myPolls/collections/editCollection/editCollection.html',
    controller: 'EditCollectionController'
  })
  .state('myPolls.trash', {
    url: '/trash',
    templateUrl: 'myPolls/trash/trash.html',
  })
  .state('myPolls.settings', {
    url: '/settings',
    templateUrl: 'myPolls/settings/settings.html'
  })
  .state('myPolls.support', {
    url: '/support',
    templateUrl: 'myPolls/support/support.html'
  });

  // TODO retrieve available plugins via AJAX
  var plugins = ['multipleChoice', 'draw', 'wordCloud'];	// This is a temporary array to fake this data

  // Generates a plugin's controller name based on it's plugin name
  controllerName = function(pluginName) {
    var firstLetter = pluginName.charAt(0).toUpperCase();
    return firstLetter + pluginName.slice(1) + 'PluginController';
  }

  // Register 'answers', 'results' and 'settings' controllers and views for each plugin
  plugins.forEach(function(plugin) {
    $stateProvider
    .state('answer.answerPlugin_' + plugin, {
      templateUrl: 'plugins/' + plugin + '/answer/answer.' + plugin + '.html',
      controller: controllerName(plugin + 'Answer')
    })
    .state('myPolls.resultsPlugin_' + plugin, {
      url: '/results',
      templateUrl: 'plugins/' + plugin + '/results/results.' + plugin + '.html',
      controller: controllerName(plugin + 'Results')
    })
    .state('myPolls.settingsPlugin_' + plugin, {
      templateUrl: 'plugins/' + plugin + '/settings/settings.' + plugin + '.html',
      controller: controllerName(plugin + 'Settings')
    })
  })

});

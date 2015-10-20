var app = angular.module('melts', ['ngMaterial', 'ui.router', 'btford.socket-io']);

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

.factory('questionManager', ['$rootScope', '$timeout', 'responseSocket', function ($rootScope, $timeout, responseSocket) {

  // get subscriptions for student

  // make object/array for current active sessions
  // - holds current question state (the question the user is attempting right now)
  // - allows toggle of current question
  // - holds data (answers and info) for each question

  // set up socket listener for new sessions - feed to aformentioned obj/arr

  // set up socket listener for disappearing sessions - keep aformentioned obj/arr updated

  // check for currently active sessions

  // get questions for active sessions - feed to aformentioned obj/arr

  // listen for answer submissions from the user

  // provides a way for answer controller to know if user has subscribed to something



  // NOTE: Upon recieving new questions,
  // check if activeQuesitons length === 1 and if so, set it as selectedQuestion
  // otherwise just add it to activeQuestions
  var activeQuestions = [];
  var pollIndex = 0;
  var questionManager = {};

  questionManager.subscribed = false;
  questionManager.selectedQuestion = null;

  // Allows controllers to subscribe to updates to do with activeQuestions array
  questionManager.subscribeQuestionList = function(scope, callback) {
    var handler = $rootScope.$on('activeQuestionsUpdate', callback);
    scope.$on('$destroy', handler); // destroys the listener above
  }

  // Used to notify controllers that the question list has changed
  function emitQuestionListChange () {
    $rootScope.$emit('activeQuestionsUpdate');
  }

  questionManager.submitAnswer = function (pluginData) {
    var answer = {
      id: questionManager.selectedQuestion.id,
      // userId will be filled in on server
      data: pluginData
    }
    responseSocket.emit('new answer', answer)
  }

  // Upon new questions being opened by a lecturer
  // responseSocket.on('new question', function(data){
  function responseSocketOnNewQuestion (data) {// this is temp for testing - use line above in production
    // push question data onto activeQuestions array
    activeQuestions.push(data)

    // if there is only 1 question in activeQuestions array, automatically make it the selectedQuestion
    if (activeQuestions.length === 1) {
      questionManager.selectedQuestion = activeQuestions[0];
    }

    emitQuestionListChange();
  }
  // );



  // function subscribedChange () {
  //   questionManager.subscribed = !questionManager.subscribed
  //   console.log(questionManager.subscribed)
  // }
  // $timeout(subscribedChange, 1000);

  // Simulate retrieving active polls
  $timeout(activeQuestionsRecieved, 1000);

  // Simulate recieving a new poll
  $timeout(newPoll, 30000, true, 0);
  $timeout(newPoll, 20000, true, 1);
  $timeout(newPoll, 10000, true, 2);

  function activeQuestionsRecieved() {
    // var data = {
    //   id: "1928he98eh219e21e9",
    //   pluginType: "multipleChoice",
    //   collection: "ENG1001",
    //   question: "What is this subject? An ideal inverting Op Amp?",
    //   answers: [
    //   { id: 0, label: 'The gain, G, would be 0.3333' },
    //   { id: 1, label: 'The gain, G, would be 3' },
    //   { id: 2, label: 'The gain, G, would be 3*10^4' },
    //   { id: 3, label: 'The gain, G, would be -3' }
    //   ]
    // }

    var data  = {
      id: "1928he98eh219e21e9",
      pluginType: "draw",
      collection: "ENG1001",
      question: "Circle the circle."

    }
    responseSocketOnNewQuestion(data);
  }

  function newPoll (i) {
    var polls = [
    {
      id: "1928he98eh219e2112",
      pluginType: "multipleChoice",
      collection: "ENG1004",
      question: "A new unit full of potential?",
      answers: [
      { id: 3, label: 'The gain, G, would be -3' },
      { id: 2, label: 'The gain, G, would be 3*10^4' },
      { id: 1, label: 'The gain, G, would be 3' },
      { id: 0, label: 'The gain, G, would be 0.3333' },
      ]
    },
    {
      id: "1928he98eh219e2110",
      pluginType: "multipleChoice",
      collection: "ENG1002",
      question: "Assuming an ideal inverting Op Amp, what would the gain be, if R1 was 300k ohms and R2 was 100k?",
      answers: [
      { id: 2, label: 'The gain, G, would be 3*10^4' },
      { id: 0, label: 'The gain, G, would be 0.3333' },
      { id: 3, label: 'The gain, G, would be -3' },
      { id: 1, label: 'The gain, G, would be 3' },
      ]
    },
    {
      id: "1928he98eh219e2111",
      pluginType: "multipleChoice",
      collection: "ENG1003",
      question: "How many different data types are there in JavaScript?",
      answers: [
      { id: 0, label: 'The gain, G, would be 0.3333' },
      { id: 3, label: 'The gain, G, would be -3' },
      { id: 1, label: 'The gain, G, would be 3' },
      { id: 2, label: 'The gain, G, would be 3*10^4' },
      ]
    }
    ]
    responseSocketOnNewQuestion(polls[i]);
  }

  // function nextQuestion () {
  //   return 'answer.plugin_' + $scope.selectedQuestion.pluginType
  // }

  return questionManager;
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
  .state('answer.notsubscribed', {
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

});

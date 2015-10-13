app.factory('resultsService', [
  '$rootScope',
  '$timeout',
  '$interval',
  'responseSocket',
  function (
    $rootScope,
    $timeout,
    $interval,
    responseSocket
  ) {

  // On the server
  // TODO ...
  
  // This factory
  // TODO Manage question sessions (clear answers on new sessions)
  // TODO ...

  // Question manager object returned by this factory
  var resultsService = {};

  // List of all answers submitted in a session
  var answers = []

  // Begin a new question session (ie open a question for answers)
  resultsService.newSession = function () {
    console.log('new session started')
    responseSocket.emit('new session')
    answers = []; // reset answers array
  }

  // Allows result plugin controllers to start listening for new answers
  resultsService.onNewAnswerUpdate = function(scope, callback) {
    var handler = $rootScope.$on('newAnswerUpdate', callback);
    scope.$on('$destroy', handler); // deregisters the listener above
  }

  // Allows result plugin controllers to get answer data for a question
  resultsService.getAnswers = function () {
    return answers.slice();
  }

  // Upon new answers arriving, emit updates to listening controllers
  responseSocket.on('new answer', function(data){
  // function responseSocketOnNewAnswer (data) {// this is temp for testing - use line above in production
    answers.push(data);
    console.log("got new one")
    $rootScope.$emit('newAnswerUpdate');
  }
  );

  // end of factory
  // return resultsService;

  // code below is for simulation only












  // // Simulate recieving new answers
  // for (var i = 0; i < 100; i++) {
  //   $timeout(newAnswer, 20000*Math.random() );    
  // }

  // function newAnswer (i) {
  //   var answers = [
  //     { answer: 'A'},
  //     { answer: 'B'},
  //     { answer: 'C'}
  //   ]
  //   var index = Math.floor(Math.random()*3)
  //   responseSocketOnNewAnswer(answers[index]);
  // }

  return resultsService;

}])
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
  // TODO set up a session close socket listener
  
  // This factory
  // TODO Manage question sessions (clear answers on new sessions)
  // TODO set up a session close socket emitter

  // Question manager object returned by this factory
  var resultsService = {};

  // List of all answers submitted in a session
  var answers = [];

  // The id of the question that is being viewed
  var qId = null;

  // Begin a new question session (ie open a question for answers)
  resultsService.newSession = function (questionId) {
    console.log('new session started: ' + questionId)
    qId = questionId;
    responseSocket.emit('start session', questionId)
    answers = []; // reset answers array
  };

  // Allows result plugin controllers to start listening for new answers
  resultsService.onNewAnswerUpdate = function(scope, callback) {
    var handler = $rootScope.$on('newAnswerUpdate', callback);
    scope.$on('$destroy', handler); // deregisters the listener above
  };

  // Allows result plugin controllers to get a copy of answer data
  resultsService.getAnswers = function () {
    return answers.slice();
  };

  // End a question session (ie close question to prevent more answers)
  function endSession () {
    console.log('session ended: ' + qId)
    responseSocket.emit('end session', qId)
  };

  // Upon new answers arriving, emit updates to listening controllers
  responseSocket.on('new answer', function(data){
    answers.push(data);
    $rootScope.$emit('newAnswerUpdate');
  });

  // If state is giong from question session state to non-question session
  // state, trigger the endSession method.
  $rootScope.$on('$stateChangeStart', function(e, toS, toP, fromS, fromP){
    console.log('from: ' + JSON.stringify(fromS));
    console.log('to: ' + JSON.stringify(toS));
    if (fromS.url === '/results')
      endSession(  )
  });

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
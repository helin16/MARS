app.factory('questionManager', [
  '$rootScope',
  '$timeout',
  'responseSocket',
  function (
    $rootScope,
    $timeout,
    responseSocket
  ) {

  // SERVER
  // TODO: set up socket listener for disappearing sessions (on 'session closed')
  // TODO: API for getting users active quesions from db
  // TODO: API for getting users subscriptions
  // TODO: API for getting user's previous answer

  // HERE
  // TODO: add method to let controllers http req subscriptions for student 
  // TODO: http req for currently active questions from db
  // TOFU: add method to let plugin controllers fetch their previous answers from server

  // Question manager object returned by this factory
  var questionManager = {};

  // Array for questions being asked at this moment by a lecturer
  var activeQuestions = [];
  
  // Index in activeQuestions of question the user is attempting at this moment
  var qIndex = 0;

  // Is the user subscribed to one or more collections?
  var subscribed = true; // a http call will need to be made in order to retrieve this
  
  // The question that the user is currently attempting
  var selectedQuestion = null;

  // Allows controllers to listen for updates to do with activeQuestions array
  questionManager.onQuestionListUpdate = function(scope, callback) {
    var handler = $rootScope.$on('activeQuestionsUpdate', callback);
    scope.$on('$destroy', handler); // deregisters the listener above
  } // adapted from http://www.codelord.net/2015/05/04/   ...
    // angularjs-notifying-about-changes-from-services-to-controllers/

  // Allows controllers to listen for when the selectedQuestion changes
  questionManager.onSelectedQuestionUpdate = function(scope, callback) {
    var handler = $rootScope.$on('selectedQuestionUpdate', callback);
    scope.$on('$destroy', handler); // deregisters the listener above
  }

  // Wraps plugin data and sends to server over socket io
  questionManager.submitAnswer = function (pluginData) {
    var answer = {
      questionId: selectedQuestion.id,
      // note: userId will be filled in on server
      data: pluginData
    }
    console.log(answer)
    responseSocket.emit('new answer', answer);
  }

  // Increment qIndex (move to next question)
  questionManager.nextQuestion = function () {
    if (activeQuestions.length > 0) {
      if (qIndex > activeQuestions.length-2) qIndex = 0;
      else qIndex++;
      setSelectedQuestion( activeQuestions[qIndex] );
    }
  }

  // Allows controllers to check if user is subscribed to a collection
  questionManager.userIsSubscribed = function () {
    return subscribed;
  }

  // Allows controllers to check there is more than one active question
  questionManager.multipleQuestions = function () {
    return activeQuestions.length > 1;
  }

  // Allows controllers to get their own instance of the selected question
  questionManager.getSelectedQuestion = function () {
    return selectedQuestion;
  }

  // Called to notify listening controllers that the question list has changed
  function emitQuestionListUpdate () {
    $rootScope.$emit('activeQuestionsUpdate');
  }

  // Called to notify listening controllers that the selected question changed
  function emitSelectedQuestionUpdate () {
    $rootScope.$emit('selectedQuestionUpdate');
  }

  // Sets the selected question and handles leaving/joining of question rooms
  // and alerting controllers listening for selectedQuestion updates
  function setSelectedQuestion (question) {
    // set the selected question in this factory
    selectedQuestion = question;

    // alert listening controllers of the selection
    emitSelectedQuestionUpdate();
  }

  // Upon new questions being opened by a lecturer, add question to 
  // activeQuestions array and emit updates to listening controllers
  responseSocket.on('new session', function(data){
    // push question data onto activeQuestions array
    activeQuestions.push(data)
    console.log('new session received: ', data)
    // if there is only 1 question in activeQuestions array, automatically make
    // it the selectedQuestion
    if (activeQuestions.length === 1) {
      setSelectedQuestion( activeQuestions[0] );
      emitSelectedQuestionUpdate();
    }
    emitQuestionListUpdate();
  });

  // Upon questions being closed by a lecturer, removed question from 
  // activeQuestions array and emit updates to listening controllers
  responseSocket.on('session closed', function(questionId){
    console.log('session closed: ', questionId)
    // find question in activeQuestions array and splice question out of array
    activeQuestions.some(function (question,i,arr) {
      if (question.id === questionId) {
        arr.splice(i,1);
        return true;
      }
    })
    // let plugin answer and answer controllers know 
    emitQuestionListUpdate();

    // If question being removed is selectedQuestion, update selectedQuestion
    if (selectedQuestion.id === questionId) {
      selectedQuestion = null;
      emitSelectedQuestionUpdate();
    }
  });

  // end of factory
  return questionManager;
  // code below is for simulation only







  // // Simulate retrieving active polls
  // $timeout(activeQuestionsRecieved, 1000);

  // // Simulate recieving a new poll
  // $timeout(newPoll, 3000, true, 0);
  // $timeout(newPoll, 2000, true, 1);
  // $timeout(newPoll, 4000, true, 2);

  // function activeQuestionsRecieved() {
  //   var data = {
  //     id: "1928he98eh219e21e9",
  //     pluginType: "wordCloud",
  //     collection: "ENG1001",
  //     question: "What is this subject? An ideal inverting Op Amp?",
  //     answers: [
  //     { id: 0, label: 'The gain, G, would be 0.3333' },
  //     { id: 1, label: 'The gain, G, would be 3' },
  //     { id: 2, label: 'The gain, G, would be 3*10^4' },
  //     { id: 3, label: 'The gain, G, would be -3' }
  //     ]
  //   } 
  //   responseSocketOnNewQuestion(data);
  // }

  // function newPoll (i) {
  //   var polls = [
  //   {
  //     id: "1928he98eh219e2112",
  //     pluginType: "multipleChoice",
  //     collection: "ENG1004",
  //     question: "A new unit full of potential?",
  //     answers: [
  //     { id: 3, label: 'The gain, G, would be -3' },
  //     { id: 2, label: 'The gain, G, would be 3*10^4' },
  //     { id: 1, label: 'The gain, G, would be 3' },
  //     { id: 0, label: 'The gain, G, would be 0.3333' },
  //     ]
  //   },
  //   {
  //     id: "1928he98eh219e2110",
  //     pluginType: "multipleChoice",
  //     collection: "ENG1002",
  //     question: "Assuming an ideal inverting Op Amp, what would the gain be, if R1 was 300k ohms and R2 was 100k?",
  //     answers: [
  //     { id: 2, label: 'The gain, G, would be 3*10^4' },
  //     { id: 0, label: 'The gain, G, would be 0.3333' },
  //     { id: 3, label: 'The gain, G, would be -3' },
  //     { id: 1, label: 'The gain, G, would be 3' },
  //     ]
  //   },
  //   {
  //     id: "1928he98eh219e2111",
  //     pluginType: "multipleChoice",
  //     collection: "ENG1003",
  //     question: "How many different data types are there in JavaScript?",
  //     answers: [
  //     { id: 0, label: 'The gain, G, would be 0.3333' },
  //     { id: 3, label: 'The gain, G, would be -3' },
  //     { id: 1, label: 'The gain, G, would be 3' },
  //     { id: 2, label: 'The gain, G, would be 3*10^4' },
  //     ]
  //   }
  //   ]
  //   responseSocketOnNewQuestion(polls[i]);
  //   console.log(activeQuestions)
  // }

  // return questionManager;
}])
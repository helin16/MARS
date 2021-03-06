app.controller('AnswerController', function(
  $scope,
  $mdDialog,
  $timeout,
  $state,
  questionManager
  ) {

  // Should the next question button be displayed
  $scope.multipleQuestions = false;

  // Check if intro screen should be displayed (ie if user has subscribed to a collection)
  if (questionManager.userIsSubscribed()) {
    $state.go('answer.subscribed');
  } else {
    $state.go('answer.notSubscribed');
  }

  // Notify this controller of new questions / questions ending
  questionManager.onQuestionListUpdate($scope, function () { 
    // Hide or show the multiple questions button
    $scope.multipleQuestions = questionManager.multipleQuestions()
  })

  questionManager.onSelectedQuestionUpdate($scope, function () {
    if (questionManager.getSelectedQuestion() !== null) {
      // Set the app state to answer.answerPlugin_<pluginType> (ie answer.plugin_wordCloud)
      $state.go('answer.answerPlugin_' + questionManager.getSelectedQuestion().pluginType);
    } else {
      $state.go('answer.subscribed');
    }
  })

  $scope.logout = function(){
    $state.go('logout');
  }

  // Iterate through questions in questionManager's activeQuestions array
  $scope.nextPoll = function () {
    questionManager.nextQuestion();
    $state.go('answer.answerPlugin_' + questionManager.getSelectedQuestion().pluginType);
  }

  $scope.joinMessage = '';
  $scope.showJoinDialog = function(ev) {
    $mdDialog.show({
      controller: 'JoinFeedController',
      templateUrl: 'student/answer.join.html',
      parent: angular.element(document.body),
      targetEvent: ev
    })
    .then(
      function(answer) {
        $scope.joinMessage = 'You said the information was "' + answer + '".';
      },
      function() {
        $scope.joinMessage = 'You cancelled the dialog.';
      }
    );
  };

})

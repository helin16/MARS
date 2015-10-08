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
  questionManager.onQuestionListUpdate($scope, function() { 
    // Set the app state to answer.plugin_<pluginType> (ie answer.plugin_wordCloud)
    $scope.multipleQuestions = questionManager.multipleQuestions()
    $state.go('answer.plugin_' + questionManager.getSelectedQuestion().pluginType)
  })

  $scope.logout = function(){
    $state.go('logout');
  }

  // Iterate through questions in questionManager's activeQuestions array
  $scope.nextPoll = function () {
    questionManager.nextQuestion();
    $state.go('answer.plugin_' + questionManager.getSelectedQuestion().pluginType);
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

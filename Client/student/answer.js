app.controller('AnswerController', function(
  $scope,
  $mdDialog,
  $timeout,
  $state,
  questionManager
  ) {

  // // TODO Add service to notify this controller of new questions / questions ending
  questionManager.subscribeQuestionList($scope, function() { 
    // Set the app state to answer.plugin_<pluginType>
    $state.go('answer.plugin_' + questionManager.selectedQuestion.pluginType)
  })

  $scope.logout = function(){
    $state.go('logout');
  }

  if (questionManager.subscribed) {
    $state.go('answer.subscribed');
  } else {
    $state.go('answer.notsubscribed');
  }

  $scope.nextPoll = function (event) {
    // iterate through questions on questionManager which will return state/view
    // var questionType
    $state.go(questionType)
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

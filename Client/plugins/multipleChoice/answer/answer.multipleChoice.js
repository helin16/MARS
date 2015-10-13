app.controller('MultipleChoiceAnswerPluginController', function (
  $scope,
  questionManager
  ){

  $scope.selectedPoll = questionManager.getSelectedQuestion();

  questionManager.onSelectedQuestionUpdate($scope, function () {
    $scope.selectedPoll = questionManager.getSelectedQuestion()
    console.log($scope.selectedPoll)
  })

  // socketio example
  $scope.submit = function(jsonData) { //this can be called on button click etc
    console.log('Sending data to server via socket');
    questionManager.submitAnswer(jsonData);
  }
  // note: if, in the future, we create plugins that need streams of data rather than single submissions 
  // we will add a funciton to the socket to handle this - do not use this submit function for streams.

})
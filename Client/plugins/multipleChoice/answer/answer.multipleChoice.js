app.controller('MultipleChoicePluginController', function (
  $scope,
  questionManager
  ){

  // TODO Add socket io service for posting live answers


  // TODO Add socket io service for re routing to the poll feed
  $scope.selectedPoll = questionManager.selectedQuestion

  // socketio example
  $scope.submit = function(jsonData) { //this can be called on button click etc
    console.log('Sending data to server via socket');
    responseSocket.submit(jsonData);
  }

  // note: if, in the future, we create plugins that need streams of data rather than single submissions 
  // we will add a funciton to the socket to handle this - do not use this submit function for streams.
})



app.controller('AnswerController', function(
  $scope,
  $mdDialog,
  $timeout,
  $state,
  questionResponseSocket
  ) {

  // TODO Add service to notify this controller of new questions
  // NOTE: Upon recieving new questions, 
  // check if activeQuesitons length === 1 and if so, set it as selectedPoll
  // otherwise just add it to activePolls

  // TODO Add service to notify this controller of questions ending




  // socketio demo
  $scope.socketMe = function() {
    console.log('answer')
    questionResponseSocket.emit('answer', {
      questionId: "09328n0nd9f0jdfxcvf",
      responseData: "{blah:'blah',hey:'hey'}"})
  }

  $scope.logout = function(){
    $state.go('logout');
  }

  // Front page (holds all active polls from subscribed collections)
  $scope.subscribed = true;
  $scope.activePolls = [];
  $scope.selectedPoll = null;
  $scope.pollIndex = 0;

  // Simulate retrieving active polls
  $timeout(activePollsRecieved, 1000);

  // Simulate recieving a new poll
  $timeout(newPoll, 30000, true, 0);
  $timeout(newPoll, 20000, true, 1);
  $timeout(newPoll, 10000, true, 2);

  if ($scope.subscribed) {
    $state.go('answer.subscribed');
  } else {
    $state.go('answer.notsubscribed');
  }

  function activePollsRecieved() {
    $scope.activePolls = [
    {
      id: "1928he98eh219e21e9",
      pluginType: "poll",
      collection: "ENG1001",
      question: "What is this subject? An ideal inverting Op Amp?",
      answers: [
      { id: 0, label: 'The gain, G, would be 0.3333' },
      { id: 1, label: 'The gain, G, would be 3' },
      { id: 2, label: 'The gain, G, would be 3*10^4' },
      { id: 3, label: 'The gain, G, would be -3' }
      ]
    },
    ];

  // Set first poll as active poll
  if ($scope.activePolls.length > 0) {
    $scope.selectedPoll = $scope.activePolls[0];
    // Set the app state to answer.<pluginType>
    $state.go('answer.plugin_' + $scope.selectedPoll.pluginType)
    }
  }

  function newPoll (i) {
    var polls = [
    {
      id: "1928he98eh219e2112",
      pluginType: "poll",
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
      pluginType: "poll",
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
      pluginType: "poll",
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

    $scope.activePolls.push(polls[i])
    console.log($scope.activePolls)
    if ($scope.activePolls.length === 1) {
      $scope.selectedPoll = $scope.activePolls[0];
    }
  }

  // $scope.selectPoll = function (poll) {
  // 	console.log(poll)
  // 	$scope.selectedPoll = poll;
  // }

  $scope.nextPoll = function (event) {
    if ($scope.pollIndex > $scope.activePolls.length - 2) {
      $scope.pollIndex = 0;
    } else {
      $scope.pollIndex++;
    }
    $scope.selectedPoll = $scope.activePolls[$scope.pollIndex]
    $state.go('answer.plugin_' + $scope.selectedPoll.pluginType)
  }

  // $scope.submit = function () {
  // 	console.log("Sending answers...")
  // 	$scope.selectedPoll = null;
  // }

  $scope.submitAnswer = function () {
    console.log("sending answer");
  // send poll id and answer through socket io
  }

  $scope.alert = '';
  $scope.showAlert = function(ev) {
    $mdDialog.show({
      controller: 'JoinFeedController',
      templateUrl: 'student/answer.join.html',
      parent: angular.element(document.body),
      targetEvent: ev
    })
    .then(
      function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      },
      function() {
        $scope.alert = 'You cancelled the dialog.';
      }
      );
  };
})

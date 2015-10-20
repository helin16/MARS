var currentIndex;

app.controller('DrawResultsPluginController', function($scope, questionManager) {

	// An example model - this will be loaded with the page
    $scope.example = {
      image: "../sample.jpg"
    }

    $scope.submissionList = getLocalStorageKeys();

    function clearImage(key)
    {
      var drawingLayer = document.getElementById(key);
      var backImage = document.getElementById("back-image");
      var drawingContext = drawingLayer.getContext("2d");

      drawingContext.clearRect(0,0, drawingLayer.width, drawingLayer.height);
      drawingContext.drawImage(backImage,0,0, drawingLayer.width, (480*drawingLayer.width/800));
    }

    $scope.drawSubmission = function(key)
    {
      var drawingLayer = document.getElementById(key);
      var drawingContext = drawingLayer.getContext("2d");

      clearImage(key);

      var submission = JSON.parse(localStorage.getItem(key));

      for (var i=0; i < submission.strokes.length; i++)
      {
        drawingContext.beginPath();
        drawingContext.moveTo(submission.strokes[i][0].X, submission.strokes[i][0].Y);

        for (var j=0; j < submission.strokes[i].length; j++)
        {
          drawingContext.lineTo(submission.strokes[i][j].X, submission.strokes[i][j].Y);
        }

        drawingContext.lineWidth = 4;
        drawingContext.stroke();
      }
    }

    function getLocalStorageKeys()
    {
      var array = [];

      for(var i=0; i < localStorage.length; i++)
      {
        array.push(localStorage.key(i));
      }

       return array;
    }

    window.onload = function()
    {

      for (var i=0; i < localStorage.length; i++)
        $scope.drawSubmission(localStorage.key(i));

    };

});

var isFullScreen = false;

fullScreen = function(element)
{

  if(!isFullScreen) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      return;
    }
    isFullScreen = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else {
      return;
    }
    isFullScreen = false;
  }
}

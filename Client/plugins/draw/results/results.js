var currentIndex;

app.controller('myCtrl', function($scope, $timeout) {

	// An example model - this will be loaded with the page
    $scope.example = {
      image: "../sample.jpg"
    }
});

function nextSubmission()
{
  if(++currentIndex > (localStorage.length - 1))
  {
    currentIndex = localStorage.length - 1;
    return;
  }

  drawSubmission(currentIndex);
}

function prevSubmission()
{
  if(--currentIndex < 0)
  {
    currentIndex = 0;
    return;
  }

  drawSubmission(currentIndex);
}

function clearImage()
{
  var drawingLayer = document.getElementById("drawing-layer");
  var backImage = document.getElementById("back-image");
  var drawingContext = drawingLayer.getContext("2d");

  drawingContext.clearRect(0,0, drawingLayer.width, drawingLayer.height);
  drawingContext.drawImage(backImage,0,0, drawingLayer.width, (480*drawingLayer.width/800));
}

function drawSubmission(index)
{
  var drawingLayer = document.getElementById("drawing-layer");
  var drawingContext = drawingLayer.getContext("2d");

  clearImage();

  var key = localStorage.key(index);
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

window.onload = function()
{
  clearImage();
  drawSubmission(0);
  currentIndex = 0;
};

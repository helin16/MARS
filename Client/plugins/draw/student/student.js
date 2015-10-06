
var savedDraws = {
  strokes: []
};

var isDragging = false;

app.controller('myCtrl', function($scope, $timeout) {

	// An example model - this will be loaded with the page
    $scope.example = {
      image: "../sample.jpg"
    }

});


function startCanvasEvents() {
  var drawingLayer = document.getElementById("drawing-layer");

  drawingLayer.addEventListener("touchstart", startStroke, false);
  drawingLayer.addEventListener("touchend", handleTouchMove, false);
  drawingLayer.addEventListener("touchleave", handleTouchMove, false);
  drawingLayer.addEventListener("touchmove", handleTouchMove, false);
  drawingLayer.addEventListener("mousedown", handleMouseDown, false);
  drawingLayer.addEventListener("mouseup", handleMouseUpOut, false);
  drawingLayer.addEventListener("mouseout", handleMouseUpOut, false);
  drawingLayer.addEventListener("mousemove", handleMouseMove, false);
}

function handleTouchStart(event) {
  var drawingLayer = document.getElementById("drawing-layer");

  event.preventDefault();
  var touches = event.changedTouches;

  for(var i=0; i < touches.length; i++) {
    if(touches[i].identifier != 0) continue;
    var newObject = {X: 800/drawingLayer.clientWidth*(touches[i].pageX-drawingLayer.offsetLeft), Y: 480/drawingLayer.clientHeight*(touches[i].pageY-drawingLayer.offsetTop)};
    startStroke(newObject);
    return;
  }
}

function handleMouseDown(event) {
  var drawingLayer = document.getElementById("drawing-layer");

  isDragging = true;
  if(!("pageX" in event)) {
    event.pageX = event.clientX;
    event.pageY = event.clientY;
  }
  var newObject = {X: 800/drawingLayer.clientWidth*(event.pageX-drawingLayer.offsetLeft), Y: 480/drawingLayer.clientHeight*(event.pageY-drawingLayer.offsetTop)};
  startStroke(newObject);
}

function handleMouseUpOut(event) {
  isDragging = false;
}

function startStroke(event) {
  var drawingLayer = document.getElementById("drawing-layer");
  var drawingContext = drawingLayer.getContext("2d");

  var fixedX = event.X;
  var fixedY = event.Y;

  var newObject = {X: fixedX, Y: fixedY};

  savedDraws.strokes.push(new Array());
  savedDraws.strokes[savedDraws.strokes.length-1].push(copyTouch(newObject));
  return;
}

function handleMouseMove(event) {
  var drawingLayer = document.getElementById("drawing-layer");

  if(!("pageX" in event)) {
    event.pageX = event.clientX;
    event.pageY = event.clientY;
  }

  if(isDragging) {
    var newObject = {X: 800/drawingLayer.clientWidth*(event.pageX-drawingLayer.offsetLeft), Y: 480/drawingLayer.clientHeight*(event.pageY-drawingLayer.offsetTop)};
    continueStroke(newObject);
  }
}

function handleTouchMove(event) {
  var drawingLayer = document.getElementById("drawing-layer");

  event.preventDefault();
  var touches = event.changedTouches;

  for(var i=0; i < touches.length; i++) {
    if(touches[i].identifier != 0) continue;

    var newObject = {X: 800/drawingLayer.clientWidth*(touches[i].pageX-drawingLayer.offsetLeft), Y: 480/drawingLayer.clientHeight*(touches[i].pageY-drawingLayer.offsetTop)};
    continueStroke(newObject);
    return;
  }
}

function continueStroke(event) {
  var drawingLayer = document.getElementById("drawing-layer");
  var drawingContext = drawingLayer.getContext("2d");
  var ongoingTouches = savedDraws.strokes[savedDraws.strokes.length-1];

  var fixedX = event.X;
  var fixedY = event.Y;

  var newObject = {X: fixedX, Y: fixedY};

  drawingContext.beginPath();
  drawingContext.moveTo(ongoingTouches[ongoingTouches.length-1].X, ongoingTouches[ongoingTouches.length-1].Y);
  drawingContext.lineTo(fixedX, fixedY);
  drawingContext.lineWidth = 4;
  drawingContext.stroke();
  ongoingTouches.push(copyTouch(newObject));
  return;
}

function copyTouch(event) {
  return {X: event.X, Y: event.Y};
}

// function ongoingTouchesIndexById(idToFind) {
//   for(var i=0; i < ongoingTouches.length; i++) {
//     var id = ongoingTouches[i].identifier;
//
//     if (id == idToFind) {
//       return i;
//     }
//   }
//   return -1;
// }

window.onload = function() {
  var drawingLayer = document.getElementById("drawing-layer");
  var backImage = document.getElementById("back-image");
  var drawingContext = drawingLayer.getContext("2d");

  drawingContext.drawImage(backImage,0,0, drawingLayer.width, (480*drawingLayer.width/800));
  startCanvasEvents();
}

function printConsoleData() {
  var date = new Date();

  localStorage.setItem("submission"+date.valueOf(), JSON.stringify(savedDraws));

  console.log(savedDraws);
}

function undoFunction() {
  var drawingLayer = document.getElementById("drawing-layer");
  var backImage = document.getElementById("back-image");
  var drawingContext = drawingLayer.getContext("2d");

  savedDraws.strokes.pop();

  drawingContext.clearRect(0,0, drawingLayer.width, drawingLayer.height);
  drawingContext.drawImage(backImage,0,0, drawingLayer.width, (480*drawingLayer.width/800));


  for (var i=0; i < savedDraws.strokes.length; i++) {
    drawingContext.beginPath();
    drawingContext.moveTo(savedDraws.strokes[i][0].X, savedDraws.strokes[i][0].Y);
    for (var j=1; j < savedDraws.strokes[i].length; j++) {
      drawingContext.lineTo(savedDraws.strokes[i][j].X, savedDraws.strokes[i][j].Y);
    }
    drawingContext.lineWidth = 4;
    drawingContext.stroke();
  }
}

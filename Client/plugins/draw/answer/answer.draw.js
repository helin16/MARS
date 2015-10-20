

app.controller('DrawPluginController', function($scope, questionManager) {

	// An example model - this will be loaded with the page
    $scope.example = {
      image: "https://raw.githubusercontent.com/SLC3/MARS-Annotate/master/sample.jpg"
    }

    $scope.selectedPoll = questionManager.selectedQuestion;


    var savedDraws = {
      strokes: []
    };

    var isDragging = false;
    var current_identifier = null;

    function startCanvasEvents() {
      var drawingLayer = document.getElementById("drawing-layer");

      drawingLayer.addEventListener("touchstart", handleTouchStart, false);
      drawingLayer.addEventListener("touchend", handleTouchEnd, false);
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
        if(current_identifier == null)
          current_identifier = touches[i].identifier;
        if(touches[i].identifier != current_identifier) continue;
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
        if(touches[i].identifier != current_identifier) continue;

        var newObject = {X: 800/drawingLayer.clientWidth*(touches[i].pageX-drawingLayer.offsetLeft), Y: 480/drawingLayer.clientHeight*(touches[i].pageY-drawingLayer.offsetTop)};
        continueStroke(newObject);
        return;
      }
    }

    function handleTouchEnd(event) {
      var drawingLayer = document.getElementById("drawing-layer");

      event.preventDefault();
      var touches = event.changedTouches;

      for(var i=0; i < touches.length; i++) {
        if(touches[i].identifier != current_identifier) continue;
        current_identifier = null;

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

    onload = function() {
      var drawingLayer = document.getElementById("drawing-layer");
      var backImage = document.getElementById("back-image");
      var drawingContext = drawingLayer.getContext("2d");

      drawingContext.drawImage(backImage,0,0, drawingLayer.width, (480*drawingLayer.width/800));
      startCanvasEvents();
    }

    onload();

    $scope.submit = function() {
      var date = new Date();

      localStorage.setItem("submission"+date.valueOf(), JSON.stringify(savedDraws));

      console.log(savedDraws);
    }

    $scope.undoFunction = function() {
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

   $scope.fullScreen = function()
    {
      var i = document.getElementById("main-section");

      if (i.requestFullscreen) {
      	i.requestFullscreen();
      } else if (i.webkitRequestFullscreen) {
      	i.webkitRequestFullscreen();
      } else if (i.mozRequestFullScreen) {
      	i.mozRequestFullScreen();
      } else if (i.msRequestFullscreen) {
      	i.msRequestFullscreen();
      }

      document.getElementById("exit-fullscreen").style.display = "block";
    }

    $scope.exitFullScreen = function()
    {
        // exit full-screen
      if (document.exitFullscreen) {
      	document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
      	document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
      	document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
      	document.msExitFullscreen();
      }

      document.getElementById("exit-fullscreen").style.display = "none";
    }


});

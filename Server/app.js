var express         = require('express');
var app             = express();
var server          = require('http').Server(app);
var io              = require('socket.io')(server);
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var mongoose        = require('mongoose');
var expressSession  = require('express-session');


var routes = require('./routes/index');
var users = require('./routes/users');

// Configure database
var dbConfig = require('./config/database.js');
mongoose.connect(dbConfig.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("MongoDB connected at " + dbConfig.url)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static('../Client/'));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// socket io

// Note: this will need to be pulled out into its own file

// Note: We will need to look at bringing passport/express user info into socket
// Potential solutions:
//  - http://stackoverflow.com/questions/13095418/how-to-use-passport-with-express-and-socket-io
//  - https://www.npmjs.com/package/passport.socketio

// Note: currently the lecturer creates a room with only themselves in the room.
// The student's then post questions to the room which means only the lecturer
// can see them. Problem with this: There are no rooms for all students attempting 
// question x and so we have to send a message to EVERYONE to let them
// know a question session has finished. It would be better to make rooms for
// students and lecturers, keep track of lecturers socket_id's and then student
// responses would be directed to the lecturer's socket_id's (ie no private 
// rooms).

var response = io.of('/response');
response.on('connection', function(socket){
  console.log('new resoponse user connected');
  // Keep track of lecturer's selected question id in case lecturer disconnects
  var sessionQuestionId = null;

  // When a lecturer starts a new session (opens a question room)
  socket.on('start session', function(questionId) {
    console.log('new session started ' + questionId)

    sessionQuestionId = questionId;

    // Create a room with just with the lecturer(s) in it
    // Note: this room will recieve all answers posted by students
    socket.join(questionId);

    // TODO set question's sessionActive field to 'true' in database
    // TODO retrieve question info from db to send to students 
    // Note: the actions above can be done with a findAndModify
    // see: http://docs.mongodb.org/manual/reference/method/db.collection.findAndModify/
    var questionDataFromDatabase = {
      id: questionId, // this can be from db or lecturer's socket message
      pluginType: "multipleChoice",
      collection: "ENG1001",
      question: "What shoud we make ENG1001?",
      answers: [
        { id: 0, label: 'Bigger, Better, Badder.' },
        { id: 1, label: 'Softer, Cuter, Cuddlier.' },
        { id: 2, label: 'Smoother, Silkier, Slipperier.' },
        { id: 3, label: 'Rougher, Tougher, Donut.' }
      ]
    }
    // Emit new session message with question data to students
    response.emit('new session', questionDataFromDatabase);
  });

  // When a lecturer ends a session (closes a question room)
  socket.on('end session', function() {
    console.log('session ended ' + sessionQuestionId)
    // TODO Set sessionActive field to 'false' in database

    // Lecturer leaves the room where answers are sent
    socket.leave(sessionQuestionId);

    // Emit session closed message to students
    response.emit('session closed', sessionQuestionId);
    sessionQuestionId = null;
  });


  // When a student posts a new answer
  socket.on('new answer', function(answer) {
    // TODO If question's sessionActive field is true in db, store user's answer 
    // in db

    // Note:
    // We could also check that the user has subscribed to this collection 
    // before saving their answer but there's no point since anyone is able to 
    // subscribe to any collection.

    // Get user name and id from session and send it with answer data to 
    var answerWrapper = {};
    answerWrapper.userId = 'user123';
    answerWrapper.username = 'Student McStudent';
    answerWrapper.data = answer.data;
    response.to(answer.questionId).emit('new answer', answerWrapper);
  });


  // Whenever a student or lecturer disconnects
  socket.on('disconnect', function(){
    console.log('disconnection');
    if (sessionQuestionId !== null) {
      // Emit session closed message to students
      response.emit('session closed', sessionQuestionId);
      sessionQuestionId = null;
    }
  });
});

var editing = io.of('/editing');
editing.on('connection', function(socket){
  console.log('new editing user connected');
  socket.on('edit', function() {
    console.log("i got a message to say someone is editing")
  })  
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = server;

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
var response = io.of('/response');
response.on('connection', function(socket){
  console.log('new resoponse user connected');

  socket.on('new session', function(questionId) {
    console.log('new session started')
    // set question's sessionActive field to 'true' in database

    // retrieve question info for students
    var questionDataFromDatabase = {
      id: "1928he98eh219e21e9",
      pluginType: "multipleChoice",
      collection: "ENG1001",
      question: "What is this subject? An ideal inverting Op Amp?",
      answers: [
      { id: 0, label: 'The gain, G, would be 0.3333' },
      { id: 1, label: 'The gain, G, would be 3' },
      { id: 2, label: 'The gain, G, would be 3*10^4' },
      { id: 3, label: 'The gain, G, would be -3' }
      ]
    }

    response.emit('new session', questionDataFromDatabase);
  })

  socket.on('new answer', function(answer) {
    // get user data and store user id and name with answer in question
    response.emit('new answer', answer.data);
  })
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

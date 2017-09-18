var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var clientSessions = require("client-sessions");
var index = require('./routes/index');
var app = express();





app.use(clientSessions({
   // cookieName: 'uietsession', // cookie name dictates the key name added to the request object
    secret: 'infinixnote4miredmi3s', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms

    httpOnly: true,
    secure: true,
    ephemeral: true,

    activeDuration: 1000 * 60 * 5// if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds

}));
/*
app.use(clientSessions({
 //   cookieName: 'uietsession',
    secret: 'infinixnote4miredmi3s' // CHANGE THIS!
}));
*/

var url = "mongodb://localhost:27017/erp";
var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(url));



// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
*/



var cons = require('consolidate');
// view engine setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));




app.use(function(req, res, next) {
    console.log("hi");
    if (req.session_state && req.session_state.user) {
        console.log("here");
        req.db.collection('login').findOne({ username: req.session_state.user.username }, function(err, user) {
         if (user) {
         req.user = user;
         console.log(req.user+"hi");
         console.log(req.user);
         delete req.user.password; // delete the password from the session
         req.session_state.user = user;  //refresh the session value
         res.locals.user = user;
         }
         next();
         });

    }
   else
    {
        next();
    }
});




app.use('/', index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
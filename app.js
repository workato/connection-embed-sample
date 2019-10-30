const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');

const auth = require('http-auth');

const app = express();

const basicAuth = auth.basic({realm: "Private Area"}, (username, password, callback) => {
  callback(username === process.env.USER_NAME && password === process.env.USER_PASSWORD);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.USER_NAME && process.env.USER_PASSWORD) {
  app.use(auth.connect(basicAuth));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

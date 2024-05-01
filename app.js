var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

var indexRouter = require('./routes/index');
var siswaRouter = require('./routes/siswa');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {
    maxAge: 6000000000000000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  },
  store: new MemoryStore({
    checkPeriod: 864000000000000,
    max: 1000000
  }),
  saveUninitialized: true,
  resave: false,
  secret: 'secret'
}));

app.use('/', indexRouter)
app.use('/siswa', siswaRouter)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
})

module.exports = app;

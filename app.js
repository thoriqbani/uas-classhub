var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

var indexRouter = require('./routes/index');
var siswaRouter = require('./routes/siswa');
var materiSiswaRouter = require('./routes/materiSiswa');
var presensiRouter = require('./routes/presensiSiswa');
var tugasSiswaRouter = require('./routes/tugasSiswa');
var editProfileSiswaRouter = require('./routes/editProfileSiswa');
var guruRouter = require('./routes/guru');
var tugasGuruRouter = require('./routes/tugasGuru');
var materiGuruRouter = require('./routes/materiGuru');
var editProfileGuruRouter = require('./routes/editProfileGuru');

// app.post('/partials/tugasCard.ejs', (req, res) => {
//   res.render('partials/tugasCard', { tugas: req.body.tugas });
// });

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
  resave: true,
  secret: 'secret'
}));

app.use(flash());

app.use('/', indexRouter);
app.use('/guru', guruRouter);
app.use('/guru/tugas', tugasGuruRouter);
app.use('/guru/materi', materiGuruRouter);
app.use('/guru/editProfile', editProfileGuruRouter);
app.use('/siswa', siswaRouter);
app.use('/siswa/presensi', presensiRouter);
app.use('/siswa/tugas', tugasSiswaRouter);
app.use('/siswa/materi', materiSiswaRouter);
app.use('/siswa/editProfile', editProfileSiswaRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

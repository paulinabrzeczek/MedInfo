var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const medicinesRouter = require('./routes/medicines');
const aboutRouter = require('./routes/about');
const healthTipsRouter = require('./routes/healthTips');
const calculatorsRoutes = require('./routes/calculatorsRoutes');
const drugsInfoRoutes = require('./routes/drugsInfo');
const authRoutes = require('./routes/auth');

var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//sesja
app.use(express.urlencoded({ extended: true })); 
app.use(session({
  secret: 'moj_sekret', //sekret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //  HTTPS = true
}));

//middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/', (req, res, next) => {
  res.locals.user = req.session.user;  // Przekazanie informacji o użytkowniku do widoków
  next();
});
app.use('/', indexRouter);
app.use('/drugs-info', drugsInfoRoutes);
app.use('/users', usersRouter);
app.use('/medicines', medicinesRouter);
app.use('/about', aboutRouter);
app.use('/health-tips', healthTipsRouter);
app.use('/calculators', calculatorsRoutes);
app.use('/', authRoutes);
//logowanie i wylogowywasnie
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password123') {
    req.session.user = { username: 'admin' };  // Zapisanie danych użytkownika w sesji
    req.session.loggedIn = true;  // Flaga, że użytkownik jest zalogowany
    console.log('Zalogowano użytkownika:', req.session.user);  // Debugging
    res.redirect('/');  // Przekierowanie na stronę główną
  } else {
    res.status(401).send('Niepoprawne dane logowania');
  }
});

// Wylogowanie użytkownika
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Błąd wylogowywania');
    }
    res.redirect('/');
  });
});
app.get('/', (req, res) => {
  res.render('index', { title: 'MediInfo' });
});

// Strona logowania
app.get('/login', (req, res) => {
  res.render('login', { title: 'Zaloguj się' });
});

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const path = require('path');
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


const expressValidator = require('express-validator');

const app = express();
app.set('view engine', 'ejs');

app.use('/static', express.static('views'));

mongoose.connect(config.database);
let db = mongoose.connection;

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(flash());

app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  res.locals.errors = '';
  res.locals.success = '';
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Passport Config
require('./config/studentPassport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.post('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//route For registration/login/logout process
let users = require('./routes/users');
app.use('/users', users);


app.get('/', (req, res) => {
	res.render('index');
});

app.get('/exit', (req, res) => {
	res.render('exit');
});



app.listen(3000, () => {
 	console.log('server started on port 3000');
 });
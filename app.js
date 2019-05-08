var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var BookRouter = require('./routes/books');
var AuthorRouter = require('./routes/author');
var UserRouter = require('./routes/user');

var app = express();

require('./models/Book');
require('./models/Author');
require('./models/User');

// connecting node.js and mongoDB
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sample', {useNewUrlParser: true},
(err => {
  err ? console.log("mongoDB not connected") : console.log("mongoDB connected")
})
);

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 
app.use(session({
  secret: 'Worst App',
  saveUninitialized: true, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use('/', indexRouter);
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);
app.use('/user', UserRouter);




module.exports = app;

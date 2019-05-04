var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var BookRouter = require('./routes/books');
var AuthorRouter = require('./routes/author');
var app = express();

require('./models/Book');
require('./models/Author');

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

app.use('/', indexRouter);
app.use('/books', BookRouter);
app.use('/authors', AuthorRouter);

module.exports = app;

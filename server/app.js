var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var contentsRouter = require('./routes/contents');
var contentRouter = require('./routes/content');
var detailsviewRouter = require('./routes/detailsview');
var upvoteRouter = require('./routes/upvote');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// TODO: insert a new route here :)
app.use('/', contentsRouter);
app.use('/', contentRouter);
app.use('/', detailsviewRouter);
app.use('/upvote', upvoteRouter);

module.exports = app;

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose')
import config from './config'
import products from './routes/products'
import suppliers from './routes/suppliers'
import fallback from 'express-history-api-fallback'

// 全局变量
global.db = mongoose.connect(config.db_uri)

// 自定义异常
global.throwCustomError = (status, msg) => {
	var error = new Error(msg || '未知异常')
	error.status = status || 500
	throw  error
}

mongoose.Promise = global.Promise
var app = express();
const root = path.join(__dirname, 'public')


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(root));


app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/products', products)
app.use('/api/suppliers', suppliers)

app.get('/admin', (req,res,next) => {
	res.sendFile(path.resolve(__dirname, 'public', 'admin.html'))
})
app.get('/', (req,res,next) => {
	res.sendFile(path.resolve(__dirname, 'public', 'main.html'))
})
app.use('/admin/*',fallback('admin.html', {root}))
app.use('/*', fallback('main.html', {root}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
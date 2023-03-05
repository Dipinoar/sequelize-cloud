var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
require("dotenv").config({path:"./.env"})
//importamos Helpers
var helpers = require('./components/hbsHelpers');

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');
var productosRouter = require('./routes/productos');
var comprasRouter = require('./routes/compras');


var app = express();

//registrar Parcial
hbs.registerPartials(path.join(__dirname, 'views/partials'));
//registramos Helpers
for (let helper in helpers) {
  hbs.registerHelper(helper, helpers[helper]);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/signup', loginRouter);
app.use('/api/productos', productosRouter);
app.use('/api/compraEcommerce', comprasRouter);


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

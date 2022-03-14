var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

// swagger
var swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs')
// swagger

var app = express();
var cors = require('cors');
const corsOptions = {
  origin: ['http://www.example.com', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', '*'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// swagger
const swaggerDocument = YAML.load('./src/swagger.yml')   // use yml
// const swaggerDocument = require('./src/swagger.json');   // use json
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger UI
// swagger

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

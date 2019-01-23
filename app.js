const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();


const router = require('./router');
const secrets = require('./secrets');
// const cronUpdateJob = require('./CronJob');


app.use(fileUpload());
app.use(compression());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(express.static(path.join(__dirname, '/static/build/')));
app.use(require('express-session')({
  resave: true,
  saveUninitialized: false,
  secret: secrets.AKNO_SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

// TODO: old issues notifier
// cronUpdateJob.start();

module.exports = app;

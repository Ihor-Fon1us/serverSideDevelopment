const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport-jwt');
const config = require('./config');
const url = config.mongoUrl;
const authenticate = require('./authentication');
const port = 3000;
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const dishes = require('./dishesRouter');
const promotions = require('./promotionsRouter');
const leaders = require('./leadersRouter');
const favorites = require('./favoritesRouter');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(auth);

app.use('/dishes', dishes);
app.use('/promotions', promotions); 
app.use('/leaders', leaders);
app.use('/favorites', favorites);

app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
  }));

function auth (req, res, next) {
    console.log(req.user);

    if (!req.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      next(err);
    }
    else {
          next();
    }
}
  
app.use(auth);



function auth (req, res, next) {
    console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
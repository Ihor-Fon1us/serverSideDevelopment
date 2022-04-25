const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const port = 3000;

app.use(bodyParser.json());

const dishes = require('./dishesRouter');
const promotions = require('./promotionsRouter');
const leaders = require('./leadersRouter');

app.use('/dishes', dishes);
app.use('/promotions', promotions); 
app.use('/leaders', leaders);

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.listen(port, () => {
    console.log('Server started on port ' + port);
  });
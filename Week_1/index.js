const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());

const dishes = require('./dishesRouter');
const promotions = require('./promotionsRouter');
const leaders = require('./leadersRouter');

app.use('/dishes', dishes);
app.use('/promotions', promotions); 
app.use('/leaders', leaders);

app.listen(port, () => {
    console.log('Server started on port ' + port);
  });   

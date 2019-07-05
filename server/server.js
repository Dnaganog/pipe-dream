const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const APIController = require('./controllers/APIController');
const redisController = require('./controllers/redisController');

const app = express();

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.post('/db', APIController.getAPI, (req, res) => {
  // console.log('I am fetching from the server', res.locals.payload);
  res.status(200).send(JSON.stringify(JSON.stringify({ keyword: res.locals.payload })));
});

app.listen(3000);

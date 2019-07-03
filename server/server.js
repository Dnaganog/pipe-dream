const express = require('express');
const path = require('path');
const googleTrendsController = require('./controllers/googleTrendsController')

const app = express();

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/db', googleTrendsController.getAPI, (req, res) => {
  console.log('I am fetching from the server', res.locals.payload);
  res.status(200).send(res.locals.payload);
});

app.listen(3000);

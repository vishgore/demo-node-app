const express = require('express');
const app = express();
const _ = require('lodash');
const debug = require('debug')('app');

const port = 8080;

app.get('/', (req, res) => {
  debug('Received request for /');
  res.send(`
    <h1>Hello from Node.js Express!</h1>
    <p>This is a demo for gradual Snyk fixes.</p>
    <p>lodash version used: ${_.VERSION}</p>
  `);
});

app.get('/info', (req, res) => {
  const query = req.query.data || 'No data';
  res.send(`You sent: ${query}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
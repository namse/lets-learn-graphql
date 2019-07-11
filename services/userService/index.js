const express = require('express');
const bodyParser = require('body-parser');
const userData = require('./userData');
const settings = require('../../settings');

const port = settings.ports.user;

const app = express();

app.use(bodyParser.text());

app.get('/user/{userId}', async (req, res) => {
  const userId = req.query.userId;

  res.send(userData[userId]);
})

app.listen(port, () => console.log(`user server on port ${port}`));

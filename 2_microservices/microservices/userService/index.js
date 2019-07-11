const express = require('express');
const userData = require('./userData');
const settings = require('../../../settings');

const port = settings.ports.user;

const app = express();

app.get('/hello', (req, res) => {
  res.send('world');
})

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  res.send(userData[userId]);
})

app.listen(port, () => console.log(`user server on port ${port}`));

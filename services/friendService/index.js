const express = require('express');
const bodyParser = require('body-parser');
const friendData = require('./friendData');
const settings = require('../../settings');

const port = settings.ports.friend;

const app = express();

app.use(bodyParser.text());

app.get('/user/{userId}/friends', async (req, res) => {
  const userId = req.query.userId;

  res.send(friendData[userId]);
})

app.listen(port, () => console.log(`friend server on port ${port}`));

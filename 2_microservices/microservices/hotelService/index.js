const express = require('express');
const bodyParser = require('body-parser');
const hotelData = require('./hotelData');
const settings = require('../../../settings');

const port = settings.ports.hotel;

const app = express();

app.use(bodyParser.text());

app.get('/hotel/:hotelId', async (req, res) => {
  const hotelId = req.params.hotelId;

  res.send(hotelData[hotelId]);
});

function findUserHotel(userId) {
  return Object.values(hotelData).find(hotel => {
    return hotel.users.includes(userId);
  });
}

app.get('/user/:userId/hotel', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  const hotel = findUserHotel(userId);

  res.send(hotel);
});

app.listen(port, () => console.log(`hotel server on port ${port}`));

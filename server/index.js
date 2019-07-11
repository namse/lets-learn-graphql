const express = require('express');
const bodyParser = require('body-parser');
const resolveGraphqlQuery = require('./graphql/resolveGraphqlQuery');
const settings = require('../settings');

const port = settings.ports.graphql;

const app = express();

app.use(bodyParser.text());

app.post('/graphql', async (req, res) => {
  const query = req.body;

  console.log('--query--');
  console.log(query);
  console.log('---------');

  const result = await resolveGraphqlQuery(query);


  console.log('--result--');
  console.log(JSON.stringify(result, null, 2));
  console.log('---------');

  res.send(result);
})

app.listen(port, () => console.log(`server on port ${port}`));

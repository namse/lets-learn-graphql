const fetch = require('node-fetch');

const serverUrl = 'http://localhost:33333';

async function executeGraphqlQuery(query) {
  const response = await fetch(`${serverUrl}/graphql`, {
    method: 'POST',
    body: query,
  });

  const json = await response.json();

  return json.data;
}

module.exports = executeGraphqlQuery;

const fetch = require('node-fetch');
const settings = require('../../settings');

const serverUrl = `http://localhost:${settings.ports.graphql}`;

async function executeGraphqlQuery(query) {
  const response = await fetch(`${serverUrl}/graphql`, {
    method: 'POST',
    body: query,
  });

  const json = await response.json();

  return json.data;
}

module.exports = executeGraphqlQuery;

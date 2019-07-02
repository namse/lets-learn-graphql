const { graphql } = require('graphql');
const schema = require('./schema');

async function resolveGraphqlQuery(query) {
  return await graphql(schema, query);
}

module.exports = resolveGraphqlQuery;

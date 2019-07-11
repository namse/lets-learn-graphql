const { graphql } = require('graphql');

/// HERE! Try schema types
const { schema, rootResolver } = require('./schema_5_MicroServices');

async function resolveGraphqlQuery(query) {
  return await graphql(schema, query, rootResolver);
}

module.exports = resolveGraphqlQuery;

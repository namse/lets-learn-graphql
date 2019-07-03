const { graphql } = require('graphql');

/// Try schema types
const { schema, rootResolver } = require('./schema_1_GraphQLSchema');
// const { schema, rootResolver } = require('./schema_2_FunctionResolver');
// const { schema, rootResolver } = require('./schema_3_ClassResolver');

async function resolveGraphqlQuery(query) {
  return await graphql(schema, query, rootResolver);
}

module.exports = resolveGraphqlQuery;

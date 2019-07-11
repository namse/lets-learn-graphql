const { graphql } = require('graphql');

/// HERE! Try schema types
const { schema, rootResolver } = require('./schema_1_GraphQLSchema');
// const { schema, rootResolver } = require('./schema_2_FunctionResolver');
// const { schema, rootResolver } = require('./schema_3_ClassResolver');
// const { schema, rootResolver } = require('./schema_4_ProxyResolver');

async function resolveGraphqlQuery(query) {
  return await graphql(schema, query, rootResolver);
}

module.exports = resolveGraphqlQuery;

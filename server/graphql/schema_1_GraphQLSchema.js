const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const data = require('../data');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLInt,
      resolve(obj, args, context, resolveInfo) { // We don't need this reoslver => read #1
        return obj.id;
      },
    },
    username: {
      type: GraphQLString,
      resolve(obj, args, context, resolveInfo) { // We don't need this reoslver => read #1
        return obj.username;
      },
    }
  }
});

/// #1
/// If resolver function just return obj[field], we don't have to provide resolver function!
/// 1. In Type Definition if field has resolver, they call resolver function and take return value.
/// 2. In Type Definition if field doesn't have resolver, they try to access to obj[field].
/// 2.1. if obj[field] is function, graphql calls it and take return value.
/// 2.2. If obj[field] is value, they just use that.

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: {
            type: GraphQLInt,
          },
        },
        resolve(obj, args, context, resolveInfo) {
          const userId = args.id;
          const user = data.users[userId];
          return user;
        }
      }
    }
  })
});

module.exports = {
  schema,
};

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
      resolve(obj, args, context, resolveInfo) {
        return obj.id;
      },
    },
    username: {
      type: GraphQLString,
      resolve(obj, args, context, resolveInfo) {
        return obj.username;
      },
    }
  }
});

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

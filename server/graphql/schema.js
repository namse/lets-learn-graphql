const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const data = require('../data');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: new GraphQLObjectType({
          name: 'User',
          fields: {
            id: {
              type: GraphQLInt,
              resolve(obj, args, context, resolveInfo) {
                console.log(obj);
                return obj.id;
              },
            },
            username: {
              type: GraphQLString,
              resolve(obj, args, context, resolveInfo) {
                console.log(obj);
                return obj.username;
              },
            }
          }
        }),
        args: {
          id: {
            type: GraphQLInt,
          },
        },
        resolve(obj, args, context, resolveInfo) {
          const userId = args.id;
          const user = data.users[userId];
          console.log(user);
          return user;
        }
      }
    }
  })
});

module.exports = schema;

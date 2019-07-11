const {
  buildSchema,
} = require('graphql');

const data = require('../data');

const schema = buildSchema(`
  type User {
    id: Int
    username: String
  }

  type Query {
    user(id: Int): User
  }
`);

function userResolver(user) {
  return {
    id() {
      return user.id;
    },
    username() {
      return user.username;
    },
  }
}

const rootResolver = {
  user(args) {
    const userId = args.id;
    const user = data.users[userId];

    return userResolver(user);
  }
}

module.exports = {
  schema,
  rootResolver,
};

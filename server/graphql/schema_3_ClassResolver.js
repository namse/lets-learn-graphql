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

class UserResolver {
  constructor(user) {
    this.user = user;
  }
  id() {
    return this.user.id;
  }
  username() {
    return this.user.username;
  }
}

const rootResolver = {
  user(args) {
    const userId = args.id;
    const user = data.users[userId];

    return new UserResolver(user);
  }
}

module.exports = {
  schema,
  rootResolver,
};

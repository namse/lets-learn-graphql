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


function createGetterProxy(obj, getters) {
  return new Proxy(obj, {
    get(obj, prop) {
      if (getters[prop]) {
        return getters[prop];
      }
      return obj[prop];
    },
  });
}

const userResolver = (user) => createGetterProxy(user, {
  id() {
    return user.id; // We don't need this reoslver => read #1
  },
  username() {
    return user.username; // We don't need this reoslver => read #1
  },
});

/// #1
/// If resolver function just return obj[field], we don't have to provide resolver function!
/// 1. In Type Definition if field has resolver, they call resolver function and take return value.
/// 2. In Type Definition if field doesn't have resolver, they try to access to obj[field].
/// 2.1. if obj[field] is function, graphql calls it and take return value.
/// 2.2. If obj[field] is value, they just use that.

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

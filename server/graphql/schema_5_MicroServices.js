const {
  buildSchema,
} = require('graphql');
const fetch = require('node-fetch');
const settings = require('../../settings');

/// START - Network Functions ///
async function getUser(userId) {
  const response = await fetch(`http://localhost:${settings.ports.user}/user/${userId}`);
  const user = await response.json();
  return user;
}

async function getFriendIds(userId) {
  const response = await fetch(`http://localhost:${settings.ports.friend}/user/${userId}/friends`);
  const friends = await response.json();
  return friends;
}

async function getHotel(hotelId) {
  const response = await fetch(`http://localhost:${settings.ports.hotel}/hotel/${hotelId}`);
  const hotel = await response.json();
  return hotel;
}

async function getUserHotel(userId) {
  const response = await fetch(`http://localhost:${settings.ports.hotel}/user/${userId}/hotel`);
  const hotel = await response.json();
  return hotel;
}
/// END - Network Functions ///

const schema = buildSchema(`
  type User {
    id: Int
    username: String
    friends: User[]
    hotel: Hotel
  }

  type Friend {
    userId: Int
    user: User
  }

  type Hotel {
    id: Int
    name: String
    users: User[]
  }

  type Query {
    user(id: Int): User
    userFriends(userId: Int): Friend[]
    hotel(id): Hotel
  }
`);


/// START - Resolvers ///

class UserResolver {
  constructor(id) {
    this.id = id;
    userPromise = getUser(id);
  }
  async username() {
    const user = await userPromise;
    return user.username;
  }
  async friends() {
    // NOTE : we only need user.id in this function
    // don't have to wait userPromise because we know userId by constructor args!
    const friendIds = await getFriendIds(this.id);
    return friendIds.map(friendId => new FriendResolver(friendId));
  }
  async hotel() {
    // NOTE : we only need user.id in this function
    // don't have to wait userPromise because we know userId by constructor args!
    return await HotelResolver.getUserHotelResolver(this.id);
  }
}

class FriendResolver {
  constructor(userId) {
    this.userId = userId;
  }
  async user() {
    const user = await getUser(userId);
    return user;
  }
}

class HotelResolver {
  static async getUserHotelResolver(userId) {
    const hotel = await getUserHotel(userId);
    return new HotelResolver(hotel);
  }
  static async getHotelResolver(id) {
    const hotel = await getHotel(id);
    return new HotelResolver(hotel);
  }
  constructor(hotel) {
    this.hotel = hotel;
  }
  get name() {
    return this.hotel.name;
  }
  users() {
    const userIds = this.hotel.users; // this is userIds!

    return userIds.map(userId => new UserResolver(userId));
  }
}

/// START - Resolvers ///

const rootResolver = {
  async user(args) {
    const userId = args.id;
    const user = await getUser(userId);

    return new UserResolver(user);
  },
  async userFriends(args) {
    const userId = args.userId;
    const friendIds = await getFriendIds(userId);

    const friendResolvers = friendIds.map(friendId => new FriendResolver(friendId));
    return friendResolvers;
  },
  async hotel(args) {
    const hotelId = args.id;
    return await HotelResolver.getHotelResolver(hotelId);
  }
}

module.exports = {
  schema,
  rootResolver,
};

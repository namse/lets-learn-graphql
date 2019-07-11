/*
data: {
  [roomId]: [userId, userId, ...],
}
*/

module.exports = {
  1: {
    name: 'hotel1',
    users: [],
  },
  2: {
    name: 'hotel2',
    users: [1],
  },
  3: {
    name: 'hotel3',
    users: [2, 3],
  },
  4: {
    name: 'hotel4',
    users: [4, 5],
  },
};

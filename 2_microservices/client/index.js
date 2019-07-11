const executeGraphqlQuery = require('./executeGraphqlQuery');

async function main() {
  const userId = 1;

  const query = `
  {
    user(id: ${userId}) {
      username
      friends {
        user {
          id
          username
          friends {
            user {
              id
              username
            }
          }
          hotel {
            name
          }
        }
      }
      hotel {
        id
        name
        users {
          id
          username
        }
      }
    }
  }
  `;

  console.log('--query--');
  console.log(query);
  console.log('---------');

  const result = await executeGraphqlQuery(query);

  console.log('--result--');
  console.log(JSON.stringify(result, null, 2));
  console.log('---------');


  const { user } = result;

  console.log(`my id is ${userId}`);

  console.log(`my username is ${user.username}`);

  const { friends } = user;
  console.log(`I have ${friends.length} friend(s)`);

  function getSameFriends(friendListA, friendListB) {
    if (!friendListA || !friendListB) {
      return 0;
    }

    return friendListA
      .filter(friendA => friendListB.some(friendB => friendA.user.id === friendB.user.id));
  }

  friends.forEach(friend => {
    const sameFriends = getSameFriends(user.friends, friend.user.friends);
    const sameFriendIdsString = `(${sameFriends.map(sameFriend => sameFriend.user.id).join(', ')})`;

    console.log(`my friend, user ${friend.user.id} info
  - id: ${friend.user.id}
  - username: ${friend.user.username}
  - same friends number: ${sameFriends.length} - ${sameFriends.length ? sameFriendIdsString : ''}`);
  });

  // TODO : hotel
}

main().catch(err => console.error(err));

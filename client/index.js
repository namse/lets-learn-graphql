const executeGraphqlQuery = require('./executeGraphqlQuery');

async function main() {
  const userId = 5;

  const query = `
  {
    user(id: ${userId}) {
      username
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

  const { username } = user;

  console.log(`user ${userId}'s username : ${username}`);
}

main().catch(err => console.error(err));
const serviceList = require('./serviceList');

async function runAllServices() {
    await Promise.all(serviceList.map(async (serviceName) => {
        require(`./${serviceName}/index.js`);
    }));
}

if (process.mainModule === module) {
    runAllServices().catch(err => console.log(err));
}

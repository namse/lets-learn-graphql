const serviceList = require('./serviceList');

function runAllServices() {
    serviceList.forEach((serviceName) => {
        require(`./${serviceName}/index.js`);
    });
}

if (process.mainModule === module) {
    runAllServices();
}

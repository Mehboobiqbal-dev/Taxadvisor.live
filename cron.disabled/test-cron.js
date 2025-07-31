const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'test-cron.log');

fs.writeFileSync(logFilePath, new Date().toString());

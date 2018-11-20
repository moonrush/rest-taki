const fs = require('fs');

module.exports = {
    key:fs.readFileSync(__dirname + '/server.key').toString(),
    cert:fs.readFileSync(__dirname + '/server.crt').toString(),
};

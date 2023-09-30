const fs = require('fs');

module.exports = {
    readFile(PATH) {
        return fs.readFileSync(PATH, 'utf8');
    },

    convertStringToArray(string) {
        return string.split("\r\n");
    },
}
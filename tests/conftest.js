var fs = require('fs');


function getFileContent(path) {
    return fs.readFileSync(path, 'utf8');
}
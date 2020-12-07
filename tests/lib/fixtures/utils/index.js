var fs = require('fs');


/**
 * Get file content by path
 * @param {string} path 
 */
function getFileContent(path) {
    const content = fs.readFileSync(path, 'utf8')
    // FIXME: Maybe will nee - // content.replace(new RegExp("\u000d", "g"), "");
    return content;
}

/**
 * Get file fixture by path
 * @param {string} path 
 */
function getFileFixture(path) {
    return {
        code: getFileContent(path),
        filename: path,
    }
}

module.exports = {
    getFileContent,
    getFileFixture,
};

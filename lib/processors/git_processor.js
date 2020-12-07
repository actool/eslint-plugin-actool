const execCommand = require("./cmd_processor");

class GitWorker {
    constructor() {}

    async commitedFileLine(filePath, lineNumber) {
        const a = await execCommand(`git blame -L ${lineNumber},+1 -- ${filePath}`);
        return a;
    }
}

module.exports = GitWorker;

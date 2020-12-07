const GitWorker = require("./git_processor.js");
const g = new GitWorker();
console.log(g.commitedFileLine("lib/processors/git.js", 7));

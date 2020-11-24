const exec = require('child_process').exec;

//#region getCommit

/**
 * @param {{ path: string, lineNumber: number }} args;
 * @return {Promise<string>}
 */
const getCommitByLine = ({ path, lineNumber }) => {
    return new Promise((resolve, reject) => {
        exec(`git blame -L ${lineNumber},+2 -- ${path}`, (err, stdout, stderr) => {
            if (stderr || err) {
                return reject(stderr)
            }
            resolve(stdout);
        })
    })
}

/* 
getCommit({
    path: "lib/rules/max-tags-file.js",
    // path: "S:/work/com.megapolis/.proj/rms/src/app/store/index.ts",
    lineNumber: 7,
}) 
*/

//#endregion getCommit

//#region parseCommit
const commit = "eb970479 (Ilya Azin 2020-11-16 05:40:58 +0300 7) //------------------------------------------------------------------------------\n";

/**
 * 
 * @param {string} commitRaw 
 */
const parseCommit = (commitRaw) => {
    const reg = /(\w+) \(([\w ]+) (\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d \+\d\d\d\d)/;
    const [_, hash, name, date] = reg.exec(commitRaw);
    return { hash, name, date: new Date(date) };
}

// parseCommit(commit);

module.exports = {
    parseCommit,
    getCommitByLine,
}

//#endregion parseCommit
const { execSync } = require('child_process');
const arr = require("./array");
require("./types");

// TODO: decompose util later

/**
 * Parse line revision as Commit
 * @param {string} revision
 * @return {LineCommit}
 */
function parseLineRevision (revision) {
    const reg = /(\w+) \(([\w ]+) (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \+\d{4}) +(\d+)/;
    const [_, hash, author, date, line] = reg.exec(revision);
    return {
        hash,
        author,
        date: new Date(date),
        line: Number(line)
    };
}

/**
 * Get revision for line in file
 * @param {LineIdentity} lineIdentity
 * // TODO: add try/catch (stderr, err)
 */
function getLineRevision({ file, line }) {
    const stdoutBuffer = execSync(`git blame -L ${line},+2 -- ${file}`);
    return String(stdoutBuffer);
}

/**
 * Get commit for line in file
 * @param {LineIdentity} lineIdentity;
 */
function getLineCommit (lineIdentity) {
    const lineRevision = getLineRevision(lineIdentity);
    return parseLineRevision(lineRevision);
}

/**
 * Get last commit for block in file
 * @param {BlockIdentity} blockIdentity
 * TODO: validate
 */
function getBlockLastCommit ({ file, loc }) {
    const [lineStart, lineEnd] = [loc.start.line, loc.end.line];
    // for line comments
    if (lineStart === lineEnd) {
        return getLineCommit({ line: lineStart, file });
    };
    const lines = arr.range(lineStart, lineEnd);
    const commits = lines.map((line) => getLineCommit({ line, file }));
    const lastCommit = commits.reduce((max, cur) => {
        return (cur.date > max.date) ? cur : max;
    }, commits[0]);
    return lastCommit;
};

module.exports = {
    getLineRevision,
    getLineCommit,
    getBlockLastCommit,
};

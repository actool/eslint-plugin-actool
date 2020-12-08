const { execSync } = require("child_process");
require("./types");

/**
 * Get commits in between
 * @param {Commit} from Usually - commentCommit
 * @param {Commit} to Usually - codeCommit
 * FIXME: take only commitDate?
 */
function getCommitsDiff(from, to) {
    const config = {
        after: `${from.date.toISOString()}`,
        before: `${to.date.toISOString()}`,
        pretty: 'format:"%ad"',
    };
    // => git log --after=${} --before=${} --pretty=${}
    const configSerialized = Object.entries(config)
        .map(([key, value]) => `--${key}=${value}`)
        .join(" ");
    const response = execSync(`git log ${configSerialized} | wc -l`);
    return Number(response) - 1;
}

module.exports = {
    getCommitsDiff,
};

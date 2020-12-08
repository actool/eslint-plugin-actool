const { execSync } = require("child_process");
require("./types");

/**
 * Get commits in between
 * @param {LineCommit} after Usually - commentCommit
 * @param {LineCommit} before Usually - codeCommit
 */
function getCommitsDiff(after, before) {
    const config = {
        after: `${after.date.toISOString()}`,
        before: `${before.date.toISOString()}`,
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

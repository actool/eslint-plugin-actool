const { execSync } = require("child_process");
require("./types");

/**
 * Get commits in between
 * @param {LineCommit} after Usually - commentCommit
 * @param {LineCommit} before Usually - codeCommit
 */
function getCommitsDiff(after, before) {
    return (
        Number(
            execSync(
                `git log --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%ad" | wc -l`,
            ),
        ) - 1
    );
}

module.exports = {
    getCommitsDiff,
};

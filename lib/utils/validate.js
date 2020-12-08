require("./types");

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

// TODO: enhance impls

/**
 * Validate diff
 * @param {LineCommit} commit1
 * @param {LineCommit} commit2
 * @param {number} diff
 */
function validateDiffByCommits(commit1, commit2, diff) {
    const commits = [];
    // !!! TODO: specify
    for (const commit in []) {
        if (commit.date >= commit1.date && commit.date <= commit2.date) {
            commits.push(commit);
        }
    }
    return commits.length <= diff ? true : false;
}

/**
 * Compute diff by days
 * @param {Date} from
 * @param {Date} to
 */
function computeDiffByDays(from, to) {
    const diffMs = to.getTime() - from.getTime();
    const diffDays = diffMs / DAY;
    return diffDays;
}

module.exports = {
    computeDiffByDays,
    validateDiffByCommits,
};

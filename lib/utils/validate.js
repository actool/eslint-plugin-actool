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

/**
 * Validate diff
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} diff
 */
function validateDiffByDates(date1, date2, diff) {
    // const actualDiff = computeDiffByDays(date1, date2)
    const daysWent = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
    return daysWent <= diff ? true : false;
}

module.exports = {
    computeDiffByDays,
    validateDiffByCommits,
    validateDiffByDates,
};
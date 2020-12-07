require("./types");

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
 * Validate diff
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} diff
 */
function validateDiffByDates(date1, date2, diff) {
    const daysWent = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
    return daysWent <= diff ? true : false;
}

module.exports = {
    validateDiffByCommits,
    validateDiffByDates,
};

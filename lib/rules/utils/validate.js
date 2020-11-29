const { commitsHistory } = require("./fixtures");
require("./types");

// TODO: enhance impls

/**
 * Validate diff
 * @param {LineCommit} commit1 
 * @param {LineCommit} commit2 
 * @param {number} diff 
 */
function validateDiff(commit1, commit2, diff) {
	const commits = [];
	for (let commit in commitsHistory) {
		if (commit.date >= commit1.date && commit.date <= commit2.date){
			commits.push(commit)
		}
	}
	return commits.length <= diff ? true : false
}
/**
 * Validate diff
 * @param {Date} date1
 * @param {Date} date2
 * @param {number} diff 
 */
function validateDiff(date1, date2, diff){
	const timeWent = date2 - date1;
	return timeWent <= diff ? true : false
}

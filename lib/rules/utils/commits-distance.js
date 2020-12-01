const { commitsHistory } = require("./fixtures");
require("./types");

/**
 * Get commits in between
 * @param {LineCommit} commit1
 * @param {LineCommit} commit2
 */
function getCommitsDiff(commit1, commit2){
	return Number(execSync(`git log --since='${commit1.date}' --until='${commit2.date}' --pretty=format:"%ad" | wc -l`));
}

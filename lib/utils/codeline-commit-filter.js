const { execSync } = require("child_process");
require("./types");

/**
 * Get commits in between
 * @param {LineCommit} after Usually - commentCommit
 * @param {LineCommit} before Usually - codeCommit
 * @param {LineCommit} filepath Usually - codeCommit
 * @param {LineCommit} lines Usually - codeCommit
 */
function getCommitsDiffByLines(after, before, filepath, lines) {
	commits = [, hash, name, date];
	for (let line of lines) {
		commitsNumber = Number(
			execSync(
				`git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%H" -- ${filepath} | wc -l`,
			)
		) + 1;

		hashes = execSync(
			`git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%H" -- ${filepath}`,
		);
		names = execSync(
			`git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=oneline --abbrev-commit --pretty=format:%s -- ${filepath}`,
		);
		dates = execSync(
			`git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%ad" -- ${filepath}`,
		);
		for (let commit = 0; commit < commitsNumber; commit++){
			commits.push(
				{
					hash: hashes[commit],
					name: names[commit],
					date: dates[commit]
				}
			)
		}
	}
    return commits;
}

module.exports = {
    getCommitsDiffByLines,
};

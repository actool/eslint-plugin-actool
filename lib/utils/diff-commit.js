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

/**
 * Get commits in between
 * @param {Object} args
 * @param {LineCommit} args.from Usually - commentCommit
 * @param {LineCommit} args.to Usually - codeCommit
 * @param {BlockIdentity["file"]} args.file Usually - codeCommit
 * @param {BlockIdentity["loc"]} args.loc Usually - codeCommit
 * TODO: impl
 */
function getCommitsDiffByLines({ from, to, file, loc }) {
    // const baseCfg = {
    //     after: from.date.toISOString(),
    //     before: to.date.toISOString(),
    // };
    // const baseCfgStr = Object.red;
    // commits = [, hash, name, date];
    // for (const line of lines) {
    //     commitsNumber =
    //         Number(
    //             execSync(
    //                 `git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%H" -- ${filepath} | wc -l`,
    //             ),
    //         ) + 1;
    //     hashes = execSync(
    //         `git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%H" -- ${filepath}`,
    //     );
    //     names = execSync(
    //         `git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=oneline --abbrev-commit --pretty=format:%s -- ${filepath}`,
    //     );
    //     dates = execSync(
    //         `git log -S'${line}' --after='${after.date.toISOString()}' --before='${before.date.toISOString()}' --pretty=format:"%ad" -- ${filepath}`,
    //     );
    //     for (let commit = 0; commit < commitsNumber; commit++) {
    //         commits.push({
    //             hash: hashes[commit],
    //             name: names[commit],
    //             date: dates[commit],
    //         });
    //     }
    // }
    // return commits;
}

module.exports = {
    getCommitsDiff,
};

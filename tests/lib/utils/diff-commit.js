const assert = require("assert");
const { getCommitsDiff } = require("../../../lib/utils/diff-commit");
const { commit1, commit7, commit117 } = require("../fixtures/data/commits");

const fixtures = [
    {
        from: commit1,
        to: commit7,
        diff: 5,
    },
    {
        from: commit1,
        to: commit117,
        diff: 115,
    },
    {
        from: commit7,
        to: commit117,
        diff: 109,
    },
    {
        from: commit7,
        to: commit1,
        diff: -1,
    },
];

describe("diff-commit", () => {
    it(">> getCommitsDiff", () => {
        fixtures.forEach(({ from, to, diff }) => {
            const actualDiff = getCommitsDiff(from, to);
            assert.strictEqual(actualDiff, diff);
        });
    });
});

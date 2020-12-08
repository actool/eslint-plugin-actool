const assert = require("assert");
const { computeDiffByDays } = require("../../../lib/utils/diff-date");

const tests = [
    {
        from: new Date("9/11/2020"),
        to: new Date("9/30/2020"),
        expected: 19,
    },
    {
        from: new Date("9/11/2020"),
        to: new Date("9/12/2020"),
        expected: 1,
    },
    {
        from: new Date("9/11/2020"),
        to: new Date("9/30/2020"),
        expected: 19,
    },
];

describe("diff-date", () => {
    it(">> computeDiffByDays", () => {
        tests.forEach(({ from, to, expected }) => {
            const actual = computeDiffByDays(from, to);
            assert.strictEqual(actual, expected);
        });
    });
});

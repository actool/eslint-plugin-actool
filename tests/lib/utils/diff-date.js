const assert = require("assert");
const { computeDiffByDays } = require("../../../lib/utils/diff-date");

// FIXME: Maybe, after "byCommits" implementing - some fields will be redundant
const validateDaysTests = [
    {
        from: new Date("9/11/2020"),
        to: new Date("9/30/2020"),
        maxDiff: 12,
        expectedDiff: 19,
        expectedValid: false,
    },
    {
        from: new Date("9/11/2020"),
        to: new Date("9/12/2020"),
        maxDiff: 1,
        expectedDiff: 1,
        expectedValid: true,
    },
    {
        from: new Date("9/11/2020"),
        to: new Date("9/30/2020"),
        maxDiff: 50,
        expectedDiff: 19,
        expectedValid: true,
    },
];

describe("diff-date", () => {
    it(">> computeDiffByDays", () => {
        validateDaysTests.forEach(({ from, to, expectedDiff }) => {
            const actualDiff = computeDiffByDays(from, to);
            assert.strictEqual(actualDiff, expectedDiff);
        });
    });
    // TODO: it("by commits")
});

// TEST validateDiffByCommits

// const validateCommitsTests = [
//     {
//         commit1: {
//             date: new Date("9/11/2020"),
//         },
//         commit2: {
//             date: new Date("9/11/2020"),
//         },
//         diff: 1,
//         result: true,
//     },
// ];
// describe("Тест validateDiffByCommits", function() {

//     it("Тест валидации по комитам", function() {
//         validateCommits.forEach(function ({commit1, commit2, diff, result}) {
//             assert.deepStrictEqual(result, validateDiffByCommits(commit1, commit2, diff))
//         })
//     });

//   });

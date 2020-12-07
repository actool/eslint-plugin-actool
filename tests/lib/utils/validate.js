const assert = require("assert");
const { validateDiffByDates } = require("../../../lib/utils/validate");

// TEST validateDiffByDates
const validateDaysTests = [
    {
        date1: new Date("9/11/2020"),
        date2: new Date("9/30/2020"),
        diff: 12,
        result: false,
    },
    {
        date1: new Date("9/11/2020"),
        date2: new Date("9/12/2020"),
        diff: 1,
        result: true,
    },
    {
        date1: new Date("9/11/2020"),
        date2: new Date("9/30/2020"),
        diff: 50,
        result: true,
    },
];

describe("validate >> validateDiff", () => {
    it("by dates", () => {
        validateDaysTests.forEach(function ({ date1, date2, diff, result }) {
            assert.deepStrictEqual(result, validateDiffByDates(date1, date2, diff));
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

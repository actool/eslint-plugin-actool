const assert = require("assert");
const { validateDays } = require("../../../lib/rules/utils/fixtures");
const { validateDiffByDates } = require("../../../lib/rules/utils/validate");

// TEST validateDiffByDates

describe("Тест parseLineRevision", function () {
    it("Тест валидации по дате", function () {
        validateDays.forEach(function ({ date1, date2, diff, result }) {
            assert.deepStrictEqual(result, validateDiffByDates(date1, date2, diff));
        });
    });
});

// TEST validateDiffByCommits

// describe("Тест validateDiffByCommits", function() {

//     it("Тест валидации по комитам", function() {
//         validateCommits.forEach(function ({commit1, commit2, diff, result}) {
//             assert.deepStrictEqual(result, validateDiffByCommits(commit1, commit2, diff))
//         })
//     });

//   });

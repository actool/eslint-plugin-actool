const assert = require("assert");
const { validateDays } = require("../../../lib/rules/utils/fixtures");
const { validateDiffByDates } = require("../../../lib/rules/utils/validate");

// TEST validateDiffByDates

describe("validate >> validateDiff", function () {
    it("by dates", function () {
        validateDays.forEach(function ({ date1, date2, diff, result }) {
            assert.deepStrictEqual(result, validateDiffByDates(date1, date2, diff));
        });
    });
    // TODO: it("by commits")
});

// TEST validateDiffByCommits

// describe("Тест validateDiffByCommits", function() {

//     it("Тест валидации по комитам", function() {
//         validateCommits.forEach(function ({commit1, commit2, diff, result}) {
//             assert.deepStrictEqual(result, validateDiffByCommits(commit1, commit2, diff))
//         })
//     });

//   });

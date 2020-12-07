const assert = require("assert");
const { rangeSamples } = require("../../../lib/rules/utils/fixtures");
const { range } = require("../../../lib/rules/utils/array");

// TEST range

describe("array >> range", function () {
    it("by fixtures", function () {
        rangeSamples.forEach(function ({ from, to, array }) {
            assert.deepStrictEqual(array, range(from, to));
        });
    });
});

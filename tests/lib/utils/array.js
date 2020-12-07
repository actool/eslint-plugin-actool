const assert = require("assert");
const { rangeSamples } = require("../../../lib/rules/utils/fixtures");
const { range } = require("../../../lib/rules/utils/array");

// TEST range

describe("Тест parseLineRevision", function () {
    it("Тест передаваемой линии комита из git blame и его парса", function () {
        rangeSamples.forEach(function ({ from, to, array }) {
            assert.deepStrictEqual(array, range(from, to));
        });
    });
});

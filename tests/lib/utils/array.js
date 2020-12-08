const assert = require("assert");
const { range } = require("../../../lib/utils/array");

const rangesTests = [
    {
        from: 0,
        to: 5,
        array: [0, 1, 2, 3, 4],
    },
    {
        from: -3,
        to: -2,
        array: [-3],
    },
    {
        from: -2,
        to: 3,
        array: [-2, -1, 0, 1, 2],
    },
];

describe("array", () => {
    it(">> range", () => {
        rangesTests.forEach(({ from, to, array }) => {
            assert.deepStrictEqual(array, range(from, to));
        });
    });
});

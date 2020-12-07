const assert = require("assert");
const { getDocUrl } = require("../../../lib/utils/get-doc-url");

const fixtures = [
    {
        arg: __filename,
        expected:
            "https://github.com/actool/eslint-plugin-actool/blob/master/docs/rules/get-doc-url.md",
    },
    {
        arg: "some-rule",
        expected:
            "https://github.com/actool/eslint-plugin-actool/blob/master/docs/rules/some-rule.md",
    },
];

describe("getDocUrl >> getDocUrl", () => {
    it("by fixtures", () => {
        fixtures.forEach(({ arg, expected }) => {
            assert.strictEqual(getDocUrl(arg), expected);
        });
    });
});

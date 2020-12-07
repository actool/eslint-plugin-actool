/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relevant-comments");
const RuleTester = require("eslint").RuleTester;
const { getFileFixture } = require("../fixtures/utils");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const { INRELEVANT } = rule.MESSAGES;

/**
 *
 * @param {string} loc loc
 * @param {string} diff diff
 */
const getMessage = (loc, diff) => {
    return {
        lineMin: { messageId: INRELEVANT, data: { scope: "line", by: "min", loc, diff } },
        blockMin: { messageId: INRELEVANT, data: { scope: "block", by: "min", loc, diff } },
        lineCommits: { messageId: INRELEVANT, data: { scope: "line", by: "commits", loc, diff } },
        blockCommits: { messageId: INRELEVANT, data: { scope: "block", by: "commits", loc, diff } },
    };
};

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({
    // Для парсинга типов в TS
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: { ecmaVersion: 2018 },
});

ruleTester.run("relevant-comments", rule, {
    valid: [getFileFixture("tests/lib/fixtures/component.tsx")],
    invalid: [
        {
            options: [
                {
                    line: { disabled: false },
                    module: { disabled: false },
                },
            ],
            errors: [
                getMessage("5", "6").lineMin,
                getMessage("[8-8]", "3").blockMin,
                getMessage("[11-13]", "4").blockMin,
                getMessage("[21-23]", "126").blockCommits,
                getMessage("[21-23]", "45").blockMin,
                getMessage("29", "30").lineMin,
                getMessage("32", "8").lineCommits,
                getMessage("32", "42").lineMin,
            ],
            ...getFileFixture("tests/lib/fixtures/relevant-comments.ts"),
        },
    ],
});

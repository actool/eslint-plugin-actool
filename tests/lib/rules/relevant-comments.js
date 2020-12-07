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
            errors: [
                { message: "For line 5 occurred irrelevant comment by 6 min" },
                { message: "For block [8-8] occurred irrelevant comment by 3 min" },
                { message: "For block [11-13] occurred irrelevant comment by 4 min" },
                { message: "For block [21-23] occurred irrelevant comment by 126 commits" },
                { message: "For block [21-23] occurred irrelevant comment by 45 min" },
                { message: "For line 29 occurred irrelevant comment by 30 min" },
                { message: "For line 32 occurred irrelevant comment by 8 commits" },
                { message: "For line 32 occurred irrelevant comment by 42 min" },
            ],
            ...getFileFixture("tests/lib/fixtures/relevant-comments.ts"),
        },
    ],
});

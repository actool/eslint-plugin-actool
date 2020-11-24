/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relevant-comments-line"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const defaultCode = "console.log('...')";

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 }});
ruleTester.run("relevant-comments-line", rule, {
    valid: [
        {
            code: defaultCode,
            filename: "lib/rules/max-tags-file.js",
        },
        {
            code: defaultCode,
            filename: "docs/rules/max-tags-file.md",
        },
        {
            code: defaultCode,
            filename: "S:/work/com.megapolis/.proj/rms/src/app/store/index.ts",
        }
    ],
    invalid: [
        /* {
            code: defaultCode,
            filename: "...",
            errors: [
                
            ]
        } */
    ],
});

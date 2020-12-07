/**
 * @fileoverview Limit TODO/FIXME tags amount in file
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/max-tags"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const { ERROR_MAX } = rule.MESSAGES;

/**
 *
 * @param {number} actual actual
 * @param {number} max max
 */
const getMessage = (actual, max) => {
    return {
        file: { messageId: ERROR_MAX, data: { scope: "file", actual, max } },
        project: { messageId: ERROR_MAX, data: { scope: "project", actual, max } },
    };
};

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 } });
ruleTester.run("max-tags", rule, {
    valid: [
        `
        console.log("test");
        `,
        `
            // TODO: 1
            console.log("test");
        `,
        `
            // TODO: 1
            /* TODO: 2 */
            // FIXME: 3
            // FIXME: 3
            console.log("test");
        `,
        {
            code: `
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            `,
            options: [
                {
                    file: { disabled: true },
                },
            ],
        },
    ],

    invalid: [
        {
            code: `
            /**
             * TODO: 1
             * FIXME: 1
             */
            function foo () {
                console.log("some-code");
            }
            // TODO: 3
            const capitalize = (str) => {
                if (!str) return;
                return str.charAt(0) + str.slice(1);
            }
            /** TODO: 4 */
            /* TODO: 5 */
            // TODO: 6
            module.exports = {
                capitalize: capitalize,
                foo: foo,
            };
            `,
            errors: [getMessage(6, 4).file],
        },
        {
            code: Array(17)
                .fill("")
                .map(() => "// TODO: ---")
                .join("\n"),
            errors: [getMessage(17, 4).file, getMessage(34, 32).project],
        },
        {
            code: `
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            `,
            errors: [getMessage(5, 4).file],
        },
        {
            code: `
            // FIXME: fixme
            // FIXME: fixme
            `,
            options: [
                {
                    file: { max: 1 },
                },
            ],
            errors: [getMessage(2, 1).file],
        },
    ],
});

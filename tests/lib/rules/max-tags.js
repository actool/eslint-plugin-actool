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

/**
 * Get rule message
 * @param {{
 *  scope: "file" | "project"
 *  occurred: number,
 *  max: number
 * }} arg
 * FIXME: get from rule meta?
 */
const getMessage = ({ scope, occurred, max }) => {
    // eslint-disable-next-line max-len
    return `At ${scope} occured ${occurred} TODO/FIXME tags, but allowed only ${max} - please, resolve or move some tasks to your task-tracker`;
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
            // options: [
            //     {
            //         project: { disabled: true },
            //         file: { max: 6 },
            //     },
            // ],
            errors: [{ message: getMessage({ scope: "file", occurred: 6, max: 4 }) }],
        },
        {
            code: Array(24)
                .fill("")
                .map(() => "// TODO: ---")
                .join("\n"),
            errors: [
                { message: getMessage({ scope: "file", occurred: 24, max: 4 }) },
                { message: getMessage({ scope: "project", occurred: 35, max: 32 }) },
            ],
        },
        {
            code: `
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            // FIXME: fixme
            `,
            errors: [{ message: getMessage({ scope: "file", occurred: 5, max: 4 }) }],
        },
    ],
});

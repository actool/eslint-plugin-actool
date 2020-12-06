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
            errors: [{
                // FIXME: get template from one source?
                message: "At file occured 6 TODO/FIXME tags, but allowed only 4 - please, resolve or move some tasks to your task-tracker",
            }],
            options: [
                {
                    project: { disabled: true },
                    file: { max: 3 },
                }
            ]
        },
        {
            code: Array(24).fill("").map(
                () => "// TODO: ---"
            ).join("\n"),
            errors: [
                { message: "At file occured 24 TODO/FIXME tags, but allowed only 4 - please, resolve or move some tasks to your task-tracker" },
                // FIXME: get template from one source?
                { message: "At project occured 35 TODO/FIXME tags, but allowed only 32 - please, resolve or move some tasks to your task-tracker" },
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
            errors: [
                { message: "At file occured 5 TODO/FIXME tags, but allowed only 4 - please, resolve or move some tasks to your task-tracker" },
            ],
        },
    ]
});

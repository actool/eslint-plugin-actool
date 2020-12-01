/**
 * @fileoverview Limit TODO/FIXME tags amount in file
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/max-tags"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 }});
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
             * FIXME: 6
             */
            function foo () {
                console.log("some-code");
            }
            // TODO: 2
            const capitalize = (str) => {
                if (!str) return;
                return str.charAt(0) + str.slice(1);
            }
            /** TODO: 3 */
            /* TODO: 4 */
            // TODO: 5
            module.exports = {
                capitalize: capitalize,
                foo: foo,
            };
            `,
            errors: [{
                // FIXME: get template from one source?
                message: "Occured 6 TODO/FIXME tags at file, but allowed only 4 per file.\nPlease, resolve some tags or move some task to your task-tracker",
            }]
        }
    ]
});

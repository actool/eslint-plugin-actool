/**
 * @fileoverview limit TODO/FIXME tags in file
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/max-tags-file"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("max-tags-file", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});

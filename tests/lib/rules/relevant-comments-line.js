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
// TODO: get code by filename later
const relevantCommentsCode = `
type DictionariesAPI = {
    getSchedules: () => any;
    getVehicles: () => any;
    getIssueStatuses: () => any;
}

// TODO: fix types
const API = {} as DictionariesAPI;

/**
 * Get schedules from server
 */
const getSharedDictionaries = async () => {
    const { data: schedules } = await API.getSchedules();
    const { data: vehicles } = await API.getVehicles();
    const { data: issueStatuses } = await API.getIssueStatuses();

    return {
        schedules,
        vehicles,
        issueStatuses,
    }
}

/**
 * TODO: simplify fetching
 * FIXME: types
 */
`

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2018 }});
ruleTester.run("relevant-comments-line", rule, {
    valid: [
        // {
        //     code: defaultCode,
        //     filename: "lib/rules/max-tags-file.js",
        // },
        // {
        //     code: defaultCode,
        //     filename: "docs/rules/max-tags-file.md",
        // },
        {
            code: relevantCommentsCode,
            filename: "tests/lib/fixtures/relevant-comments.ts",
        },
        // {
        //     code: defaultCode,
        //     filename: "S:/work/com.megapolis/.proj/rms/src/app/store/index.ts",
        // }
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

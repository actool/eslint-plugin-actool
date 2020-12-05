/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/relevant-comments"),

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
    /** Method comment */
    getIssueStatuses: () => any;
}

// TODO: fix types
const API = {} as DictionariesAPI;

/** data preprocess
 * with a lot of whitespaces
 */



function processData(some: any) {
    return some;
};

/**
 * Get schedules from server
 */
const getSharedDictionaries = async () => {
    /**
     * some note
     * TODO: some todo
     */
    const { data: schedules } = await API.getSchedules();
    const { data: vehicles } = await API.getVehicles();
    // FIXME: optimize
    const { data: issueStatuses } = await API.getIssueStatuses();

    return {
        schedules: processData(schedules),
        vehicles: processData(vehicles),
        issueStatuses: processData(issueStatuses),
    }
}

/**
 * TODO: simplify fetching
 * FIXME: types
 * UPD: new info
 */
`

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({
    // Для парсинга типов в TS
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: { ecmaVersion: 2018 },
});

ruleTester.run("relevant-comments", rule, {
    valid: [
        // {
        //     code: defaultCode,
        //     filename: "lib/rules/max-tags.js",
        // },
        // {
        //     code: defaultCode,
        //     filename: "docs/rules/max-tags.md",
        // },
        // {
        //     code: defaultCode,
        //     filename: "S:/work/com.megapolis/.proj/rms/src/app/store/index.ts",
        // }
    ],
    invalid: [
        {
            code: relevantCommentsCode,
            filename: "tests/lib/fixtures/relevant-comments.ts",
            errors: [
                {
                    message: 'Occured inrelevant comment block',
                    line: 8,
                    column: 1,
                    endLine: 8,
                    endColumn: 19
                }
            ]
        },
        /* {
            code: defaultCode,
            filename: "...",
            errors: [
                
            ]
        } */
    ],
});

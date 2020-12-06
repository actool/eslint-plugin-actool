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
    const { data: schedules } = await API.getSchedules().then((r) => r);
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

// FIXME: temp
const cmdProcessorFilecontent = `
const { get } = require('http');
const { resolve } = require('path');

var exec = require('child_process').exec;


module.exports = async function execCommand(command) {
    return new Promise(function (resolve, reject) {
        exec(
            'pwd',
            {
                cwd: '/home/comp/Documents/Learn/WebLab/eslint-plugin-actool'
            },
            function (err, stdout, stderr) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ stdout, stderr })
                }
        });
    });
    
}
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
        {
            code: cmdProcessorFilecontent,
            filename: "lib/processors/cmd_processor.js",
        },
    ],
    invalid: [
        {
            code: relevantCommentsCode,
            filename: "tests/lib/fixtures/relevant-comments.ts",
            errors: [
                {
                    message: 'At block [22-24] occured inrelevant comment block by 119 commits',
                    line: 22,
                    column: 1,
                    endLine: 24,
                    endColumn: 4
                },
                {
                    message: 'At line 32 occured inrelevant comment by 1 commits',
                    line: 33,
                    column: 5,
                    endLine: 33,
                    endColumn: 10
                },
            ]
        },
    ],
});

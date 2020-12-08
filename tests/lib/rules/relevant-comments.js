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

const { INRELEVANT } = rule.MESSAGES;

/**
 *
 * @param {string} loc loc
 * @param {string} diff diff
 */
const getMessage = (loc, diff) => {
    return {
        lineMin: { messageId: INRELEVANT, data: { scope: "line", by: "min", loc, diff } },
        blockMin: { messageId: INRELEVANT, data: { scope: "block", by: "min", loc, diff } },
        lineCommits: { messageId: INRELEVANT, data: { scope: "line", by: "commits", loc, diff } },
        blockCommits: { messageId: INRELEVANT, data: { scope: "block", by: "commits", loc, diff } },
    };
};

const fixtures = {
    component: getFileFixture("tests/lib/fixtures/component.tsx"),
    versioned: getFileFixture("tests/lib/fixtures/relevant-comments.ts"),
};

/** @remark Storing separately for flex testing */
const errors = {
    component: {},
    versioned: {
        lineMin1: getMessage("5", "6").lineMin,
        blockMin1: getMessage("[8-8]", "3").blockMin,
        blockMin2: getMessage("[11-13]", "4").blockMin,
        blockCom1: getMessage("[21-23]", "126").blockCommits,
        blockMin3: getMessage("[21-23]", "45").blockMin,
        lineMin2: getMessage("29", "30").lineMin,
        lineCom1: getMessage("32", "8").lineCommits,
        lineMin3: getMessage("32", "42").lineMin,
    },
};
/** @remark Storing separately for flex testing */
const options = {
    byDays: { by: "days" },
    byCommit: { by: "commit" },
    disabled: { disabled: true },
    enabled: { disabled: false },
};

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
        fixtures.component,
        // {{scope}}.disabled - none
        {
            options: [{ block: options.disabled }],
            ...fixtures.versioned,
        },
    ],
    invalid: [
        // {{scope}}.disabled - block (commit)
        {
            errors: [errors.versioned.blockCom1],
            ...fixtures.versioned,
        },
        // {{scope}}.disabled - line (commit)
        {
            options: [{ line: options.enabled, block: options.disabled }],
            errors: [errors.versioned.lineCom1],
            ...fixtures.versioned,
        },
        // {{scope}}.disabled - line && block (commit)
        {
            options: [{ line: options.enabled }],
            // NOTE: order is matter
            errors: [errors.versioned.blockCom1, errors.versioned.lineCom1],
            ...fixtures.versioned,
        },
        // {{scope}}.by - block (days)
        {
            options: [{ block: options.byDays }],
            errors: [
                errors.versioned.blockMin1,
                errors.versioned.blockMin2,
                errors.versioned.blockMin3,
            ],
            ...fixtures.versioned,
        },
        // {{scope}}.by - line (days)
        {
            options: [{ line: { ...options.byDays, ...options.enabled }, block: options.disabled }],
            errors: [
                errors.versioned.lineMin1,
                errors.versioned.lineMin2,
                errors.versioned.lineMin3,
            ],
            ...fixtures.versioned,
        },
        // {{scope}}.by - line && block (days)
        {
            options: [{ line: { ...options.byDays, ...options.enabled }, block: options.byDays }],
            // NOTE: order is matter
            errors: [
                errors.versioned.lineMin1,
                errors.versioned.blockMin1,
                errors.versioned.blockMin2,
                errors.versioned.blockMin3,
                errors.versioned.lineMin2,
                errors.versioned.lineMin3,
            ],
            ...fixtures.versioned,
        },
        // {{scope}}.by - line && block (mix)
        {
            options: [{ line: options.enabled, block: options.byDays }],
            // NOTE: order is matter
            errors: [
                errors.versioned.blockMin1,
                errors.versioned.blockMin2,
                errors.versioned.blockMin3,
                errors.versioned.lineCom1,
            ],
            ...fixtures.versioned,
        },
    ],
});

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
        lineMin: { messageId: INRELEVANT, data: { scope: "line", by: "days", loc, diff } },
        blockMin: { messageId: INRELEVANT, data: { scope: "block", by: "days", loc, diff } },
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
        /** line 5 - 6 */
        lineMin1: getMessage("5", "6").lineMin,
        /** block [8-8] - 3 */
        blockMin1: getMessage("[8-8]", "3").blockMin,
        /** block [11-13] - 4 */
        blockMin2: getMessage("[11-13]", "4").blockMin,
        /** block [21-23] - 126 */
        blockCom1: getMessage("[21-23]", "126").blockCommits,
        /** block [21-23] - 11 */
        blockMin3: getMessage("[21-23]", "11").blockMin,
        /** line 29 - 30 */
        lineMin2: getMessage("29", "30").lineMin,
        /** line 32 - 8 */
        lineCom1: getMessage("32", "8").lineCommits,
        /** line 32 - 42 */
        lineMin3: getMessage("32", "42").lineMin,
    },
};
/** @remark Storing separately for flex testing */
const options = {
    byDays: { by: "days" },
    byCommit: { by: "commit" },
    diff1: { diff: 1 },
    diff4: { diff: 4 },
    diff10: { diff: 10 },
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

/**
 * !!! NOTE: After migrating diff logic (from diffMinutes to diffDays)
 * Some tests were crucially broken
 * Cause of these - they while stay commented (WITH OLD indices),
 * BUT LATER - should be converted in more sensitive
 */
ruleTester.run("relevant-comments", rule, {
    valid: [
        // 1. base
        fixtures.component,
        // 2. {{scope}}.disabled - none
        {
            options: [{ block: options.disabled }],
            ...fixtures.versioned,
        },
        // 11. {{scope}}.diff - line // FIXME: MAKE MORE SENSITIVE
        {
            // prettier-ignore
            options: [{ line: { ...options.byDays, ...options.diff10, ...options.enabled }, block: options.disabled }],
            // errors: [
            //     // errors.versioned.lineMin2,
            //     // errors.versioned.lineMin3
            // ],
            ...fixtures.versioned,
        },
        // 7. {{scope}}.by - line (days) // FIXME: MAKE MORE SENSITIVE
        {
            options: [{ line: { ...options.byDays, ...options.enabled }, block: options.disabled }],
            // errors: [
            //     // errors.versioned.lineMin1,
            //     // errors.versioned.lineMin2,
            //     // errors.versioned.lineMin3,
            // ],
            ...fixtures.versioned,
        },
    ],
    invalid: [
        // 3. {{scope}}.disabled - block (commit)
        {
            errors: [errors.versioned.blockCom1],
            ...fixtures.versioned,
        },
        // 4. {{scope}}.disabled - line (commit)
        {
            options: [{ line: options.enabled, block: options.disabled }],
            errors: [errors.versioned.lineCom1],
            ...fixtures.versioned,
        },
        // 5. {{scope}}.disabled - line && block (commit)
        {
            options: [{ line: options.enabled }],
            // NOTE: order is matter
            errors: [errors.versioned.blockCom1, errors.versioned.lineCom1],
            ...fixtures.versioned,
        },
        // 6. {{scope}}.by - block (days) // FIXME: MAKE MORE SENSITIVE
        {
            options: [{ block: options.byDays }],
            errors: [
                // errors.versioned.blockMin1,
                // errors.versioned.blockMin2,
                errors.versioned.blockMin3,
            ],
            ...fixtures.versioned,
        },
        // 8. {{scope}}.by - line && block (days) // FIXME: MAKE MORE SENSITIVE
        {
            options: [{ line: { ...options.byDays, ...options.enabled }, block: options.byDays }],
            // NOTE: order is matter
            errors: [
                // errors.versioned.lineMin1,
                // errors.versioned.blockMin1,
                // errors.versioned.blockMin2,
                errors.versioned.blockMin3,
                // errors.versioned.lineMin2,
                // errors.versioned.lineMin3,
            ],
            ...fixtures.versioned,
        },
        // 9. {{scope}}.by - line && block (mix) // FIXME: MAKE MORE SENSITIVE
        {
            options: [{ line: options.enabled, block: options.byDays }],
            // NOTE: order is matter
            errors: [
                // errors.versioned.blockMin1,
                // errors.versioned.blockMin2,
                errors.versioned.blockMin3,
                errors.versioned.lineCom1,
            ],
            ...fixtures.versioned,
        },
        // 10. {{scope}}.diff - block // FIXME: MAKE MORE SENSITIVE
        {
            options: [{ block: { ...options.byDays, ...options.diff4 } }],
            errors: [
                // errors.versioned.blockMin2,
                errors.versioned.blockMin3,
            ],
            ...fixtures.versioned,
        },
    ],
});

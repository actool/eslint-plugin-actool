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

/**
 * @type {import("eslint").RuleTester}
 */
const ruleTester = new RuleTester({
    // Для парсинга типов в TS
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: { ecmaVersion: 2018 },
});

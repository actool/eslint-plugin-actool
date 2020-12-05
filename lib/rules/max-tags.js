/**
 * @fileoverview Limit TODO/FIXME tags amount in file
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const TAGS = [
    "TODO",
    "FIXME",
];

/**
 * @typedef {"file" | "project"} Scope
 */
/**
 * @typedef ScopeParams
 * @property {number} max Max allowed TOOD/FIXME tags
 */
/**
 * @typedef {{ [key in Scope]: ScopeParams | null }} RuleParams
 */

/** 
 * @params default
 * @type {RuleParams}
 */
const __default = {
    project: {
        max: 32,
    },
    file: {
        max: 4
    },
};

const __project = {
    occured: 0,
    notified: false
}

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 */
function create(context) {
    const code = context.getSourceCode();
    /** @type {RuleParams} */
    const options = { ...__default, ...context.options };
    const { project, file } = options;

    // FIXME: simplify? (by code#getAllComments)
    const fileOccured = code.lines.filter((line) => TAGS.some((tag) => line.includes(tag))).length;
    __project.occured += fileOccured;

    // scope: file
    if (file !== null && fileOccured > file.max) {
        context.report({
            message: `At file occured ${fileOccured} TODO/FIXME tags, but allowed only ${file.max} - please, resolve or move some tasks to your task-tracker`,
            loc: code.getLocFromIndex(0),
        })
    }
    // scope: project
    if (project !== null && !__project.notified && __project.occured > project.max) {
        __project.notified = true;
        context.report({
            message: `At project occured ${__project.occured} TODO/FIXME tags, but allowed only ${project.max} - please, resolve or move some tasks to your task-tracker`,
            loc: code.getLocFromIndex(0),
        })
    }

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
        // give me methods
    };
}

/**
 * @type {import("eslint").Rule.RuleMetaData}
 */
const meta = {
    docs: {
        description: "Limit TODO/FIXME tags amount in file",
        recommended: true,
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
        // fill in your schema
    ]
};

module.exports = { create, meta };

/**
 * @fileoverview Limit TODO/FIXME tags amount in file
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Options Definition
//------------------------------------------------------------------------------

/**
 * FIXME: add customizing?
 */
const TAGS = ["TODO", "FIXME"];

/**
 * @type {import("./types").MaxTagsOptions}
 */
const __default = {
    project: {
        max: 32,
        disabled: false,
    },
    file: {
        max: 4,
        disabled: false,
    },
};

const __project = {
    occured: 0,
    notified: false,
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 */
function create(context) {
    const code = context.getSourceCode();
    if (context.options.length) {
        console.log("[DEBUG-ONLY] OCCURED CUSTOM OPTIONS");
    }
    /** @type {RuleParams} */
    const project = { ...__default.project, ...(context.options[0] || {}).project };
    const file = { ...__default.file, ...(context.options[0] || {}).file };

    /**
     * NOTE: `code#getAllComments` not used, cause of in this case required double-nested reduce handler
     * (what more difficult to unsterstand and maintain)
     * @optimizable iterating by comments
     */
    const fileOccured = code.lines.filter((line) => TAGS.some((tag) => line.includes(tag))).length;
    __project.occured += fileOccured;

    // scope: file
    if (file && fileOccured > file.max) {
        context.report({
            message: `At file occured ${fileOccured} TODO/FIXME tags, but allowed only ${file.max} - please, resolve or move some tasks to your task-tracker`,
            loc: code.getLocFromIndex(0),
        });
    }
    // scope: project
    if (project && !__project.notified && __project.occured > project.max) {
        __project.notified = true;
        context.report({
            message: `At project occured ${__project.occured} TODO/FIXME tags, but allowed only ${project.max} - please, resolve or move some tasks to your task-tracker`,
            loc: code.getLocFromIndex(0),
        });
    }

    return {
        // give me methods
    };
}

/**
 * @return {import("json-schema").JSONSchema4}
 */
const getScopeSchema = ({ description, max, disabled = false }) => ({
    type: "object",
    description,
    properties: {
        max: {
            type: "number",
            default: max,
            description: "Max allowed TOOD/FIXME tags",
        },
        disabled: {
            type: "boolean",
            default: disabled,
            description: "Is scope disabled",
        },
    },
});

/**
 * @type {import("json-schema").JSONSchema4[]}
 */
const schema = [
    {
        type: "object",
        description: "Limit TODO/FIXME tags amount in file",
        properties: {
            project: getScopeSchema({ max: 32, disabled: false, description: "Scope: Project" }),
            file: getScopeSchema({ max: 4, disabled: false, description: "Scope: File" }),
        },
    },
];

/**
 * @type {import("eslint").Rule.RuleMetaData}
 */
const meta = {
    docs: {
        description: "Limit TODO/FIXME tags amount in file",
        recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: schema,
};

module.exports = { create, meta };

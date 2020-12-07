/**
 * @fileoverview Limit TODO/FIXME tags amount in file
 * @author Ilya Azin
 */
"use strict";

/**
 * TODO: decompose with separate module
 * - rule.js
 * - schema.js
 * - types.d.ts
 * - index.js
 */

const defaults = require("json-schema-defaults");
const { getDocUrl } = require("../utils/get-doc-url");

//------------------------------------------------------------------------------
// Meta Definition
//------------------------------------------------------------------------------

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
    additionalProperties: false,
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
        additionalProperties: false,
    },
];

const MESSAGES = {
    ERROR_MAX: "ERROR_MAX",
};

/**
 * @type {import("eslint").Rule.RuleMetaData}
 */
const meta = {
    type: "suggestion",
    docs: {
        description: "Limit TODO/FIXME tags amount in file",
        recommended: true,
        url: getDocUrl(__filename),
    },
    fixable: null,
    schema,
    messages: {
        // eslint-disable-next-line max-len, prettier/prettier
        [MESSAGES.ERROR_MAX]: "At {{scope}} occured {{actual}} TODO/FIXME tags, but allowed only {{max}} (resolve or register)",
    },
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
// FIXME: add customizing?
const TAGS = ["TODO", "FIXME"];
/** @type {import("./types").MaxTagsOptions} */
const __default = defaults(schema[0]);
const __project = {
    occured: 0,
    notified: false,
};

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 */
function create(context) {
    const code = context.getSourceCode();
    /** @type {import("./types").MaxTagsOptions} */
    const { file, project } = { ...__default, ...(context.options[0] || {}) };

    /**
     * NOTE: `code#getAllComments` not used, cause of in this case required double-nested reduce handler
     * (what more difficult to unsterstand and maintain)
     * @optimizable iterating by comments
     */
    const fileOccured = code.lines.filter((line) => TAGS.some((tag) => line.includes(tag))).length;
    if (!project.disabled) __project.occured += fileOccured;

    // scope: file
    if (!file.disabled && fileOccured > file.max) {
        context.report({
            messageId: MESSAGES.ERROR_MAX,
            loc: code.getLocFromIndex(0),
            data: {
                scope: "file",
                actual: String(fileOccured),
                max: String(file.max),
            },
        });
    }
    // scope: project
    if (!project.disabled && !__project.notified && __project.occured > project.max) {
        __project.notified = true;
        context.report({
            messageId: MESSAGES.ERROR_MAX,
            loc: code.getLocFromIndex(0),
            data: {
                scope: "project",
                actual: String(__project.occured),
                max: String(project.max),
            },
        });
    }

    return {};
}

module.exports = { create, meta, MESSAGES };

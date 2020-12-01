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

// FIXME: temp
const DEFAULT_MAX_TAGS = 4;
let maxTags = DEFAULT_MAX_TAGS;

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 */
function create(context) {
    const code = context.getSourceCode();
    if (context.options.length > 0) {
        maxTags = context.options[0];
    }

    // FIXME: simplify? (by code#getAllComments)
    const taggedLines = code.lines.filter(
        (line) => TAGS.some(
            (tag) => line.includes(tag)
        )
    );
    const tagsAmount = taggedLines.length;

    if (tagsAmount > maxTags) {
        context.report({
            message: `Occured ${tagsAmount} TODO/FIXME tags at file, but allowed only ${maxTags} per file.\nPlease, resolve some tags or move some task to your task-tracker`,
            loc: code.getLocFromIndex(0),
            data: {
                occuredTags: tagsAmount.toString(),
                maxTags: maxTags.toString(),
            }
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

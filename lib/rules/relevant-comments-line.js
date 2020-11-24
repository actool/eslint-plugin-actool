/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const { getCommitByLine, parseCommit } = require("./utils/git-access");

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 */
function create(context) {
    const code = context.getSourceCode();
    const filename = context.getFilename();
    // const scope = context.getScope();

    if (context.options.length > 0) {
        // specify params here
    }

    const commitRaw = getCommitByLine({ path: filename, lineNumber: 1 });
    const commit = parseCommit(commitRaw);
    const day = commit.date.getUTCDate();
    // FIXME: mock logic
    if (day === 17) {
        context.report({
            message: "Occured inrelevant comment block",
            loc: code.getLocFromIndex(0),
            // data: {
            //     occuredTags: tagsAmount.toString(),
            //     maxTags: maxTags.toString(),
            // }
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
        description: "Validate relevanting of line's comment doclet",
        recommended: true,
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
        // fill in your schema
    ]
};

module.exports = { create, meta };

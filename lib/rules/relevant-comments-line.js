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
    const comments = code.getAllComments();

    // const scope = context.getScope();

    if (context.options.length > 0) {
        // specify params here
    }

    comments.forEach((comment, index) => {
        const commentCommit = getCommitByLine({ 
            path: filename, 
            lineNumber: comment.loc.start.line
        });
        // FIXME: temp!!! (iter by nodes later)
        const codeCommit = getCommitByLine({ 
            path: filename, 
            lineNumber: comment.loc.start.line + 1
        });

        // FIXME: temp!!!
        const diffByDate = Math.abs(commentCommit.date.getMinutes() - codeCommit.date.getMinutes());
        // const day = commentCommit.date.getUTCDate();
        console.log({ index, comment: commentCommit.date, code: codeCommit.date });
        // FIXME: mock logic
        if (diffByDate > 1) {
            context.report({
                message: "Occured inrelevant comment block",
                loc: comment.loc,
                // data: {
                //     occuredTags: tagsAmount.toString(),
                //     maxTags: maxTags.toString(),
                // }
            })
        }
    })


    // TODO: iter by nodes
    // TODO: get lastCommitDate from each block (not first line)
    /**
     * 
     * @type {import("eslint").Rule.NodeListener["CallExpression"]}
     */
    const checkNode = (node) => {
        const { callee } = node;
        const { leadingComments, trailingComments } = node;
        const comments = code.getComments(node);
        console.log(comments.length, node);
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
        // FunctionExpression: checkNode,
        // FunctionDeclaration: checkNode,
        // Identifier: checkNode,
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

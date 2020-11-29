/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const revision = require("./utils/revision");

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 */
function create(context) {
    const code = context.getSourceCode();
    const filename = context.getFilename();

    // FIXME: simplify type casting
    const { block } = context.getScope();
    if (block.type !== "Program") return;

    if (context.options.length > 0) {
        // TODO: specify params here
    }

    /**
     * It was decided to iterate by block instead of comments, because
     * detect comment for block is more easier and reliable than backward
     * TODO: add memoizing of file commits (as total cache?)
     * TODO: use `checkNode` for **any** declarations instead of iterating?
     */
    block.body.forEach((statement) => {
        // NOTE: detecting relevant node (if need)
        // const node = code.getNodeByRangeIndex(statement.range[0]);
        const comments = code.getCommentsBefore(statement);
        // NOTE: maybe will be specified
        const comment = comments[0];
        if (!comment) return;

        const commentCommit = revision.getBlockLastCommit({ file: filename, loc: comment.loc });
        const codeCommit = revision.getBlockLastCommit({ file: filename, loc: statement.loc });

        // FIXME: temp!!!
        const diffByDate = Math.abs(commentCommit.date.getMinutes() - codeCommit.date.getMinutes());
        // const day = commentCommit.date.getUTCDate();
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
    });
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

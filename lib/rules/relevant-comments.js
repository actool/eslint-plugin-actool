/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

const revision = require("./utils/revision");

//------------------------------------------------------------------------------
// Options Definition
//------------------------------------------------------------------------------

/**
 * @typedef {"line" | "block" | "module"} Scope
 */
/**
 * @typedef ScopeParams
 * @property {"commit" | "days"} by Specify base validating entity
 * @property {number} diff Allowable diff between commits/days (for validating)
 */
/**
 * @typedef {{ [key in Scope]: ScopeParams | null }} RuleParams
 */

/** 
 * @defaultParams
 * @type {RuleParams}
 */
const __default = {
    line: null,
    block: {
        by: "commit",
        diff: 4,
    },
    module: null,
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
    const filename = context.getFilename();

    /** @type {RuleParams} */
    const options = { ...__default, ...context.options };
    const scope = context.getScope();

    /**
     * It was decided to iterate by block instead of comments, because
     * detect comment for block is more easier and reliable than backward
     * TODO: add memoizing of file commits (as total cache?)
     * TODO: use `checkNode` for **any** declarations instead of iterating?
     * FIXME: simplify type casting
     */
    if (options.block !== null && scope.block.type === "Program") {
        scope.block.body.forEach((statement) => {
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
                    message: `Occured inrelevant comment block ${(diffByDate / 60 * 24).toFixed(1)} days`,
                    loc: comment.loc,
                })
            }
        });
    }

    return {

    }
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

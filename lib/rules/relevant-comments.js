/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

const revision = require("./utils/revision");
const { getCommitsDiff } = require("./utils/commits-distance");

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
    line: {
        by: "commit",
        diff: 4,
    },
    // block: null,
    // line: null,
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
    const file = context.getFilename();
    const comments = code.getAllComments();

    /** @type {RuleParams} */
    const options = { ...__default, ...context.options };
    const scope = context.getScope();

    // FIXME: simplify type casting
    if (scope.block.type !== "Program") return;

    /**
     * It was decided to iterate by block instead of comments, because
     * detect comment for block is more easier and reliable than backward
     * TODO: add memoizing of file commits (as total cache?)
     * TODO: use `checkNode` for **any** declarations instead of iterating?
     */
    scope.block.body.forEach((statement) => {
        if (statement.type === "EmptyStatement") return;
        // scope: line
        if (options.line) {
            const innerComments = code.getCommentsInside(statement);
            innerComments.forEach((innerComment) => {
                const tokenAfter = code.getTokenAfter(innerComment);
                const commentCommit = revision.getBlockLastCommit({ file, loc: innerComment.loc });
                const lineCommit = revision.getLineCommit({ file, line: tokenAfter.loc.start.line - 1 });

                const diffByDate = Math.abs(lineCommit.date.getMinutes() - commentCommit.date.getMinutes());
                const diffByCommits = getCommitsDiff(commentCommit, lineCommit);
                if (diffByCommits >= 2) {
                    context.report({
                        message: `At line ${lineCommit.line} occured inrelevant comment ${(diffByDate / (60 * 24)).toFixed(1)} days`,
                        loc: tokenAfter.loc,
                    })
                }
            })   
        }
        // scope: block
        if (options.block) {
            // NOTE: detecting relevant node (if need)
            // const node = code.getNodeByRangeIndex(statement.range[0]);
            const comments = code.getCommentsBefore(statement);
            // NOTE: maybe will be specified
            const comment = comments[0];
            if (!comment) return;
    
            const commentCommit = revision.getBlockLastCommit({ file, loc: comment.loc });
            const codeCommit = revision.getBlockLastCommit({ file, loc: statement.loc });
    
            // FIXME: temp!!!
            const diffByDate = Math.abs(codeCommit.date.getMinutes() - commentCommit.date.getMinutes());
            const diffByCommits = getCommitsDiff(commentCommit, codeCommit);
            // const day = commentCommit.date.getUTCDate();
            // FIXME: mock logic
            if (diffByDate > 1) {
                context.report({
                    message: `At block [${comment.loc.start.line}-${comment.loc.end.line}] Occured inrelevant comment block ${(diffByDate / (60 * 24)).toFixed(1)} days`,
                    loc: comment.loc,
                })
            }
        }
    });


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

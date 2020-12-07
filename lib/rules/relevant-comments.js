/**
 * @fileoverview Validate relevanting of line's comment doclet
 * @author Ilya Azin
 */
"use strict";

const revision = require("../utils/revision");
const { getCommitsDiff } = require("../utils/commits-distance");

//------------------------------------------------------------------------------
// Meta Definition
//------------------------------------------------------------------------------

const MESSAGES = {
    INRELEVANT: "INRELEVANT",
};

/**
 * @type {import("eslint").Rule.RuleMetaData}
 */
const meta = {
    docs: {
        description: "Validate relevanting of line's comment doclet",
        recommended: true,
    },
    fixable: null,
    schema: [
        // fill in your schema
    ],
    messages: {
        // eslint-disable-next-line max-len, prettier/prettier
        [MESSAGES.INRELEVANT]: "For {{scope}} {{loc}} occurred irrelevant comment by {{diff}} {{by}}"
    },
};

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
        diff: 1,
    },
    // FIXME: return back null value
    // line: null
    block: {
        by: "days",
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

    // !!! FIXME: temp, remove try-catch later
    try {
        /** @type {RuleParams} */
        const options = { ...__default, ...context.options[0] };
        const scope = context.getScope();

        // FIXME: simplify type casting
        if (scope.block.type !== "Program") return;

        /**
         * It was decided to iterate by block instead of comments, because
         * detect comment for block is more easier and reliable than backward
         * TODO: add memoizing of file commits (as total cache?)
         * TODO: use `checkNode` for **any** declarations instead of iterating?
         */
        scope.block.body.forEach((statement, index) => {
            console.log(
                `RELEVANT-COMMENT: [${index}] ${statement.loc.start.line}-${statement.loc.end.line}`,
            );
            if (statement.type === "EmptyStatement") return;
            // scope: line
            if (options.line) {
                const innerComments = code.getCommentsInside(statement);
                console.log(`   > line >> comments amount === ${innerComments.length}`);
                innerComments.forEach((innerComment) => {
                    const tokenAfter = code.getTokenAfter(innerComment);
                    const commentCommit = revision.getBlockLastCommit({
                        file,
                        loc: innerComment.loc,
                    });
                    const lineCommit = revision.getLineCommit({
                        file,
                        line: tokenAfter.loc.start.line,
                    });

                    // FIXME: later will be compute by days
                    const diffByDate = Math.abs(
                        lineCommit.date.getMinutes() - commentCommit.date.getMinutes(),
                    );
                    const diffByCommits = getCommitsDiff(commentCommit, lineCommit);
                    console.log(
                        `           >> diff >> commits=${diffByCommits}, date=${diffByDate}`,
                    );
                    // FIXME[#30]: diff will be specified later by options
                    if (diffByCommits >= 1) {
                        console.log("           LINE-COMMITS:REPORT");
                        context.report({
                            messageId: MESSAGES.INRELEVANT,
                            loc: tokenAfter.loc,
                            data: {
                                scope: "line",
                                loc: `${lineCommit.line}`,
                                diff: `${diffByCommits}`,
                                by: "commits",
                            },
                        });
                    }
                    if (diffByDate >= 1) {
                        console.log("           LINE-DATE:REPORT");
                        // FIXME: later will be compute by days
                        context.report({
                            messageId: MESSAGES.INRELEVANT,
                            loc: tokenAfter.loc,
                            data: {
                                scope: "line",
                                loc: `${lineCommit.line}`,
                                diff: `${diffByDate.toFixed(0)}`,
                                by: "min",
                            },
                        });
                    }
                });
            }
            // scope: block
            if (options.block) {
                // NOTE: detecting relevant node (if need)
                // const node = code.getNodeByRangeIndex(statement.range[0]);
                const comments = code.getCommentsBefore(statement);
                console.log(`   > block >> comments amount === ${comments.length}`);
                // NOTE: maybe will be specified
                const comment = comments[0];
                if (!comment) return;

                const commentCommit = revision.getBlockLastCommit({ file, loc: comment.loc });
                const codeCommit = revision.getBlockLastCommit({ file, loc: statement.loc });

                // FIXME: temp!!!
                // FIXME: later will be compute by days
                const diffByDate = Math.abs(
                    codeCommit.date.getMinutes() - commentCommit.date.getMinutes(),
                );
                const diffByCommits = getCommitsDiff(commentCommit, codeCommit);
                console.log(`           >> diff >> commits=${diffByCommits}, date=${diffByDate}`);
                // FIXME[#30]: diff will be specified later by options
                if (diffByCommits >= 1) {
                    console.log("           BLOCK-COMMITS:REPORT");
                    context.report({
                        messageId: MESSAGES.INRELEVANT,
                        loc: comment.loc,
                        data: {
                            scope: "block",
                            loc: `[${comment.loc.start.line}-${comment.loc.end.line}]`,
                            diff: `${diffByCommits}`,
                            by: "commits",
                        },
                    });
                }
                if (diffByDate >= 1) {
                    console.log("           BLOCK-DATE:REPORT");
                    context.report({
                        messageId: MESSAGES.INRELEVANT,
                        loc: comment.loc,
                        data: {
                            scope: "block",
                            loc: `[${comment.loc.start.line}-${comment.loc.end.line}]`,
                            diff: `${diffByDate.toFixed(0)}`,
                            by: "min",
                        },
                    });
                }
            }
            // TODO: scope: module
        });
    } catch (e) {
        console.error(
            `Failed to analyze ${file}.\n TIP: Please, send log and screen of trouble file in issue of eslint-plugin-actool =)`,
            JSON.stringify(e),
        );
    }

    return {};
}

module.exports = { create, meta, MESSAGES };

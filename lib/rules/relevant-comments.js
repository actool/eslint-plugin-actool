/**
 * @fileoverview Validate relevanting of line's comment doclet
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
const revision = require("../utils/revision");
const { getCommitsDiff } = require("../utils/diff-commit");
const { computeDiffByDays } = require("../utils/diff-date");

//------------------------------------------------------------------------------
// Meta Definition
//------------------------------------------------------------------------------

/** @return {import("json-schema").JSONSchema4} */
// FIXME: temp, add later diff = 4
const getScopeSchema = ({ description, by = "commit", diff = 1, disabled = false }) => ({
    type: "object",
    description,
    properties: {
        by: {
            enum: ["commit", "days"],
            default: by,
            description: "Specify base validating entity",
        },
        diff: {
            type: "number",
            default: diff,
            description: "Allowable diff between commits/days (for validating)",
        },
        disabled: {
            type: "boolean",
            default: disabled,
            description: "Is scope disabled",
        },
    },
    additionalProperties: false,
});

/** @type {import("json-schema").JSONSchema4[]} */
const schema = [
    {
        type: "object",
        description: "Validate relevanting of line's comment doclet",
        properties: {
            line: getScopeSchema({ description: "Scope: Line", disabled: true }),
            block: getScopeSchema({ description: "Scope: Block" }),
            module: getScopeSchema({ description: "Scope: Module", disabled: true }),
        },
        additionalProperties: false,
    },
];

const MESSAGES = {
    INRELEVANT: "INRELEVANT",
};

/** @type {import("eslint").Rule.RuleMetaData} */
const meta = {
    type: "suggestion",
    docs: {
        description: "Validate relevanting of line's comment doclet",
        recommended: true,
    },
    fixable: null,
    schema,
    messages: {
        // eslint-disable-next-line max-len, prettier/prettier
        [MESSAGES.INRELEVANT]: "For {{scope}} {{loc}} occurred irrelevant comment by {{diff}} {{by}}"
    },
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import("./types").RelevantCommentsOptions} */
const __default = defaults(schema[0]);

// DEBUG: let __counter = 0;

/* eslint-disable max-lines-per-function */

/**
 * @param {import("eslint").Rule.RuleContext} context
 * @return {import("eslint").Rule.RuleListener}
 * !!! FIXME: temp, decompose!!! refactor!
 */
function create(context) {
    // DEBUG: console.log(">>>>>", ++__counter);

    const code = context.getSourceCode();
    const file = context.getFilename();

    // !!! FIXME: temp, remove try-catch later
    try {
        /** @type {import("./types").RelevantCommentsOptions} */
        const options = { ...__default, ...(context.options[0] || {}) };

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
            if (!options.line.disabled) {
                const innerComments = code.getCommentsInside(statement);
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

                    const diffByDate = computeDiffByDays(commentCommit.date, lineCommit.date);
                    const diffByCommits = getCommitsDiff(commentCommit, lineCommit);
                    if (options.line.by === "commit" && diffByCommits >= options.line.diff) {
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
                    if (options.line.by === "days" && diffByDate >= options.line.diff) {
                        // FIXME: later will be compute by days
                        context.report({
                            messageId: MESSAGES.INRELEVANT,
                            loc: tokenAfter.loc,
                            data: {
                                scope: "line",
                                loc: `${lineCommit.line}`,
                                diff: `${diffByDate.toFixed(0)}`,
                                by: "days",
                            },
                        });
                    }
                });
            }
            // scope: block
            if (!options.block.disabled) {
                // NOTE: detecting relevant node (if need)
                // const node = code.getNodeByRangeIndex(statement.range[0]);
                const comments = code.getCommentsBefore(statement);
                // NOTE: maybe will be specified
                const comment = comments[0];
                if (!comment) return;

                const commentCommit = revision.getBlockLastCommit({ file, loc: comment.loc });
                const codeCommit = revision.getBlockLastCommit({ file, loc: statement.loc });

                const diffByDate = computeDiffByDays(commentCommit.date, codeCommit.date);
                const diffByCommits = getCommitsDiff(commentCommit, codeCommit);
                if (options.block.by === "commit" && diffByCommits >= options.block.diff) {
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
                if (options.block.by === "days" && diffByDate >= options.block.diff) {
                    context.report({
                        messageId: MESSAGES.INRELEVANT,
                        loc: comment.loc,
                        data: {
                            scope: "block",
                            loc: `[${comment.loc.start.line}-${comment.loc.end.line}]`,
                            diff: `${diffByDate.toFixed(0)}`,
                            by: "days",
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

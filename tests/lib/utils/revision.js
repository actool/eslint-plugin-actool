const assert = require("assert");
const util = require("../../../lib/utils/revision");

const file = "tests/lib/fixtures/relevant-comments.ts";

const commits = {
    // prettier-ignore
    "d302a167": { hash: "d302a167", author: "Ilya Azin", date: new Date("2020-11-24 15:57:22 +0300") },
    // prettier-ignore
    "01ce8bcc": { hash: "01ce8bcc", author: "Ilya Azin", date: new Date("2020-12-05 23:51:57 +0300") },
    // prettier-ignore
    "950d2454": { hash: "950d2454", author: "Ilya Azin", date: new Date("2020-11-24 15:54:03 +0300") },
    // prettier-ignore
    "9b4d9454": { hash: "9b4d9454", author: "Ilya Azin", date: new Date("2020-11-29 06:37:24 +0300") },
    // prettier-ignore
    "0414d1a3": { hash: "0414d1a3", author: "Ilya Azin", date: new Date("2020-11-29 05:41:26 +0300") },
};

describe("revision", () => {
    it(">> parseLineRevision", () => {
        const tests = [
            {
                revision: `b6988094 (Ilya Azin 2020-11-02 09:51:49 +0300  1) import React from "react";`,
                // prettier-ignore
                expected: { hash: "b6988094", author: "Ilya Azin", date: new Date("2020-11-02 09:51:49 +0300"), line: 1 }, // eslint-disable-line max-len
            },
            {
                revision: `e411fb43 (Ilya Azin 2020-11-29 06:52:45 +0300 20)     "publish:minor": "npm version minor && npm publish",`, // eslint-disable-line max-len
                // prettier-ignore
                expected: { hash: "e411fb43", author: "Ilya Azin", date: new Date("2020-11-29 06:52:45 +0300"), line: 20 }, // eslint-disable-line max-len
            },
        ];
        tests.forEach(({ revision, expected }) => {
            const actual = util.parseLineRevision(revision);
            assert.deepStrictEqual(actual, expected);
        });
    });
    it(">> getLineRevision", () => {
        const tests = [
            // prettier-ignore
            { line: 1, file, expected: "d302a167 (Ilya Azin 2020-11-24 15:57:22 +0300 1) type DictionariesAPI = {" },
            // prettier-ignore
            { line: 4, file, expected: "01ce8bcc (Ilya Azin 2020-12-05 23:51:57 +0300 4)     /** Method comment */" },
            // prettier-ignore
            { line: 8, file, expected: "950d2454 (Ilya Azin 2020-11-24 15:54:03 +0300 8) // TODO: fix types" },
            // prettier-ignore
            { line: 11, file, expected: "9b4d9454 (Ilya Azin 2020-11-29 06:37:24 +0300 11) /** data preprocess" },
            // prettier-ignore
            { line: 17, file, expected: "0414d1a3 (Ilya Azin 2020-11-29 05:41:26 +0300 17) function processData(some: any) { " }, // eslint-disable-line max-len
            // prettier-ignore
            { line: 22, file, expected: "950d2454 (Ilya Azin 2020-11-24 15:54:03 +0300 22)  * Get schedules from server" }, // eslint-disable-line max-len
            // prettier-ignore
            { line: 24, file, expected: "d302a167 (Ilya Azin 2020-11-24 15:57:22 +0300 24) const getSharedDictionaries = async () => {" }, // eslint-disable-line max-len
        ];

        tests.forEach(({ line, file, expected }) => {
            const actual = util.getLineRevision({ file, line });
            assert.strictEqual(actual.trim(), expected.trim());
        });
    });
    it(">> getLineCommit", () => {
        const tests = [
            { line: 1, file, expected: commits.d302a167 },
            { line: 4, file, expected: commits["01ce8bcc"] },
            { line: 8, file, expected: commits["950d2454"] },
            { line: 11, file, expected: commits["9b4d9454"] },
            { line: 17, file, expected: commits["0414d1a3"] },
            { line: 22, file, expected: commits["950d2454"] },
            { line: 24, file, expected: commits.d302a167 },
        ];

        tests.forEach(({ line, file, expected }) => {
            const actual = util.getLineCommit({ file, line });
            assert.deepStrictEqual(actual, { ...expected, line });
        });
    });
});

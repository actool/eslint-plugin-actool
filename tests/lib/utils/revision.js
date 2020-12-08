const assert = require("assert");
// var sinon = require('sinon');
const revision = require("../../../lib/utils/revision");
const { lineRevisionFullData } = require("../fixtures/data/revisions");

const file = "tests/lib/fixtures/relevant-comments.ts";

const fixtures = [
    // prettier-ignore
    { line: 1, file, rev: "d302a167 (Ilya Azin 2020-11-24 15:57:22 +0300 1) type DictionariesAPI = {" },
    // prettier-ignore
    { line: 4, file, rev: "01ce8bcc (Ilya Azin 2020-12-05 23:51:57 +0300 4)     /** Method comment */" },
    // prettier-ignore
    { line: 8, file, rev: "950d2454 (Ilya Azin 2020-11-24 15:54:03 +0300 8) // TODO: fix types" },
    // prettier-ignore
    { line: 11, file, rev: "9b4d9454 (Ilya Azin 2020-11-29 06:37:24 +0300 11) /** data preprocess" },
    // prettier-ignore
    { line: 17, file, rev: "0414d1a3 (Ilya Azin 2020-11-29 05:41:26 +0300 17) function processData(some: any) { " }, // eslint-disable-line max-len
    // prettier-ignore
    { line: 22, file, rev: "950d2454 (Ilya Azin 2020-11-24 15:54:03 +0300 22)  * Get schedules from server" },
    // prettier-ignore
    { line: 24, file, rev: "d302a167 (Ilya Azin 2020-11-24 15:57:22 +0300 24) const getSharedDictionaries = async () => {" }, // eslint-disable-line max-len
];

describe("revision", () => {
    it(">> parseLineRevision", () => {
        lineRevisionFullData.forEach(({ line, data }) => {
            const actual = revision.parseLineRevision(line);
            assert.deepStrictEqual(actual, data);
        });
    });
    it(">> getLineRevision", () => {
        fixtures.forEach(({ line, file, rev }) => {
            const actual = revision.getLineRevision({ file, line });
            assert.deepStrictEqual(actual.trim(), rev.trim());
        });
    });
});

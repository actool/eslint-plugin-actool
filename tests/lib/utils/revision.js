const assert = require("assert");
// var sinon = require('sinon');
const revision = require("../../../lib/utils/revision");
const { lineRevisionFullData } = require("../fixtures/data/revisions");

// Не работают моки, чтобы подменить getLineRevision
// describe("Тест getLineCommit", function() {

//     it("Тест функции по получению данных о строке файла по комиту", function() {
//         var fake = sinon.fake.returns('f9b16819 (Ilya Azin 2020-11-16 01:49:33 +0300 2)   "name": "eslint-plugin-actool",');
//         sinon.replace(revision, 'getLineRevision', fake);
//         let v = revision.getLineCommit({line: '1', file: '2'});
//         assert.strictEqual(v, 'exp');
//     });

//   });

// TEST parseLineRevision

describe("revision >> parseLineRevision", () => {
    it("by fixtures", () => {
        lineRevisionFullData.forEach(({ line, data }) => {
            const d = revision.parseLineRevision(line);
            assert.deepStrictEqual(d, data);
        });
    });
});

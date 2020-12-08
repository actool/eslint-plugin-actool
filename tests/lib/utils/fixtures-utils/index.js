const assert = require("assert");
const { getFileContent, getFileFixture } = require("../../fixtures/utils");

// TODO: add tests
const tests = [
    {
        path: "tests/lib/fixtures/hoc.fixture.js",
        content: `import { compose } from "shared/helpers";
import withApollo from "./with-apollo";
import withRouter from "./with-router";
import withAntd from "./with-antd";

/**
 * @hoc Инициализирующая логика приложения
 * @remark Содержит:
 * - логику инициализации antd (withAntd)
 * - логику подключения к API (withApollo)
 * - логику инициализации роутера (withRouter)
 */
export const withHocs = compose(withAntd, withRouter, withApollo);
`,
    },
];

describe("fixtures/utils", () => {
    it(">> getFileContent", () => {
        tests.forEach(({ path, content }) => {
            assert.strictEqual(getFileContent(path), content);
        });
    });
    it(">> getFileFixture", () => {
        tests.forEach(({ path, content }) => {
            const expected = { code: content, filename: path };
            assert.deepStrictEqual(getFileFixture(path), expected);
        });
    });
});

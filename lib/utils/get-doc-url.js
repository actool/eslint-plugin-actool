"use strict";
const path = require("path");

const repoUrl = "https://github.com/actool/eslint-plugin-actool";

/**
 * Get rule documentation url
 * @param {string} filename
 */
const getDocUrl = (filename) => {
    const ruleName = path.basename(filename, ".js");
    return `${repoUrl}/blob/master/docs/rules/${ruleName}.md`;
};

module.exports.getDocUrl = getDocUrl;

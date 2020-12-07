const { get } = require("http");
const { resolve } = require("path");

const exec = require("child_process").exec;

module.exports = async function execCommand(command) {
    return new Promise(function (resolve, reject) {
        exec(
            "pwd",
            {
                cwd: "/home/comp/Documents/Learn/WebLab/eslint-plugin-actool",
            },
            function (err, stdout, stderr) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ stdout, stderr });
                }
            },
        );
    });
};

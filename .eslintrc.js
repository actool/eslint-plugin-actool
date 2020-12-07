// TODO: add @typescript-eslint

module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        sourceType: "module",
    },
    env: {
        browser: true,
        es6: true,
        amd: true,
        node: true,
        mocha: true,
    },
    plugins: [],
    extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
    rules: {
        // variables
        "prefer-const": 2,
        "no-var": 2,
        // base
        "camelcase": [1, { ignoreDestructuring: true, ignoreImports: true, properties: "never" }],
        "no-else-return": 2,
        "max-len": [1, { code: 120 }],
        "dot-notation": 2,
        "eol-last": 2,
        // alert, console
        "no-alert": 2,
        "no-console": 0,
        // equals
        "eqeqeq": 1,
        "no-eq-null": 2,
        // function
        "max-params": [1, 2],
        "max-lines-per-function": [1, 100],
        "arrow-parens": [2, "always"],
        "prefer-arrow-callback": 2,
        // TODO: add other plugins (unicorn, ...)
    },
};

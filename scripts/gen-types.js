const { compile } = require("json-schema-to-typescript");
const { rules } = require("../lib");
const { writeFileSync } = require("fs");

/**
 * Settings
 */
const SCRIPT_LABEL = "[🛠️  gen-types] ";
const PAD = 24;
/**
 * Logs helpers
 */
/** @param {string} message */
const print = (message) => process.stdout.write(message);
const println = (message) => print(`${message}\n`);
const withLabel = (message) => `${SCRIPT_LABEL}${message}`;

/**
 * JSDoc types generating
 * @see https://bcherny.github.io/json-schema-to-typescript-browser/
 * @see https://www.npmjs.com/package/json-schema-to-typescript
 */
async function main() {
    println(withLabel("Starting..."));
    const ruleNames = Object.keys(rules);
    for (const ruleName of ruleNames) {
        print(withLabel(`> ${ruleName.padEnd(PAD, " ")}`));
        await generateTypesForRule(ruleName);
    }
}

/**
 * Generate types for specific rule
 * @param {string} ruleName
 */
async function generateTypesForRule(ruleName) {
    /** @type {import("eslint").Rule.RuleModule} */
    const { meta } = rules[ruleName];
    const { schema } = meta;

    if (!schema || !schema.length) {
        println("❌ (not schema provided)");
        return;
    }

    await compile(schema[0], `${ruleName}Options`)
        .then((genTypes) => {
            writeFileSync("lib/rules/types.d.ts", genTypes);
            println("✔️");
        })
        .catch(() => {
            println(`❌ (compilation error)`);
        });
}

main();

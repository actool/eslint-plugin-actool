# [eslint-plugin-actool](https://www.npmjs.com/package/eslint-plugin-actool)

<!-- FIXME: simplify -->
<!-- see: https://gist.github.com/ChrisTollefson/a3af6d902a74a0afd1c2d79aadc9bb3f -->

[d:contributing]: https://github.com/actool/eslint-plugin-actool/blob/master/CONTRIBUTING.md
[d:howit]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md
[d:faq]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/faq.md
[d:plans]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/plans.md
[d:overview]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/overview.md
[d:overview#todos]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/overview.md#todos-chaos
[d:overview#comments]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/overview.md#comments-relevancy
[d:overview#rubbish]: https://github.com/actool/eslint-plugin-actool/blob/master/docs/overview.md#rubbish-code
[rules]: https://github.com/actool/eslint-plugin-actool/tree/master/docs/rules
[r:max-tags]: https://github.com/actool/eslint-plugin-actool/tree/master/docs/rules/max-tags.md
[r:relevant-comments]: https://github.com/actool/eslint-plugin-actool/tree/master/docs/rules/relevant-comments.md
[r:no-commented-code]: https://github.com/actool/eslint-plugin-actool/tree/master/docs/rules/no-commented-code.md
[issues]: https://github.com/actool/eslint-plugin-actool/issues

![Version](https://img.shields.io/github/package-json/v/actool/eslint-plugin-actool)
![npm](https://img.shields.io/npm/dw/eslint-plugin-actool)
![npm bundle size](https://img.shields.io/bundlephobia/min/eslint-plugin-actool)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Factool%2Feslint-plugin-actool&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/actool/eslint-plugin-actool)
<!-- ![GitHub top language](https://img.shields.io/github/languages/top/actool/eslint-plugin-actool) -->
<!-- [![GitHub license](https://img.shields.io/github/license/actool/eslint-plugin-actool)](https://github.com/actool/eslint-plugin-actool/blob/master/LICENSE) -->

<!-- TODO: https://shields.io/category/build -->
<!-- TODO: https://shields.io/category/coverage -->
<!-- TODO: https://shields.io/category/analysis -->
<!--TODO ![CI](https://github.com/actool/eslint-plugin-actool/workflows/CI/badge.svg?branch=master) -->

<img src="https://avatars2.githubusercontent.com/u/74495859?s=200&v=4" height="120" align="right">

Actool rules for ESLint to validate code / comments actuality and relevance.

- 💥 Control **[TODOs chaos][d:overview#todos]**
- ⏲️ Control **[comments actuality][d:overview#comments]**
- ☢️ Control **[rubbish code][d:overview#rubbish]**

<!-- TODO [**Propose or contribute a new rule ➡**](.github/contributing.md) -->
> **DISCLAIMER**: Work in process, and for a while - here is *approximate* description

> **DISCLAIMER**: Work in process, and cause of it - there are a lot of bugs =)
> First stable version will be signed as **0.1.0**

<!-- NOTE: uncomment later if needed
## Table of contents

<!--ts-- >
   * [Usage](#usage)
   * [Rules](#rules)
   * [Also](#also)
<!--te-- > 
-->

## Usage
> **Requirement:** Make sure your repository has *git history*

* 💫 Refer to our [overiew doc][d:overview] for **quick explanation of features and conception**
* If you don't have ESLint yet configured for your project, follow [these instructions](https://github.com/eslint/eslint#installation-and-usage).
* Install `eslint-plugin-actool` using `npm` (or `yarn`) for you project or globally:

```sh
$ npm install eslint-plugin-actool -D  # install for your project as devDep
$ npm install eslint-plugin-actool -g  # or install globally
```

* Add `eslint-plugin-actool` to the `plugins` option of your `.eslintrc`:

```js
{
  "plugins": ["actool"]
}
```

* Add `plugin:actool/recommended` to the `extends` option to enable all recommended rules:

```js
{
  "extends": ["plugin:actool/recommended"]
}
```

* or enable only some rules manually:

```js
{
  "rules": {
    "actool/max-tags": 2,
    "actool/relevant-comments": 2,
    // etc.
  }
}
```

## Rules

- [`max-tags`][r:max-tags] - limit TODO/FIXME tags
   > scope: *file*, *project*
- [`relevant-comments`][r:relevant-comments] - validate relevanting of comment doclet with corresponding code statement
   > scope: *line*, *block*, *module*
- [`no-commented-code`][r:no-commented-code] - limit commented code usage and storing

> [More details][d:howit]

## Also
- You want to participate in the development of the project? Have a look at our [contributing][d:contributing] guide!
   > Commit like nobody sees, Push like nobody hears
- Found the bug / potential improvement ? [Let us know =)][issues]
- [Overview][d:overview]
- [How it work][d:howit]
- [FAQ][d:faq]
- [Project plans][d:plans]

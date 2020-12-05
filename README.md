# [eslint-plugin-actool](https://www.npmjs.com/package/eslint-plugin-actool)

![Version](https://img.shields.io/github/package-json/v/actool/eslint-plugin-actool)
![npm](https://img.shields.io/npm/dw/eslint-plugin-actool)
![npm bundle size](https://img.shields.io/bundlephobia/min/eslint-plugin-actool)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Factool%2Feslint-plugin-actool&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
![GitHub top language](https://img.shields.io/github/languages/top/actool/eslint-plugin-actool)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/actool/eslint-plugin-actool)
[![GitHub license](https://img.shields.io/github/license/actool/eslint-plugin-actool)](https://github.com/actool/eslint-plugin-actool/blob/master/LICENSE)

<!-- TODO: https://shields.io/category/build -->
<!-- TODO: https://shields.io/category/coverage -->
<!-- TODO: https://shields.io/category/analysis -->
<!--TODO ![CI](https://github.com/actool/eslint-plugin-actool/workflows/CI/badge.svg?branch=master) -->

<img src="https://avatars2.githubusercontent.com/u/74495859?s=200&v=4" height="120" align="right">

Actool rules for ESLint to validate code / comments actuality and relevance.

- 🚀 Control **[TODOs chaos](/docs/overview.md#todos-chaos)**
- 🚀 Control **[comments actuality](/docs/overview.md#comments-relevancy)**
- 🚀 Control **[rubbish code](/docs/overview.md#rubbish-code)**

<!-- TODO [**Propose or contribute a new rule ➡**](.github/contributing.md) -->
> **DISCLAIMER**: Work in process, and for a while - here is *approximate* description

> **GET STARTED:** Refer to our [overiew doc](/docs/overview.md) for quick explanation of features and motivation

## Table of contents

<!--ts-->
   * [Usage](#usage)
   * [Rules](#rules)
   * [Also](#also)
<!--te-->

## Usage
> **Requirement:** Make sure your repository have the *git history*

* If you don't have ESLint yet configured for your project, follow [these instructions](https://github.com/eslint/eslint#installation-and-usage).
* Install `eslint-plugin-actool` using `npm` (or `yarn`) for you project or globally:

```sh
npm install eslint-plugin-actool --save-dev # install for your project
npm install eslint-plugin-actool -g         # or install globally
```

* Add `eslint-plugin-actool` to the `plugins` option of your `.eslintrc`:

```json
{
  "plugins": ["actool"]
}
```

* **(WIP)** Add `plugin:actool/recommended` to the `extends` option to enable all recommended rules:

```json
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

- [`max-tags`](docs/rules/max-tags.md) - limit TODO/FIXME tags
   > scope: *file*, *project*
- [`relevant-comments`](docs/rules/relevant-comments.md) - validate relevanting of comment doclet with corresponding code statement
   > scope: *line*, *block*, *module*
- [`no-commented-code`](docs/rules/no-commented-code.md) - limit commented code usage and storing

> [More details](/docs/how-it-work.md)

## Also
- You want to participate in the development of the project? Have a look at our [contributing](CONTRIBUTING.md) guide!
   > Commit like nobody sees, Push like nobody hears
- Found the bug / potential improvement ? [Let us know =)](https://github.com/actool/eslint-plugin-actool/issues)
- [Overview](/docs/overview.md)
- [How it work](/docs/how-it-work.md)
- [FAQ](/docs/faq.md)
- [Project plans](/docs/plans.md)

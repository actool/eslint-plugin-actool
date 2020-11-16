# eslint-plugin-actool

<!-- TODO: add badges -->

<img src="https://avatars2.githubusercontent.com/u/74495859?s=200&v=4" height="120" align="right">

Actool rules for ESLint to validate code / comments actuality and relevance.

- Control **TODOs chaos**
- Control **comments actuality**
- Control **rubbish code**

<!-- TODO [**Propose or contribute a new rule ➡**](.github/contributing.md) -->
> **DISCLAIMER**: Work in process, and for a while - here is *approximate* description

## Table of contents

<!--ts-->
   * [Overview](#overview)
   * [Installation](#installation)
   * [Supported Rules](#supported-rules)
   * [Also](#also)
<!--te-->

## Overview
> *"Code never lies, comments sometimes do." - Ron Jeffries*

Actool provides tools **for validating comments** in code - *based on your config, code and commits history.*

<!--TODO diff + ts highlighting -->

Tool was conceived to solve following problems:
- Comments for code block *loses their actuality fastly* - during developing (becomes *irrelevant*)
```diff
 /**
- * Get schedules from server
  */
+ const getSharedDictionaries = async () => {
      const { data: schedules } = await API.getSchedules();
+     const { data: vehicles } = await API.getVehicles();
+     const { data: issueStatuses } = await API.getIssueStatuses();
  }
```
- Sometimes few parts of *code stay commented*. And after long time it might confuse you and your colleagues when you'll return to this block
```diff
 return (
     <div className="toolbar">
         <Button onClick={handleRefresh}>Refresh</Button>
-        {/* <Button onClick={() => dispatch(deleteEntity()))}>Delete</Button> */}
-        {/* <Button onClick={handleAdd}>Add</Button> */}
     </div>
 )
```
- After a while of your projects started - *there are a lot of `fixme` / `todo` tags*, what hard to control and track during dev
```ts
// TODO: loading logic
// FIXME: temp logic, specify
// FIXME: invalid behaviour, fix later
```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-actool`:

```
$ npm install eslint-plugin-actool --save-dev
```


## Usage

Add `actool` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "actool"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "actool/rule-name": 2
    }
}
```

## Supported Rules

- See [supported rules](/docs/README.md)

## Also
- You want to participate in the development of the project? Have a look at our [contributing](./CONTRIBUTING.md) guide!
   > Commit like nobody sees, Push like nobody hears
- [Team](./DEV.md#team)
- [Plans](./DEV.md#plans)
- [FAQ](./FAQ.md)



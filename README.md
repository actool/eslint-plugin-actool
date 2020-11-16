# eslint-plugin-actool

<!-- TODO: add badges -->

<img src="https://avatars2.githubusercontent.com/u/74495859?s=200&v=4" height="120" align="right">

Actool rules for ESLint to validate code / comments actuality and relevance.

- Control **TODOs chaos**
- Control **comments actuality**
- Control **rubbish code**

<!-- TODO [**Propose or contribute a new rule ➡**](.github/contributing.md) -->

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

* Fill in provided rules here


## Rules

> Later, will be splitted by files `/docs/rules/{rule}.md`

### TODOs/FIXMes chaos
- `max-tags-file` - limit TODO/FIXME tags in file
- `max-tags-project` - limit TODO/FIXME tags in project
   
### Comments actuality
- `relevant-comments-block` - validate relevanting of block's comment doclet
- `relevant-comments-line` - validate relevanting of line's comment doclet
- `relevant-comments-module` - validate relevanting of module's comment doclet

### Rubbish code
- `no-commented-code` - limit commented code usage and storing





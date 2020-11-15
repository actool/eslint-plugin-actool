# eslint-plugin-actool

Toolkit for code / comments actuality and relevance checking

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






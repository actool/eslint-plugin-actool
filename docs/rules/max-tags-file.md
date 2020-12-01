# Limit TODO/FIXME tags amount in file (max-tags-file)

<!-- Please describe the origin of the rule here. -->


## Rule Details

This rule aims to limit TODO/FIXME tags amount in file

Examples of **incorrect** code for this rule:

```js
// --- Less or equal `max` value (default=4)

// TODO: 1
...
/* FIXME: 1 */
...
// FIXME: 2
...
/**
 * TODO: 4
 */
...
```

Examples of **correct** code for this rule:

```js
// --- Greater `max` value (default=4)

// TODO: 1
...
/* FIXME: 1 */
...
// FIXME: 2
...
/**
 * TODO: 4
 */
// --- To much tags!
/**
 * TODO: 5
 */
/**
 * TODO: 6
 */
...
```

### Options

- apply this rule by `scope` option:
    - `file` - to specific files
    - `project` - to whole project
- `maxTags` - maximum allowed tags `number` at file

```js
// The example
"actool/max-tags-file": {
    'scope': 'project',
    'maxTags': 5
}
```

## When Not To Use It

In cases, when growing of TODO/FIXME tags isn't problem for your project or when it's part of your workflow.

## Further Reading

- https://github.com/actool/eslint-plugin-actool/issues/16

<!-- TODO: add links to TODO/FIXME chaos problem -->

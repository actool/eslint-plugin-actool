# Limit TODO/FIXME tags amount in file (max-tags)

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

> While not work =(

- `maxTags` - maximum allowed tags at file
```js
// To enable only 2 TODO/FIXME tags at file
"actool/max-tags": [2, 2],
// To disable any tags at file
"actool/max-tags": [2, 0],
```

## When Not To Use It

In cases, when growing of TODO/FIXME tags isn't problem for your project or when it's part of your workflow.

## Further Reading

- https://github.com/actool/eslint-plugin-actool/issues/16

<!-- TODO: add links to TODO/FIXME chaos problem -->

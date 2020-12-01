# `max-tags`

Limit TODO/FIXME tags amount in file

## Rule Details

This rule aims to limit TODO/FIXME tags amount in file

### Fail

```js
// --- Greater `max` value (for example - 4 for file scope)

// TODO: 1
...
/* FIXME: 2 */
...
// FIXME: 3
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

### Pass

```js
// --- Less or equal `max` value (for example - 4 for file scope)

// TODO: 1
...
/* FIXME: 2 */
...
// FIXME: 3
...
/**
 * TODO: 4
 */
...
```

## Options

> **WIP**: For a while - aren't available

### `scope`
Controls the rule behaviour for specific scope
- **file** - at each file level
- **project** - at whole project level

```js
// disable max-tags linting for file (or project)
"actool/max-tags": [2, { file: null }] // or { project: null }
// customize options for specific scope
"actool/max-tags": [2, { 
    file: { ... }, // file scope config
    project: { ... } // project scope config
] 
```
<details>
    <summary>defaultValue</summary>

    {
        file: null,
        project: { ... }, // see below
    }
</details>


### `max`
Max allowed tags amount in *{scope}*

```js
// specify max tags for project (or file) scope
"actool/max-tags": [2, { 
    project: { max: 24 }
}]
```
<details>
    <summary>defaultValue</summary>

    file: null
    project: 32
</details>

## When Not To Use It

In cases, when growing of TODO/FIXME tags isn't problem for your project or when it's part of your workflow.

## Further Reading

- https://github.com/actool/eslint-plugin-actool/issues/16
- https://github.com/actool/eslint-plugin-actool#todos-chaos

<!-- TODO: add links to TODO/FIXME chaos problem -->

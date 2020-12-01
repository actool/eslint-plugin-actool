# `relevant-comments`

**Validate relevanting of line&#39;s comment doclet**

During the developement you may want to have specific block of code to have being reviewed by actool


## Rule Details

This rule aims to control [relevancy and actuality](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#relevancy-validating) of your code

```js
/**                                    // comment block lastCommit: A            
 * Get schedules from server
 * TODO: some subtask
 */
const getSharedDictionaries = () => {  // code block lastCommit: B
```

### Fail
```js
// You can specify allowed commits diff by options (see below)

if (diffCommits(A, B) > 4)

// or by dates if specified
// if (diffDates(A.date, B.date) > 4)
```

### Pass
```js
// You can specify allowed commits diff by options (see below)

if (diffCommits(A, B) <= 4)

// or by dates if specified
// if (diffDates(A.date, B.date) <= 4)
```

## Options

> **WIP**: For a while - aren't available

### `scope`
Controls the rule behaviour for specific scope
- [**line**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#line-comment) - for each line

- [**block**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#block-comment) - for each code block

- [**module**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#module-comment) - for each module

```js
// disable relevancy linting for line / block / module scopes
"actool/relevant-comments": [2, { line: null }] // or { block: null } or { module: null }
// customize options for specific scope
"actool/relevant-comments": [2, { 
    line: { ... }, // line scope config
    block: { ... } // block scope config
    module: { ... } // module scope config
] 
```
<details>
    <summary>defaultValue</summary>

    {
        line: null,
        block: { ... }, // see below
        module: null,
    }
</details>

### `by`
Specify base validating entity
- [**commit**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#commit) - diff by commits
- [**days**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#days-experimental) - diff by days
  > experimental
  
```js
"actool/relevant-comments": [2, { 
    block: { by: "days" }
}]
```
<details>
    <summary>defaultValue</summary>

    [any-scope]: commit
</details>

### `diff`
Allowable diff between commits/days (for validating)

> Counting only **relevant for current block** commits (days)

```js
"actool/relevant-comments": [2, { 
    block: { diff: 8 }
}]
```
<details>
    <summary>defaultValue</summary>

    [any-scope]: 4
</details>

## When Not To Use It
If no need to keep comments in actual state with corresponding code

## FAQ
### I have `actool/relevant-comments` alert but how can I fix it?
We stick the idea, that **developer should update comments often as possible**

Cause of it - every alert *suggests* you to refresh your comment content
> Just update your comment any rational method

## Further Reading
- https://github.com/actool/eslint-plugin-actool/issues/25
- https://github.com/actool/eslint-plugin-actool#comments-relevancy

<!-- TODO: add links about problem -->

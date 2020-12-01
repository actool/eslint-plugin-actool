# WIP: `no-commented-code`

Limit commented code usage and storing

```js
"actool/no-commented-code": [<severity>, {
    <options>
}
```


## Rule Details

This rule aims to control [commented code](https://github.com/actool/eslint-plugin-actool#rubbish-code) in your project

```js
// commented block lastCommit: A 
// code block lastCommit: B

 return (
     <div className="toolbar">
         <Button onClick={handleRefresh}>Refresh</Button>
-        {/* <Button onClick={() => dispatch(deleteEntity()))}>Delete</Button> */}
-        {/* <Button onClick={handleAdd}>Add</Button> */}
     </div>
 )
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

- With `when` option you specify 
  + `always` - default
  + `expired

### `when`
When validator should be raised

- **always** - commented code prohibited anywhere
- **expired** - commented code prohibited if commits (dates) diff is violated
  
```js
"actool/no-commented-code": [2, { when: "expired" }]
```
<details>
    <summary>defaultValue</summary>

    "always"
</details>

### `by`
Specify base validating entity
- [**commit**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#commit) - diff by commits
- [**days**](https://github.com/actool/eslint-plugin-actool/blob/master/docs/how-it-work.md#days-experimental) - diff by days
  > experimental
  
```js
"actool/no-commented-code": [2, { by: "days" }]
```
<details>
    <summary>defaultValue</summary>

    "commit"
</details>

### `diff`
Acceptable difference between the number of commits (in days) of the "live" code and the commented out

> Counting only **relevant for current block** commits (days)

```js
"actool/no-commented-code": [2, { diff: 8 }]
```
<details>
    <summary>defaultValue</summary>

    4
</details>


## Further reading
- https://github.com/actool/eslint-plugin-actool/issues/39
- https://github.com/actool/eslint-plugin-actool#rubbish-code

<!-- TODO: add links about problem -->

## Types of processed comments

### Line comment
Per each **code line**

<details>
   
```js
/** line-comment */
const a = ...
// line-comment
if (someStament)
/**
 * line-comment
 */
state.value = ...
```

```js
// TODO rename to ...  - this line is being reviewed
let a = Object()

// FIXME ...
let foo = function() {  // this function isn't, but with `block` option would be
    ...
}
```
</details>

### Block comment
Per each **code block**

<details>
   
```js
/** block-comment */
const someFun = () => {
   ...
}
// block-comment
type SomeType = {
   ...
}
/**
 * block-comment
 */
function someFun = () => {
  ...
}
```

```js
// TODO ...  - this block is being reviewed
let foo = function() {  // this block of code is being reviewed
    ...
}
```
</details>

### Module comment
Per each **code module**

<details>

```js
import ... from ...
import ... from ...

// TODO: common module comment

/**
 * Some common description of module
 * module-comment
 */
 
/** other comment */
const A = () => ...
```

```js
// #file.js  -  this module is being reviewed

// TODO ...  - this line is being reviewed
let a = Object()

// FIXME -  this block is being reviewed
let foo = function() {  // this function isn't, but with `block` option would be
    ...
}
```
</details>

## Relevancy validating

```js
/**                                    // comment block lastCommit: **commit1**
 * Get schedules from server
 * TODO: some subtask
 */
const getSharedDictionaries = () => {  // code block lastCommit: **commit2**
```
```js
validateDiff(commit1: Commit, commit2: Commit, diff: number): boolean
validateDiff(date1: Date, date2: Date, diff: number): boolean
```

<a href="https://ibb.co/kKQVqYw"><img src="https://i.ibb.co/kKQVqYw/67538-Image-889x474-Color.png" alt="67538-Image-889x474-Color" border="0"></a>

### Validating entities
#### Commit
By history intermediate commits

```js
if (validateDiff(commit1, commit2, diff)
```

#### Days (experimental)
By trivial days comparsion

```js
if (validateDiff(commit1.date, commit2.date, diff))
```

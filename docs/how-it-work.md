## Types of processed comments

### Line comment
Per each **code line**

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

### Block comment
Per each **code block**

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

### Module comment
Per each **code module**

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

## Relevancy validating

<a href="https://ibb.co/kKQVqYw"><img src="https://i.ibb.co/kKQVqYw/67538-Image-889x474-Color.png" alt="67538-Image-889x474-Color" border="0"></a>
# Validate relevanting of line&#39;s comment doclet (relevant-comments)

During the developement you may want to have specific block of code to have being reviewed by actool


## Rule Details

This rule let you specify which blocks of code you'd want to check for comments

### Options

- With `scope` option you specify which blocks of code  are ought to be reviewed:
  + `line`
  + `block`
  + `module`

```js
// The example
"actool/relevant-comments-line": {
    'scope': [
        'line',
        'block',
    ]
}
```

**line**
Example of code with `line` option:

```js
// TODO rename to ...  - this line is being reviewed
let a = Object()

// FIXME ...
let foo = function() {  // this function isn't, but with `block` option would be
    ...
}
```

**block**
Example of code with `block` option:

```js
// TODO ...  - this block is being reviewed
let foo = function() {  // this block of code is being reviewed
    ...
}
```

**module**
Example of code with `module` option:

```js
// #file.js  -  this module is being reviewed

// TODO ...  - this line is being reviewed
let a = Object()

// FIXME -  this block is being reviewed
let foo = function() {  // this function isn't, but with `block` option would be
    ...
}
```
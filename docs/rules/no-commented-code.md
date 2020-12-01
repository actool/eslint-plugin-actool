# Limit commented code usage and storing

You need to have specific revieving date logic for your code

## Rule Details

This rule let you specify the properties when youre code needs to be affected

### Options

- With `when` option you specify when validator is raised:
  + `always` - default
  + `expired`
- With `by` option you do the same thing, but by the difference of:
  + `commits` - number of last related to the appropriate block of code commits 
  + `days` - number of days related to the appropriate block of code commits 
- With `diff` option you specify the `number` of acceptable difference between the number of commits (in days) of the "live" code and the commented out

```js
// The example
"actool/no-commented-code": {
    'by': 'commits',
}
```
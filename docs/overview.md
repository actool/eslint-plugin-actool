# Overview

## Motivation
> *"Code never lies, comments sometimes do." - Ron Jeffries*

Actool provides tools **for validating comments** in code - *based on your config, code and commits history.*

<!--TODO diff + ts highlighting -->

Tool was conceived to solve following problems:

### Comments relevancy
Comments for code block *loses their actuality fastly* - during developing (becomes *irrelevant*)
```diff
 /**
- * Get schedules from server
  */
+ const getSharedDictionaries = async () => {
      const { data: schedules } = await API.getSchedules();
+     const { data: vehicles } = await API.getVehicles();
+     const { data: issueStatuses } = await API.getIssueStatuses();
  }
```

> Related rules: [`relevant-comments`](https://github.com/actool/eslint-plugin-actool/blob/master/docs/rules/relevant-comments.md)

### Rubbish code
Sometimes few parts of *code stay commented*. And after long time it might confuse you and your colleagues when you'll return to this block
```diff
 return (
     <div className="toolbar">
         <Button onClick={handleRefresh}>Refresh</Button>
-        {/* <Button onClick={() => dispatch(deleteEntity()))}>Delete</Button> */}
-        {/* <Button onClick={handleAdd}>Add</Button> */}
     </div>
 )
```

> Related rules: [`no-commented-code`](https://github.com/actool/eslint-plugin-actool/blob/master/docs/rules/no-commented-code.md)

### TODOS chaos
After a while of your projects started - *there are a lot of `fixme` / `todo` tags*, what hard to control and track during dev
```ts
// TODO: loading logic
// FIXME: temp logic, specify
// FIXME: invalid behaviour, fix later
```

> Related rules: [`max-tags`](https://github.com/actool/eslint-plugin-actool/blob/master/docs/rules/max-tags.md)

## Conception
Long time it was open question

> User receive "actool/..." alert but how can he (or she) can fix it?

We stick the idea, that **developer should update comments often as possible**

Cause of it - every alert *suggests* you to refresh your comment content
> Just update your comment any rational method

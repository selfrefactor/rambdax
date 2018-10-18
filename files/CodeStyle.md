# Code style

General tips for React and Javascript programming

## `{{theme}}` folder naming pattern

Lke in `lint-fn` we have `isReact`, `isJest`, `isSaga` functions.

In this case a folder named `is` is created and there is file called `jest.js`

`jest.js` exports method `{{theme}}FILENAME`, i.e. `isJest`

```javascript
exports.isJest = filePath => {
  if(filePath.endsWith('spec.jsx')) return true
  if(filePath.endsWith('spec.js')) return true

  return false
}
```

The pattern is sutable for cases like `sagas`, `epics`.

## `input*` pattern

It makes easier to see which one is the input argument.
With plain `input` are either the root input or the only input in the scope.

```
function foo(input){
  const barInput = {
    a: 1,
    b: 2
  }
  const barResult = bar(barInput)
}
```

## `*x` pattern

Use it in `package.json` to define script `foox` that is similar to `foo`

```
{
  "do": "node files/do",
  "dox": "NODE_ENV=test node files/do",
}
```

## `ok*` pattern

Make `if` statement or ternary operations more readable. Used exclusively in this context.

Also it is very clear that `ok` variables are `boolean` type. 

```javascript
const ok = foo.a && (foo.b > 1 || foo.b === 2)

if(!ok) return
```

```javascript
render(){
  const ok = this.props.store.loaded && this.props.store.initLoaded
  const okLogged = ok && this.props.store.logged

  if(!ok) return <div>Loading...</div>
  if(!okLogged) return <div>You need to login</div>
  
  return <div>Master of puppets</div>
}
```

## Maybe pattern

It signifies that there is uncertainty about getting the correct data. 

It may imply that there will be `if` check before assigning `foo` to be `maybeFoo` 

```javascript
const maybeResult = await getResult()

if(!maybeResult) return
```

## Line breaks as Chinese fast food

Each line break represents end of the menthal **bite** that the reader should handle as a whole:

```javascript
export const sharedSpeakEpic = (
  action$: ActionsObservable<SharedSpeakAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(SHARED_SPEAK)
    .filter(() => !busy)
    .switchMap(action => 
      new Observable(observer => {
        busy = true

        const { fromLanguage, toLanguage } = getCommons(store)
        const { name } = store.getState().store

        const nameAsProperty = `${camelCase(name)}Store`
        const currentInstance = (store.getState())[nameAsProperty].currentInstance
```


## Rules

- Order reducers according to their execution time:

```javascript
    case SELECT_ARTICLE_INIT_READY:
      return {
        ...
      }
    case SELECT_ARTICLE_NEXT_READY:
      return {
        ...
      }
    case SELECT_ARTICLE_CLICK_READY:
```

- Append `READY` to Redux action to indicate the effect of this action

```javascript
  SELECT_ARTICLE_CLICK,
  SELECT_ARTICLE_CLICK_READY,
  SELECT_ARTICLE_INIT,
  SELECT_ARTICLE_INIT_READY,
  SELECT_ARTICLE_NEXT,
  SELECT_ARTICLE_NEXT_READY,
```

- Use `a,b,c` or `first,second,third` to name different parts of long string templates 

`
const a = `<Route${pad}component={${componentName}}`
const b = `exact={true}${pad}path='/${path}'${padShort}/>`

const route = `${a}${pad}${b}`
`

- prefer more generic variable names

```
/**
* using more generic `content`
* instead of `combinedReducersContent`
* has its benefits
*/
const content = readFileSync(input.combinedReducersLocation).toString()
```


- Prefer `ok` or descriptive variables in `if` evaluation

```
const hasMarker = typingsContent.includes(GET_STATE_MARKER)
const withoutGetState = !typingsContent.includes(getStateStatement)

const ok = hasMarker && withoutGetState 

if (ok) {
  ...
}

// OR

if (hasMarker && withoutGetState) {
  ...
}

```

- Use only dot case as user input in CLI apps

- Multilines imports are separated

```
import {
  camelCase,
  constantCase,
  pascalCase,
} from 'string-fn'

import {
  ACTION_INTERFACES_MARKER,
  CONSTANTS_MARKER,
  GET_STATE_MARKER,
  INJECT_COMPONENT_MARKER,
} from './../constants'
```

## Comments

- Comments start with capital case

```
 /**
 * If starter action is `result` related, use it as it is
 */
```

- Comments require empty line before

- No fullstop in comments but comma is allowed

- Variables are referenced with backticks

- High chance of comment block before if/else statements

## Empty lines

### if/else

> Simple case
```
...

if(x<1){
  y = 2
}else{
  y = 3
}

...
```


> Multiple lines inside
```
...

if(x<1){

  y = 2
  z = 3
  q = 4
}else{

  y = 3
  z = 5
}

let typingsContent

if (input.storeType !== 'ROOT_STORE') {

  typingsContent = replace(
    INJECT_COMPONENT_MARKER,
    propsTypingsTemplate(input),
    typingsContent,
  )  
}


...
```

## Logic

### Use xInstance to loop over x list 

### Use *Result to name result of a function call

```
const maskSentenceResult = maskSentence(x)
```

### Use *Raw when variable need normalization

```
const xRaw = await getData()
const x = R.produce(produceFn, xRaw)
```
> use *Value if you need one more step of normalization

### Payload as any vs Payload as object

If action payload pass just a single value, then it is not needed to be wrapped inside an object.

### *currentIndex* to loop through `DBInstance` list

### Use *Module when exported method and library method match

Example:
```
import {
  maskSentence as maskSentenceModule,
} from 'string-fn'

export function maskSentence(input: string): string[] {
  const {
    hidden,
    visible,
  } = maskSentence(input)

  return hidden
}

```

### Ready vs Active

**Ready** is used in single application to indicate that rendering can happen.

**Active** is used in the context of navigation, but it could be used for general flags, such as `text-to-speech`.

## Documentation

Each folder has its own `Readme.md` if the project is complex enough.

### Main `Readme.md`

Main `Readme.md`(in project root) should contain:

#### basic guidelines how the project is constructed

#### Generic code naming rules

I give an example rule I create on the fly:

"Either use generic word `result` when waiting for a promise or give it a name that contains result(userConfirmResult)"

#### Short description of every folder and its names

The goal is to give a general overview of the system.

If the project is large, documentation files should be located in a separate folder which duplicates the structure of `src` folder.

So at the end we'll have `docs` folder with files `actions.md`, `components.md`, etc.('actions' and 'components' are folders inside `src` folder)

Sample content for folder `Button` inside `Components`:

```markdown
## Button

Generic button component used mainly in landing page.
Needs improvement so it can take optional parameter `fa` for FontAwesome icons.
```

### Inside files

Most functions within most files should have short explanation of what it does, possible side-effects, relation to other files and so on. 

I advise against JSDoc standard as it takes too much space.

So instead of:

```javascript
/**
 * It returns the next index of a list
 * @param {Number} currentIndex - current index of the list.
 * @param {any[]} list
 * @returns {Number} the next index of this list
 */
function takeNextIndex(currentIndex, list){
  ...
}
```

I'd prefer to write only the most important information about this function:

```javascript
/**
 * It returns the next index of a list
 */
function takeNextIndex(currentIndex, list){
  ...
}
```

JSDoc is very nice and it can be used to automatically generete documentation files with `documentation.js` library. 

Still, it feels like overkill in most cases and besides I find the shorter version much easier to read and to write.

### Inside functions

Most of the unexpected coding should be commented, as it clears the doubts.

I give example from my experience:

```javascript
import {takeLast} from 'rambda'

const imagePath = getImagePath()

/**
 * As `imagePath` can only be .jpg or .png
 * then we just need the last three chars
 */
const imageFormat = takeLast(3, imagePath)
```

## Code style

#### Line length

One important **ESLint** rule is `max-len`, which limits the line length to 80 characters.

This rule forces the developer to find other solution than the easiest one.

For example:

```javascript
const URL = 'https://github.com/selfrefactor/lint-fn/blob/master/config/.eslintrcReact.js'

// we can refactor it to
const urlBase = 'https://github.com'
const repo = 'selfrefactor/lint-fn'
const fileLocation = 'master/config/.eslintrcReact.js'

const URL = `${urlBase}/${repo}/blob/${fileLocation}`
```

But the more useful this rule will be in JSX files where we have long class-names.

```jsx
<div key={v4()} className={styles.slick_slide + ' flex-none layout-row layout-align-center-center'} style={divStyle}>
```

So with this rule, we will be forced to find one of the available solutions.

#### Class-names

One option to solve the long class-names is to use `classnames` library.

Other is to explicitly describe the effect of the class-name fragment.

From

```jsx
<div key={v4()} className={styles.slick_slide + ' flex-none layout-row layout-align-center-center'} style={divStyle}>
```

to

```jsx
const FLEX_STAY_CENTERED = 'flex-none layout-row layout-align-center-center'

<div
  key={v4()}
  className={`styles.slick_slide ${FLEX_STAY_CENTERED}`}
  style={divStyle}
>
```

#### Prefer exlicit over generic naming

In the example above `divStyle` is not very descriptive name.

In this case `divStyle` holds just background image, so I'd called it `backgroundImage`.

## Testing

### End-to-end testing

Unit testing is great but it is time-comsuming.

End-to-end testing with few long scenarios can give you benefit of integration testing of your system and as well provide visual representation of your business logic.

`Puppeteer` is great library and it works headless, which makes it usable in CI environment.

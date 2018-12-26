# R.isValid explained

## API

> isValid({ input: object, schema: object}): boolean

- input - object to be validated

- schema - schema object with rules

## Optional requirements

Note that you can have have optional requiremens that you append with `_`.

For example:

```javascript
const schema = {
  a: 'number',
  b_: 'string',
}
const inputA = {
  a: 1,
}
const inputB = {
  a: 1,
  b: 'bar',
}
const inputC = {
  a: 1,
  b: 2,
}
assert.ok(isValid({schema, input: inputA}))
assert.ok(isValid({schema, input: inputB}))
assert.ok(isValid({schema, input: inputC})) // throws as `2` is not a string
```

## Valid schema declarations

### Evaluation function

> { foo: val => val.length > 2 }

- Valid object - `{ foo: [ 1, 2, 3 ] }`

### Function

> { foo: 'function' }

- Valid object - `{ foo: (x) => x + 2 }`

### Prototype

> { foo: String, bar: Number }

- Valid object - `{ foo: '', bar: 0 }

### String

> { foo: 'string' }

- Valid object - `{ foo: 'bar' }

### Number

> { foo: 'number' }

- Valid object - `{ foo: 'bar' }

### Boolean

> { foo: 'boolean' }

- Valid object - `{ foo: true }

### Any

> { foo: 'any' }

- Valid object - `{ foo: 'bar' }

- Invalid object - `{ foo: null }`

- Invalid object - `{ foo: undefined }`

### Array

> { foo: 'array' }

- Valid object - `{ foo: 'bar' }

### Array of specific type

> { foo: ['string'] }

- Valid object - { foo: [ 'bar', 'baz' ] }

### Regular expresion

> { foo: /ba/ }

- Valid object - `{ foo: 'bar' }

### Enumerable

> { foo: [ 'bar', 'baz', 1 ] }

- Valid object - `{ foo: 1 }`
- Valid object - `{ foo: 'baz' }`

### Schema

We can nest schemas such as:

```javascript
const fooSchema = {bar: 'string'}
const schema = {
  foo: fooSchema,
  bar: 'number',
}
const input = {
  foo: {bar: 'You shook me'},
  bar: 1,
}
isValid({input, schema})
// => true
```

### Array of schema

Property is array of elements, with each element is validated against the single schema object.

Note, that if the schema is { foo: 'string' }, the object {foo: 'bar',baz: 1} is valid.

In other words, we can have aditional properties, without breaking the validation.

> { title: 'string', foo: [ { title: 'string' } ] }

- Valid object - { foo: [ { title: 'bar', title: 'baz' } ] }

## Detailed example

```javascript
const basicSchema = {
  a: ['string'],
}
const schema = {
  b: [basicSchema],
  c: {
    d: {
      e: 'boolean',
    },
    f: 'array',
  },
  g: ['foo', 'bar', 'baz'],
}
const input = {
  b: [
    {
      a: ['led', 'zeppelin'],
    },
    {
      a: ['dancing', 'days'],
    },
  ],
  c: {
    d: {
      e: true,
    },
    f: [],
  },
  g: 'foo',
}

isValid({input, schema}) // => true
```

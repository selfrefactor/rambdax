const isValid = require('./isValid').default

test('nested schema', () => {
  const input = {
    a : {
      b : 'str',
      c : 3,
      d : 'str',
    },
    b : 'foo',
  }
  const schema = {
    a : {
      b : 'string',
      c : 'number',
      d : 'string',
    },
    b : 'string',
  }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()

  const invalidInputFirst = {
    a : {
      b : 'str',
      c : 3,
      d : 'str',
    },
    b : 5,
  }

  expect(
    isValid({
      input : invalidInputFirst,
      schema,
    })
  ).toBeFalsy()

  const invalidInputSecond = {
    a : {
      b : 'str',
      c : 'str',
      d : 'str',
    },
    b : 5,
  }

  expect(
    isValid({
      input : invalidInputSecond,
      schema,
    })
  ).toBeFalsy()

  const invalidInputThird = {
    a : { b : 'str' },
    b : 5,
  }

  expect(
    isValid({
      input : invalidInputThird,
      schema,
    })
  ).toBeFalsy()
})

test('array of type', () => {
  const input = {
    a : [ 1, 2 ],
    b : 'foo',
  }
  const schema = {
    a : [ 'number' ],
    b : 'string',
  }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()

  const invalidInput = {
    a : [ 1, '1' ],
    b : 'foo',
  }

  expect(
    isValid({
      input : invalidInput,
      schema,
    })
  ).toBeFalsy()
})

test('function as rule', () => {
  const input = {
    a : [ 1, 2, 3, 4 ],
    b : 'foo',
  }
  const invalidInput = {
    a : [ 4 ],
    b : 'foo',
  }

  const schema = {
    a : x => x.length > 2,
    b : 'string',
  }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()

  expect(
    isValid({
      input : invalidInput,
      schema,
    })
  ).toBeFalsy()
})

test('input prop is undefined', () => {
  const input = { b : 3 }
  const schema = { a : 'number' }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeFalsy()
})

test('enum', () => {
  const input = { a : 'foo' }
  const invalidInput = { a : '' }

  const schema = { a : [ 'foo', 'bar', 'baz' ] }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()

  expect(
    isValid({
      input : invalidInput,
      schema,
    })
  ).toBeFalsy()
})

test('readme example', () => {
  const basicSchema = { a : [ 'string' ] }
  const schema = {
    b : [ basicSchema ],
    c : {
      d : { e : 'boolean' },
      f : 'array',
    },
    g : [ 'foo', 'bar', 'baz' ],
  }
  const input = {
    b : [
      { a : [ 'led', 'zeppelin' ] },
    ],
    c : {
      d : { e : true },
      f : [ 'any', 1, null, 'value' ],
    },
    g : 'foo',
  }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()
})

test('should allow additional properties', () => {
  const input = {
    title : 'You shook me',
    year  : 1969,
  }

  const schema = { title : 'string' }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()
})

test('compatible schemas with nested object', () => {
  const input = {
    foo : 'bar',
    baz : { a : { b : 'c' } },
  }
  const invalidInputFirst = {
    foo : 'bar',
    baz : { a : { b : 1 } },
  }
  const invalidInputSecond = {
    foo : 'bar',
    baz : { a : { b : [] } },
  }
  const invalidInputThird = {
    foo : 'bar',
    baz : { a : { b : null } },
  }
  const schema = {
    foo : 'string',
    baz : { a : { b : 'string' } },
  }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeTruthy()

  expect(
    isValid({
      input : invalidInputFirst,
      schema,
    })
  ).toBeFalsy()
  expect(
    isValid({
      input : invalidInputSecond,
      schema,
    })
  ).toBeFalsy()
  expect(
    isValid({
      input : invalidInputThird,
      schema,
    })
  ).toBeFalsy()
})

test('should return true when schema is empty object', () => {
  expect(
    isValid({
      input  : { a : 1 },
      schema : {},
    })
  ).toBeTruthy()
})

test('should return false when schema is undefined', () => {
  expect(
    isValid({
      input  : { a : 1 },
      schema : undefined,
    })
  ).toBeFalsy()
})

test('should return false with invalid schema rule', () => {
  const input = {
    foo : 'bar',
    a   : {},
  }
  const inputSecond = { foo : 'bar' }

  const schema = {
    foo : 'string',
    baz : { a : {} },
  }

  expect(
    isValid({
      input,
      schema,
    })
  ).toBeFalsy()

  expect(
    isValid({
      input : inputSecond,
      schema,
    })
  ).toBeFalsy()
})

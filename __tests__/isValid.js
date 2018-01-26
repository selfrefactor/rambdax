const R = require('../rambdax')

test('nested schema', () => {
  const input = {
    a : {b: 'str', c: 3, d: 'str'},
    b : 'foo',
  }
  const schema = {
    a : {b: 'string', c: 'number', d: 'string'},
    b : 'string',
  }

  expect(
    R.isValid({
      input,
      schema,
    })
  ).toBeTruthy()
  
  const invalidInputFirst = {
    a : {b: 'str', c: 3, d: 'str'},
    b : 5,
  }

  expect(
    R.isValid({
      input: invalidInputFirst,
      schema,
    })
  ).toBeFalsy()
  
  const invalidInputSecond = {
    a : {b: 'str', c: 'str', d: 'str'},
    b : 5,
  }

  expect(
    R.isValid({
      input: invalidInputSecond,
      schema,
    })
  ).toBeFalsy()

  const invalidInputThird = {
    a : {b: 'str'},
    b : 5,
  }

  expect(
    R.isValid({
      input: invalidInputThird,
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
    a : ['number'],
    b : 'string',
  }

  expect(
    R.isValid({
      input,
      schema,
    })
  ).toBeTruthy()

  const invalidInput = {
    a : [ 1, '1' ],
    b : 'foo',
  }

  expect(
    R.isValid({
      input: invalidInput,
      schema,
    })
  ).toBeFalsy()
})

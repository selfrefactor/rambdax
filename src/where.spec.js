import { where } from './where'
import { equals } from './rambda/equals'

test('1', () => {
  const pred = where({
    a : equals('foo'),
    b : equals('bar'),
  })
  expect(
    pred({
      a : 'foo',
      b : 'bar',
      x : 11,
      y : 19,
    })
  ).toEqual(true)
})

test('2', () => {
  const pred = where({
    a : equals('foo'),
    b : equals('baz'),
  })
  expect(
    pred({
      a : 'foo',
      b : 'bar',
      x : 11,
      y : 19,
    })
  ).toEqual(false)
})

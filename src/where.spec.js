import { where } from './where'
import { equals } from './rambda/equals'

test('', () => {
  const pred = where({
    a: equals('foo'),
    b: equals('bar'),
  })
  expect(
    pred({
      a: 'foo',
      b: 'bar',
      x: 11,
      y: 19,
    })
  ).toEqual(true)
})

test('', () => {
  const pred = where({
    a: equals('foo'),
    b: equals('baz'),
  })
  expect(
    pred({
      a: 'foo',
      b: 'bar',
      x: 11,
      y: 19,
    })
  ).toEqual(false)
})

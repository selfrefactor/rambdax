import { change } from './change'

const origin = {
  a   : 0,
  foo : {
    bar : 1,
    baz : false,
    bax : { nested : 2 },
  },
  first : {
    second : {
      third : {
        fourth  : 3,
        fourthA : 4,
      },
    },
  },
}

test('when rule is not an object', () => {
  const result = change(
    origin,
    'foo.bar.baz',
    7
  )

  expect(result.foo.bar.baz).toBe(7)
  expect(result.foo.bax.nested).toBe(2)
  expect(result.a).toBe(0)
  expect(result.first.second.third.fourth).toBe(3)
})

test('preserve origin object if nesting level is below 3', () => {
  const changeData = {
    foo : {
      bar : 7,
      bax : { bay : 8 },
    },
    first : { second : { third : { fourth : 9 } } },
  }
  const result = change(
    origin,
    '',
    changeData
  )

  expect(result.a).toBe(0)
  expect(result.foo.bar).toBe(7)
  expect(result.foo.baz).toBe(false)
  expect(result.foo.bax.nested).toBe(2)
  expect(result.foo.bax.bay).toBe(8)
  expect(result.first.second.third.fourth).toBe(9)
  expect(result.first.second.third.fourthA).toBe(undefined)
})

test('simpler', () => {
  const localOrigin = {
    a   : 0,
    foo : {
      bar : 1,
      bax : { nested : 2 },
    },
  }
  const changeData = {
    bar : 2,
    bay : 3,
    bax : { baq : 9 },
  }
  const result = change(
    localOrigin,
    'foo',
    changeData
  )

  const expectedResult = {
    a   : 0,
    foo : {
      bar : 2,
      bay : 3,
      bax : {
        nested : 2,
        baq    : 9,
      },
    },
  }

  expect(result).toEqual(expectedResult)
})

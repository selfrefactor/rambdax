import {evolve} from './evolve'
import {add, trim} from 'rambda'

test('ok', () => {
  const tomato = {
    firstName : '  Foo ',
    data      : {
      elapsed   : 100,
      remaining : 1400,
    },
    id : 123,
  }
  const transformations = {
    firstName : trim,
    lastName  : trim, //Will not get invoked.
    data      : {
      elapsed   : add(1),
      remaining : add(-1),
    },
  }
  const result = evolve(transformations, tomato)
  expect(result).toEqual({
    firstName : 'Foo',
    data      : {
      elapsed   : 101,
      remaining : 1399,
    },
    id : 123,
  })
})


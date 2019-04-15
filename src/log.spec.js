import { log, logInit, logHolder } from './log'

let spy
let holder

beforeEach(()=> {
  spy = jest.fn()
  holder = console.log
  console.log = x => spy(x)
})

afterEach(()=> {
  console.log = holder
})

test('happy', () => {
  expect(
    log(1, 2, 3)
    ).toBeUndefined()

  expect(spy).toBeCalled()
})

test('with pushFlag', () => {
  logInit({
    pushFlag : true,
    logFlag  : false,
  })

  expect(
    log(1, 2, 3)
  ).toBeUndefined()

  expect(
    logHolder
  ).toEqual([ [ 1, 2, 3 ] ])

  expect(spy).not.toBeCalled()
})

test('pushHolder is reset with logInit', () => {
  logInit()

  expect(
    logHolder
  ).toEqual([])
  expect(spy).not.toBeCalled()
})

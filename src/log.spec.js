import { log, logInit, logHolder } from './log'

let spy
let holder

beforeEach(() => {
  spy = jest.fn()
  holder = console.log
  console.log = x => spy(x)
})

afterEach(() => {
  spy.mockReset()
  console.log = holder
})

test('happy', () => {
  expect(
    log(1, 2, 3)
  ).toBeUndefined()

  expect(spy).toHaveBeenCalled()
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

  expect(spy).not.toHaveBeenCalled()
})

test('with pushFlag and logFlag', () => {
  logInit({ pushFlag : true })

  log(1, 2, 3)
  log(null)

  expect(
    logHolder
  ).toEqual([ [ 1, 2, 3 ], [ null ] ])

  expect(spy).toHaveBeenCalled()
})

test('pushHolder is reset with logInit', () => {
  logInit()

  expect(
    logHolder
  ).toEqual([])
  expect(spy).not.toHaveBeenCalled()
})

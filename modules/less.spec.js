import { less } from './less';

test('curry', () => {
  expect(
    less(1)(2)
  ).toBeFalsy()
})

test('', () => {
  expect(
    less(3, 2)
  ).toBeTruthy()
})

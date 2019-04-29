import { uuid } from './uuid'

test('', () => {
  expect(
    () => console.log(uuid())
  ).not.toThrow()
})

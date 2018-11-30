import { defaultToStrict } from './defaultToStrict'

test('with undefined', () => {
  expect(defaultToStrict('foo')(undefined)).toEqual('foo')
})

test('with null', () => {
  expect(defaultToStrict('foo')(null)).toEqual('foo')
})

test('with NaN', () => {
  expect(defaultToStrict('foo')(NaN)).toEqual('foo')
})

test('with empty string', () => {
  expect(defaultToStrict('foo')('')).toEqual('foo')
})

test('with false', () => {
  expect(defaultToStrict('foo')(false)).toEqual('foo')
})

test('when inputArgument passes initial check', () => {
  expect(defaultToStrict('foo', 'bar')).toEqual('bar')
})
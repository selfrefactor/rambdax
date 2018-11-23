import { includesAny } from './includesAny'

test('list of any as target and source - cheap - true', () =>{
  const targets = [{a:1}, {d:4},{b: {c:2}}, 2, 1]
  const source = [{a:2}, {d:5}, {b: {c:20}}, 1]

  const result = includesAny(targets,source)
  expect(
    result
  ).toBeTruthy()
})

test('list of any as target and source - cheap - false', () =>{
  const targets = [{a:1}, {d:4}, 1,2]
  const source = [{a:2}, {d:5}, 3]

  const result = includesAny(targets,source)
  expect(
    result
  ).toBeFalsy()
})

test('list of any as target and source - expensive - true', () =>{
  const targets = [1,2,{a:1}, {d:4},{b: {c:2}}]
  const source = [3,4,{a:2}, {d:5}, {b: {c:2}}]

  const result = includesAny(targets,source)
  expect(
    result
  ).toBeTruthy()
})

test('list of any as target and source - expensive - false', () =>{
  const targets = [1,2,{a:1}, {d:4},{b: {c:2}}]
  const source = [3,4,{a:2}, {d:5}, {b: {c:20}}]

  const result = includesAny(targets,source)
  expect(
    result
  ).toBeFalsy()
})

test('strings as target, array as source - true', () =>{
  const targets = ["foo","baz"]
  const source = [1,2,"bar","baz"]

  const result = includesAny(targets,source)
  expect(
    result
  ).toBeTruthy()
})

test('strings as target, array as source - false + curry', () =>{
  const targets = ["foo","zeppelin"]
  const source = [1,2,"bar","baz"]

  const result = includesAny(targets)(source)
  expect(
    result
  ).toBeFalsy()
})

test('strings as target, string as source - true', () =>{
  const targets = ["foo","love"]
  const source = 'whole lotta love'

  const result = includesAny(targets, source)
  expect(
    result
  ).toBeTruthy()
})

test('strings as target, string as source - false', () =>{
  const targets = ["foo","zeppelin"]
  const source = 'whole lotta love'

  const result = includesAny(targets, source)
  expect(
    result
  ).toBeFalsy()
})

test('incorrect inputs', () =>{
  const targets = ["foo","zeppelin"]
  const source = null

  const result = includesAny(targets, source)
  expect(
    result
  ).toBeFalsy()
})

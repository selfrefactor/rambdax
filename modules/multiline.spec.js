import multiline from './multiline'

test('case 0', () => {
  const zero = `node node_modules/jest`
  const first = `--runInBand`
  const last = `-- src/a.spec.js`
  const flag = false
  const result = multiline(`
    ${zero}
    ${first}
    ${flag ? '--env=node' : ''}
    ${last}
  `)

  const expectedResult = `${zero} ${first} ${last}`

  expect(
    result
  ).toBe(expectedResult)
})

test('case 1', () => {
  const zero = `node node_modules/jest`
  const first = `--runInBand`
  const last = `-- src/a.spec.js`
  const flag = true
  const result = multiline(`
    ${zero}
    ${first}
    ${flag ? '--env=node' : ''}
    ${last}
  `)

  const expectedResult = `${zero} ${first} --env=node ${last}`

  expect(
    result
  ).toBe(expectedResult)
})

test('case 2', () => {
  const first = `--runInBand`
  const result = multiline(`
    zero
    ${first}
    last
  `)
  const expectedResult = `zero ${first} last`

  expect(
    result
  ).toBe(expectedResult)
})

test('case 3', () => {
  const result = multiline(`
    foo
    bar
    baz
  `)

  const expectedResult = 'foo bar baz'

  expect(
    result
  ).toBe(expectedResult)
})


test('with glue', () => {
  const result = multiline(`
    foo
    bar
    baz
  `, '==')

  const expectedResult = 'foo==bar==baz'

  expect(
    result
  ).toBe(expectedResult)
})

const R = require("../rambdax")

test('', async () => {
  const result = await R.ifElseAsync(
    async x =>  R.type(await R.delay(x*80)) === 'String',
    async x => {
      await R.delay(x*60)
      return true
    },
    async x => {
      await R.delay(x*60)
      return false
    },
  )(7)
  
  expect(result).toEqual(true)
})

test('works with regular functions', async () => {
  const result = await R.ifElseAsync(
    async x =>  R.type(await R.delay(x*80)) === 'String',
    R.T,
    R.F
  )(7)
  
  expect(result).toEqual(true)
})
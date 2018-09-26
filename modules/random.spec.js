const R = require('../rambdax')

describe('random', () => {
  it('when returns true', () => {
    R.range(0, 100).map(() => {
      const randomResult = R.random(1, 10)
      expect(randomResult).toBeLessThanOrEqual(10)
      expect(randomResult).toBeGreaterThanOrEqual(1)
    })
  })
})


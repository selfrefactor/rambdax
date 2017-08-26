const R = require('../rambdax')

describe('race', () => {
  it('', async () => {
    const delay = ms => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0) {
          resolve(ms)
        } else {
          reject(ms + 10)
        }
      }, ms)
    })

    const test = async () => {
      try {
        const promises = {
          a : delay(1),
          b : delay(2),
          c : delay(3),
        }
        const result = await R.race(promises)
        expect(
          result
        ).toEqual({ a : 1 })
      } catch (err) {
        console.log(err)
        expect(true).toBeFalsy()
      }
    }
    test()
  })
})

describe('race', () => {
  it('', async () => {
    const delay = ms => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 1) {
          resolve(ms)
        } else {
          reject(ms)
        }
      }, ms)
    })

    const test = async () => {
      try {
        const promises = {
          a : delay(1),
          b : delay(2),
          c : delay(3),
        }
        const result = await R.race(promises)
        expect(true).toBeFalsy()
      } catch (err) {
        expect(
          err
        ).toEqual({ a : 11 })
      }
    }
    test()
  })
})

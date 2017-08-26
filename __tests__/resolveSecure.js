const R = require('../rambdax')

const delay = ms => new Promise(res => {
  setTimeout(() => res(ms), ms)
})

const fail = async ms => {
  try {
    JSON.parse('{:a')
  } catch (err) {
    throw new Error(err)
  }
}

describe('resolve', () => {
  it('', async () => {
    const arr = [ delay(2000), fail(1000), delay(1000) ]
    const result = await R.resolveSecure(arr)
    expect(result[ 0 ]).toEqual({
      payload : 2000,
      type    : 'RESULT',
    })
    expect(result[ 1 ].type).toBe('ERROR')
    expect(result[ 2 ]).toEqual({
      payload : 1000,
      type    : 'RESULT',
    })
  })
})


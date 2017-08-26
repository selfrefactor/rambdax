const R = require('../rambdax')

describe('flip with Rambda method', () => {
  const update = R.flip(R.update)
  it('no curring when single argument', () => {
    const len = R.flip(R.length)
    expect(
      len([ 0, 7, 2 ])
    ).toEqual(3)
  })

  it('no curring', () => {
    expect(
      update([ 0, 7, 2 ], 1, 1)
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'1\' \'2\'', () => {
    expect(
      update([ 0, 7, 2 ], 1)(1)
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'2\' \'1\'', () => {
    expect(
      update([ 0, 7, 2 ])(1, 1)
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'1\' \'1\' \'1', () => {
    expect(
      update([ 0, 7, 2 ])(1)(1)
    ).toEqual([ 0, 1, 2 ])
  })
})

describe('flip with custom function', () => {
  function updateFn (index, newValue, arr) {
    const arrClone = Array.from(arr)

    return arrClone.fill(newValue, index, index + 1)
  }
  const update = R.flip(updateFn)

  it('no curring', () => {
    expect(
      update([ 0, 7, 2 ], 1, 1)
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'1\' \'2\'', () => {
    expect(
      update([ 0, 7, 2 ], 1)(1)
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'2\' \'1\'', () => {
    expect(
      update([ 0, 7, 2 ])(1, 1)
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'1\' \'1\' \'1', () => {
    expect(
      update([ 0, 7, 2 ])(1)(1)
    ).toEqual([ 0, 1, 2 ])
  })
})

describe('curry with custom function', () => {
  function updateFn (index, newValue, arr) {
    const arrClone = Array.from(arr)

    return arrClone.fill(newValue, index, index + 1)
  }
  const update = R.curry(updateFn)
  it('no curring', () => {
    expect(
      update(1, 1, [ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'1\' \'2\'', () => {
    expect(
      update(1)(1, [ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'2\' \'1\'', () => {
    expect(
      update(1, 1)([ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })

  it('curring type \'1\' \'1\' \'1', () => {
    expect(
      update(1)(1)([ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })
})

describe('common cases', () => {
  it('curry', () => {
    const up = R.curry(R.update)(1, 1)
    expect(
      up([ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })

  it('curry', () => {
    const up = R.curry(R.update)(1)
    expect(
      up(1)([ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })

  it('curry', () => {
    expect(
      R.curry(R.update)(1)(1)([ 0, 7, 2 ])
    ).toEqual([ 0, 1, 2 ])
  })
  it('flip', () => {
    expect(
      R.compose(
        R.map(R.flip(R.subtract)(10)),
        R.adjust(R.add(1), 0)
      )([ 0, 2, 3, 4, 5, 6, 7, 8, 9 ])
    ).toEqual([ -9, -8, -7, -6, -5, -4, -3, -2, -1 ])
  })
})

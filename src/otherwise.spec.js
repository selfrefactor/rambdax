import { pipe } from './rambda/pipe'
import { pick } from './rambda/pick'
import { resolve } from './resolve'
import { delay } from './delay'
import { otherwise } from './otherwise'

const makeQuery = email => ({ query : email })

const fetchMemberGood = async x => {
  await delay(200)

  return {
    a         : 1,
    firstName : `FIRST_NAME_${ x.query }`,
    lastName  : `LAST_NAME_${ x.query }`,
  }
}

const fetchMemberBad = async x => {
  await delay(200)
  throw new Error('FOO_ERROR')
}

test('with then + good promise', async () => {
  const getMemberName = pipe(
    makeQuery,
    fetchMemberGood,
    otherwise(() => ({ firstName : 'BAR' })),
    resolve(pick([ 'firstName', 'lastName' ]))
  )
  const result = await getMemberName('FOO')

  expect(result).toEqual({
    firstName : 'FIRST_NAME_FOO',
    lastName  : 'LAST_NAME_FOO',
  })
})

test('with then + bad promise', async () => {
  const getMemberName = pipe(
    makeQuery,
    fetchMemberBad,
    otherwise(() => ({ firstName : 'BAR' })),
    resolve(pick([ 'firstName', 'lastName' ]))
  )
  const result = await getMemberName('FOO')

  expect(result).toEqual({ firstName : 'BAR' })
})

test('with async', async () => {
  const getMemberName = pipe(
    makeQuery,
    fetchMemberBad,
    otherwise(e => {
      expect(e.message).toBe('FOO_ERROR')

      return { firstName : 'BAR' }
    })
  )

  const result = await resolve(
    pick([ 'firstName', 'lastName' ]),
    getMemberName('FOO')
  )

  expect(result).toEqual({ firstName : 'BAR' })
})

test('with promise', async () => {
  const fetch = x => new Promise((res, rej) => rej(new Error('FOO_ERROR')))

  const getMemberName = pipe(
    makeQuery,
    fetch,
    otherwise(e => {
      expect(e.message).toBe('FOO_ERROR')

      return { firstName : 'BAR' }
    }),
    resolve(pick('firstName,lastName'))
  )

  const result = await getMemberName('FOO')

  expect(result).toEqual({ firstName : 'BAR' })
})

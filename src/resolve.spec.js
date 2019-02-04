import { pipe } from './rambda/pipe'
import { pick } from './rambda/pick'
import { resolve } from './resolve'
import { delay } from './delay'

const makeQuery = email => ({ query : email })

const expected = {
  firstName : 'FIRST_NAME_FOO',
  lastName  : 'LAST_NAME_FOO',
}

const fetchMember = async x => {
  await delay(200)

  return {
    a         : 1,
    firstName : `FIRST_NAME_${ x.query }`,
    lastName  : `LAST_NAME_${ x.query }`,
  }
}

test('curried', async () => {
  const getMemberName = pipe(
    makeQuery,
    fetchMember,
    resolve(pick([ 'firstName', 'lastName' ]))
  )
  const result = await getMemberName('FOO')
  expect(result).toEqual(expected)
})

test('no curry', async () => {
  const getMemberName = pipe(
    makeQuery,
    fetchMember
  )

  const result = await resolve(
    pick([ 'firstName', 'lastName' ]),
    getMemberName('FOO')
  )
  expect(result).toEqual(expected)
})

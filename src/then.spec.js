import { pipe } from './rambda/pipe'
import { pick } from './rambda/pick'
import { then } from './then'
import { delay } from './delay'

const makeQuery = (email) => ({ query: email });
  
const fetchMember = async (x) => {
  await delay(200)
  return {
    a:1,
    firstName:`FIRST_NAME_${x.query}`, 
    lastName: `LAST_NAME_${x.query}`, 
  }
}

test('curried', async () =>{
  const getMemberName = pipe(
    makeQuery,
    fetchMember,
    then(pick(['firstName', 'lastName']))
  )
  const result = await getMemberName(1)  
  expect(
    result
  ).toEqual({firstName: 'FIRST_NAME_1', lastName: 'LAST_NAME_1'})
})

test('no curry', async () =>{
  const getMemberName = pipe(
    makeQuery,
    fetchMember,
  )

  console.log({a:11})
  const result = await then(
    pick(['firstName', 'lastName']), 
    getMemberName(1)
  )
  expect(
    result
  ).toEqual({firstName: 'FIRST_NAME_1', lastName: 'LAST_NAME_1'})
})

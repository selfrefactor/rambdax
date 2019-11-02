import { allFalse } from './allFalse'
import { runTests } from 'helpers'

const testData = {
  label : 'foo',
  data  : [
    {
      ok : [
        () => 2 > 10,
        () => [],
        () => {},
        null,
        [],
      ],
    },
    {
      // only : true,
      fail : [
        () => 2 > 10,
        () => [],
        () => ({ a : 1 }),
      ],
    },
    {
      fail : [
        () => 2 > 10,
        () => [],
        true,
      ],
    },
  ],
  fn : input => allFalse(...input),

}
runTests(testData)


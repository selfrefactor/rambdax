const { map } = require('ramda') 
import { add } from 'rambdax'
function createRecord(collectionMethods, instanceMethods){
  const recordCreator = input => {
    const queries = map(method => () => method(input))(instanceMethods)

    return Object.assign(input, queries)
  }
  
  return collection => {
    const handler = {
      get : function(obj, prop){
        if (collectionMethods[ prop ] !== undefined){
          return () => collectionMethods[ prop ](collection)
        }
        if (obj[ prop ] !== undefined) return recordCreator(obj[ prop ])

        return undefined
      },

    }

    return new Proxy(collection, handler)
  }
}

const created = createRecord(
  { filterList : list => list.filter(({ a }) => a > 2) },
  { increase : ({ a }) => a + 1 }
)([ { a : 1 }, { a : 2 }, { a : 22 } ])
const afterMap = created.map(x => x)

console.log(created.filterList)
console.log(afterMap.filterList ) // => undefined

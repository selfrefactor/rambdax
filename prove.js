const {map} = require('rambda')
console.log(1)
function createFactory(collectionMethods, instanceMethods){
  const recordHandler = {
    get: function(obj, prop) {
      console.log(1,obj,prop)
      if(Object.keys(instanceMethods).includes(prop)){
        return instanceMethods[prop](obj[prop])
      }

      if(obj[prop] !== undefined) return obj[prop]

      return undefined
    }
  };

  return collection => {
    const handler = {
      get: function(obj, prop) {
        // if(collectionMethods[prop] !== undefined){
        //   return collectionMethods[prop](collection)
        // }
        // console.log(obj,prop)
        if(obj[prop] !== undefined) return new Proxy(obj[prop], recordHandler)

        return undefined
      }
    };

    return new Proxy(collection, handler)
  }
}

const created = createFactory(
  {filter: list => list.filter(x => x > 2)},
  {increase: x => x+1}
)([1,2,3])
console.log(created[0])
// console.log(created[2])
// console.log(created)
// console.log(created[2])
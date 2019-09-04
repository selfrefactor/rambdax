export function partitionMany(fn, list){
  const hash = {}

  list.forEach(x => {
    const i = fn(x)

    if (hash[ i ]){
      hash[ i ].push(x)
    } else {
      hash[ i ] = [ x ]
    }
  })

  const toReturn = []
  Object.keys(hash).forEach(key => toReturn[ key ] = hash[ key ])

  return toReturn
}

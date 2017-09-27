import {
  type,
  map,
} from 'rambda'

function helper ({ condition, inputArgument, prop }) {
  return new Promise((resolve, reject) => {
    if (!(type(condition) === 'Async')) {
      return resolve({
        type    : prop,
        payload : condition(inputArgument),
      })
    }

    condition(inputArgument)
      .then(result => {
        resolve({
          type    : prop,
          payload : result,
        })
      })
      .catch(err => reject(err))
  })
}

export default function produce (conditions, inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder => produce(conditions, inputArgumentHolder)
  }
  let asyncConditionsFlag = false
  for (const prop in conditions) {
    if (
      asyncConditionsFlag === false &&
    type(conditions[ prop ]) === 'Async'
    ) {
      asyncConditionsFlag = true
    }
  }

  if (asyncConditionsFlag === false) {
    const willReturn = {}
    for (const prop in conditions) {
      willReturn[ prop ] = conditions[ prop ](inputArgument)
    }

    return willReturn
  }
  const promised = []
  for (const prop in conditions) {
    const condition = conditions[ prop ]
    promised.push(helper({
      inputArgument,
      condition,
      prop,
    }))
  }

  return new Promise((resolve, reject) => {
    Promise.all(promised)
      .then(results => {
        const willReturn = {}

        map(
          result => willReturn[ result.type ] = result.payload,
          results
        )

        resolve(willReturn)
      })
      .catch(err => reject(err))
  })
}

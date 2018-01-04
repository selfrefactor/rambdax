import { curry } from 'rambda'

function assocPath (path, x, obj) {
  const pathValue = typeof path === 'string' ?
    path.split('.') :
    path

  const lastProp = pathValue[ pathValue.length - 1 ]

  let newProps = { [ lastProp ] : x }

  let counter = pathValue.length - 2

  while (counter > -1) {
    const prop = pathValue[ counter ]
    newProps = { [ prop ] : newProps }

    counter--
  }

  return Object.assign(
    {},
    obj,
    newProps
  )
}

export default curry(assocPath)

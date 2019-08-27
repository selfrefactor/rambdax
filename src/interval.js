import { uuid } from './uuid'

// NODOCS
const holder = {}

export function interval({ fn, ms, stopWhen }){
  const key = uuid()

  return new Promise(resolve => {
    holder[ key ] = setInterval(() => {
      if (stopWhen() === true){
        clearInterval(holder[ key ])
        resolve()
      } else {
        fn()
      }
    }, ms)
  })
}

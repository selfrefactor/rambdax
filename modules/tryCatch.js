import { type } from 'rambda'

export default function tryCatch (fn, input) {
  const fnType = type(fn)
  if (fnType === 'Async' || fnType === 'Promise') {
    return new Promise(resolve => {
      fn(input)
        .then(resolve)
        .catch(resolve)
    })
  }

  try {
    return fn(input)
  } catch (err) {
    return err
  }
}

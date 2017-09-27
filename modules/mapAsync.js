export default async function mapAsyncFn (fn, arr) {
  try {
    const willReturn = []
    for (const a of arr) {
      willReturn.push(await fn(a))
    }

    return willReturn
  } catch (err) {
    throw err
  }
}

function mapAsync (fn, arr) {
  if (arr === undefined) {
    return async holder => await mapAsyncFn(fn, holder)
  }

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, arr).then(resolve).catch(reject)
  })
}

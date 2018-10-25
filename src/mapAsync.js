async function mapAsyncFn(fn, arr) {
  try {
    if (Array.isArray(arr)) {
      const willReturn = []
      for (const a of arr) {
        willReturn.push(await fn(a))
      }

      return willReturn
    }

    const willReturn = {}
    for (const prop in arr) {
      willReturn[ prop ] = await fn(arr[ prop ], prop)
    }

    return willReturn
  } catch (err) {
    throw err
  }
}

export function mapAsync(fn, arr) {
  if (arguments.length === 1) {
    return async holder => await mapAsyncFn(fn, holder)
  }

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, arr).then(resolve)
      .catch(reject)
  })
}

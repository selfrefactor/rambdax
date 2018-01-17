const mapFn = R.map(x => x*2)

async function fn(x){
  await R.delay(1000)

  return x+1
}

const asyncMapFn = R.mapAsync(fn)

const result = R.composeAsync( asyncMapFn, mapFn )( [1, 2, 3] )

// `result` resolves after 3 seconds to `[3, 5, 7]`
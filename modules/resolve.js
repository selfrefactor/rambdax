const R = require("rambda")

const delay = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve(ms)
  }, ms)
})

function resolveAll (promises) {
  return new Promise((resolve, reject) => {
    let counter = 0
    const props = {}
    const promisedArr = []
    for (const prop in promises) {
      props[ counter ] = prop
      promisedArr.push(promises[ prop ])
      counter++
    }
    Promise.all(promisedArr)
    .then(result => {
      console.log(result)
      const willReturn = {}
      result.map((val, key) => {
        const prop = props[ key ]
        willReturn[ prop ] = val
      })

      resolve(willReturn)
    })
      .catch(reject)
  })
}

const a = async () => {
  const promises = {
    a : delay(1),
    b : delay(2),
    c : delay(3),
  }
  const result = await resolveAll(promises)

  return result
}

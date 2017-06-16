const R = require("./rambdax")

function debounce(func, wait) {
  let timeout
  return function() {
    let context = this,
      args = arguments
    const later = function() {
      timeout = null
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

let counter = 0

const inc = () => {
  counter++
}

const delay = ms => new Promise(resolve => {
  setTimeout(resolve, ms)
})

const debug = async() => {
  const incWrapped = debounce(inc, 500)
  incWrapped()
  console.log(counter === 0, counter)
  await delay(200)
  incWrapped()
  console.log(counter === 0, counter)
  await delay(200)
  incWrapped()
  console.log(counter === 0, counter)
  await delay(200)
  incWrapped()
  console.log(counter === 0, counter)
  await delay(700)
  console.log(counter === 1, counter)
}

debug()

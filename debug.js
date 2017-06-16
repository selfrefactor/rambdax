const R = require("./rambdax")
function throttle (callback, limit) {
    var wait = false;                  // Initially, we're not waiting
    return function () {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback.call();           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(function () {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}

let counter = 0

const inc = () => {
  counter++
}

const delay = ms => new Promise(resolve => {
  setTimeout(resolve,ms)
})

const debug = async () => {
  const incWrapped = throttle(inc,1000)
  await delay(500)
  incWrapped()
  incWrapped()
  incWrapped()
  console.log(counter === 1)
  await delay(1500)
  incWrapped()
  console.log(counter === 2, counter)
}

debug()
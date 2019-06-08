function compose (...fns) {
  return (...args) => {
    const list = fns.slice()
    if (list.length > 0) {
      const fn = list.pop()
      let result = fn(...args)
      while (list.length > 0) {
        result = list.pop()(result)
      }

      return result
    }

    return undefined
  }
}

const pipe = (...fns) => compose(...fns.reverse())

function piped(...inputs){
  const [ input, ...fnList ] = inputs

  return pipe(...fnList)(input)
}

function alternatingSort(a) {
  let counter = -1
  let flag = true
  let mark = -Infinity
  while(counter < a.length || !flag){
    counter++
    const current = counter %2 === 0 ? a[counter] : a[a.length - 1 - counter]
    console.log({current, counter, mark})
    if(mark < current) {
      mark = current
    }else{
      flag = false
    }
  }

  return flag
}

export function defaultToWhen(defaultArgument, fn, ...inputArguments) {
  if(arguments.length === 2){
    return (...inputArgumentsHolder) => defaultToWhen(
      defaultArgument, 
      fn,
      ...inputArgumentsHolder
    )
  }
  
  const limit = inputArguments.length - 1
  let len = limit + 1
  let ready = false
  let holder

  while(!ready){
    const instance = inputArguments[limit - len  + 1]

    if(len === 0){
      ready = true
    }else if(fn(instance) === true){
      holder = instance
      ready = true
    }else{
      len = len - 1
    }
  }

  return holder === undefined ?
    defaultArgument :
    holder
}

function once(fn,inputArguments){
  let result
  if(inputArguments === undefined){
      return inputArgumentsHolder => {
        if(result === undefined){
          result = fn(inputArgumentsHolder)  
        }
        
        
        return result
      }
  }
  
  return result
}

module.exports = once
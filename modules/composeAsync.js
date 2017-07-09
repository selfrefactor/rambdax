const R = require("rambda")

const composeAsync = (...inputArguments) => {
  try{

    return async function(startArgument){
      let argumentsToPass = startArgument

      while(inputArguments.length!==0){
        const fn = inputArguments.pop()
        if(R.type(fn) === "Async"){
          argumentsToPass = await fn(argumentsToPass)
        }else if(R.type(fn) === "Promise"){
          argumentsToPass = await fn(argumentsToPass)
        }else{
          argumentsToPass = fn(argumentsToPass)
        }
      }

      return argumentsToPass
    }
  }catch(err){
    throw new Error(err)
  }
}

module.exports = composeAsync

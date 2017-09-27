const R = require("rambda")
const log = require("log-fn")

const composeAsync = (...inputArguments) => {
  try{

    return async function(startArgument){
      let argumentsToPass = R.type(startArgument) === "Async"  ?
        await startArgument() :
          R.equals(startArgument.toString(),"[object Promise]") ?
          await startArgument :
          startArgument

      while(inputArguments.length!==0){
        console.log(argumentsToPass)
        const fn = inputArguments.pop()
        if(R.type(fn) === "Async"){
          argumentsToPass = await fn(argumentsToPass)
          log(`async | ${fn.toString()} ${fn.toString().startsWith("async")}`,"box")
        }else if(R.type(fn) === "Promise"){
          log(`promise | ${fn.toString()} ${argumentsToPass}`,"box")

          argumentsToPass = await fn(argumentsToPass)
        }else{
          log(`plain ${fn.toString()} ${argumentsToPass}`,"box")

          argumentsToPass = fn(argumentsToPass)
        }
      }
      return argumentsToPass
    }
  }catch(err){
    throw new Error(err)
  }
}


const delayAsync = async ms => delay(ms)

const delay = ms => new Promise(resolve=>{
  setTimeout(function () {
    log({ms})
    resolve(ms+110)
  }, ms);
})

const a = async () => composeAsync(
  a => a -1000,
  a => a,
  async a => delayAsync(a),
  a => a+11
)(delay(20))

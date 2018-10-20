import { range, type } from 'rambda'
import { delay } from './delay'
import { isPromise } from './isPromise'
import { isFunction } from './isFunction'


export function waitFor (
    condition,
    howLong,
    loops = 10
  ){
    
    const passPromise = isPromise(condition)
    const interval = Math.floor(howLong/loops)
    console.log({type: type(condition), passPromise});
    
    if(!passPromise && isFunction(condition)){
      return async (...inputs) => {
        
        for (const i of range(0,loops)) {
          
          const resultCondition = condition(...inputs)
          
          if(resultCondition === false){
            await delay(interval)
          }else{
            return resultCondition
          }
        }
        
        return false
      }
    }

    if(!isPromise) throw new Error('R.waitFor')

    return async (...inputs) => {
      console.log(2);
        
      for (const i of range(0,loops)) {
        
        const resultCondition = await condition(...inputs)
        console.log({resultCondition});
        

        if(resultCondition === false){
          await delay(interval)
        }else{
          return resultCondition
        }
      }
      
      return false
    }


}
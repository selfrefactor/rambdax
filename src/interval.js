import { take } from './rambda/take'
import { shuffle } from './shuffle'

// NODOCS
const uuidList = '0123456789qwertyuiopasdfghjklzxcvbnm'.split('')

function uuid(){
  return take(5,shuffle(uuidList).join(''))
}

const holder = {}

export function interval ({fn,ms,whenStop}){
  const key = uuid()
  return new Promise(resolve => {
    holder[key] = setInterval(()=>{
      if(whenStop() === true){
        clearInterval(holder[key])
        resolve()
      }else{
        fn()
      }
    }, ms)
  })
}
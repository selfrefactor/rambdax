import { isFunction } from './isFunction'
import { isPromise } from './isPromise'

// NODOCS
export function tryCatch (fn,fallback){
  if(!isFunction(fn)){
    throw new Error(
      `R.tryCatch | typeFn '${typeFn}'`
    )
  }
  const passFallback = isFunction(fallback)

  if(!isPromise(fn)){
    return (...inputs) => {
      try {
         return fn(...inputs)
      } catch (e) {
        return passFallback ?
          fallback(...inputs) :
          fallback
      }
    }
  }
  
  return async (...inputs) => {
    try {
        const result = await fn(...inputs)

        return result
    } catch (e) {      
      if(!passFallback) return fallback
      
      if(!isPromise(fallback)){
        return fallback(...inputs) 
      }

      const fallbackResult = await fn(...inputs)

      return fallbackResult
    }
  }
}
import { isValid } from './isValid'

export function isAttach(){
  if (Object.prototype.is !== undefined){
    return false
  }

  Object.defineProperty(Object.prototype, 'is', {
    value : function(schema){
      return isValid({
        input  : { isProp : this },
        schema : { isProp : schema },
      })
    },
    writable     : true,
    configurable : true,
  })

  return true
}

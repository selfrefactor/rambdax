import {compose} from './rambda/compose'
import {last} from './rambda/last'
import {init} from './rambda/init'

// NODOCS
export function composed (...inputs){ 

  return compose(...init(inputs))(last(inputs))
}
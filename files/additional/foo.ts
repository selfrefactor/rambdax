import {omit} from 'rambda'

interface B{
  b:number
}
interface A extends B{
  a: number
}

const a:B  = omit('a',{b:2})

a.b
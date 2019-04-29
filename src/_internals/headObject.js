import { type } from '../rambda/type'

export function headObject(x){
  if (type(x) !== 'Object') throw new Error('R.headObject.type')
  const [ tag, no ] = Object.keys(x)
  if (tag === undefined) throw new Error('R.headObject.less')
  if (no !== undefined) throw new Error('R.headObject.more')

  return {
    prop  : tag,
    value : x[ tag ],
  }
}

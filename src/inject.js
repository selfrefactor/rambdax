import { replace } from './rambda/replace'

export function inject(injection, marker, content, beforeFlag = false){
  return replace(
    marker,
    beforeFlag ?
      `${ injection }${ marker }` :
      `${ marker }${ injection }`,
    content
  )
}

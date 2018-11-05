import { replace } from './rambda/replace'

export function inject(injection, marker, content) {
  return replace(marker, `${ marker }${ injection }`, content)
}

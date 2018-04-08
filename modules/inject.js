import { replace } from 'rambda'

export default function inject(
  injection,
  marker,
  content
){

  return replace(
    marker,
    `${marker}${injection}`,
    content
  )
}
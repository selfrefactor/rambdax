import { replace } from 'rambda'

export function inject (
  injection,
  marker,
  content
) {
  return replace(
    marker,
    `${ marker }${ injection }`,
    content
  )
}

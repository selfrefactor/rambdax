import { pipe } from './rambda/pipe'

//NODOCS
export function piped(...inputs) {
  const [input, ...fnList] = inputs

  return pipe(...fnList)(input)
}

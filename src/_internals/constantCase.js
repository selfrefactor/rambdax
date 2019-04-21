const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g

export function constantCase(input){
  return input
    .match(WORDS)
    .map(x => x.toUpperCase())
    .join('_')
}

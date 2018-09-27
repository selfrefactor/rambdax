function multilineFn (str, glue) {
  return str.split('\n')
    .filter(x => x.trim().length > 0)
    .map(x => x.trim())
    .join(glue ? glue : ' ')
}

export default function multiline (input, glue) {
  if (typeof input === 'string') { return multilineFn(input, glue) }

  return multilineFn(input[ 0 ])
}

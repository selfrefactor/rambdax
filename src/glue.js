export function glue(input, glue) {
  return input
    .split('\n')
    .filter(x => x.trim().length > 0)
    .map(x => x.trim())
    .join(glue !== undefined ? glue : ' ')
}

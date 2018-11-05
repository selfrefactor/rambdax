const getOccurances = input => input.match(/{{[_a-zA-Z0-9]+}}/g)

const getOccuranceProp = occurance =>
  occurance.replace(/{{|}}/g, '')

const replace = ({ inputHolder, prop, replacer }) =>
  inputHolder.replace(`{{${ prop }}}`, replacer)

export function template(input, templateInput) {
  const occurances = getOccurances(input)
  if (occurances === null) return input

  let inputHolder = input
  for (const occurance of occurances) {
    const prop = getOccuranceProp(occurance)
    const replacer = templateInput[ prop ]

    if (replacer === undefined) continue
    inputHolder = replace({
      inputHolder,
      prop,
      replacer,
    })
  }

  return inputHolder
}

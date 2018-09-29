const getOccurances = input => 
  input.match(/{{.+}}/g)

const getFirstOccurance = input => {
  const [matched] = input.match(/{{.+}}/)

  const prop = matched.replace(
    /{{|}}/g,
    ''
  )
} 

const replaceFirstOccurance = (input, replacer) => {
  return input.replace(
    /{{.+}}/,
    replacer
  )
} 

export default function template(input,templateInput){
  const occurances = getOccurances(input)
  console.log(occurances)
  if(occurances === null ) return input
  return
}


export function splitEveryWhen(predicate, input){
  if (arguments.length === 1){
    return xHolder => splitEveryWhen(num, xHolder)
  }

  const answer = []
  let holder = []

  input.forEach((charOrAny, i) => {
    const maybeAnswer = predicate(
      charOrAny,
      [ ...holder, charOrAny ],
      answer,
      i
    )
    if (maybeAnswer === true){
      answer.push(holder)
      holder = []
    } else if (input.length === i + 1){
      holder.push(charOrAny)
      answer.push(holder)
    } else if (maybeAnswer === false){
      holder.push(charOrAny)
    } else {
      holder = []
      answer.push(maybeAnswer)
    }
  })

  return answer
}

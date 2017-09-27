export default function when(condition, whenTrueFn){
  if(whenTrueFn === undefined){
    return whenTrueFnHolder => when(condition, whenTrueFnHolder)
  }

  return input => {
    if(condition(input) === true){
      return whenTrueFn(input)
    }
    return input
  }
}

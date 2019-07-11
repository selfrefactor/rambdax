export function toDecimal(number, charsAfterDecimalPoint = 2){
  return Number(parseFloat(String(number)).toFixed(charsAfterDecimalPoint))
}

export function sum(list){
  return list.reduce(
    (prev, current) => prev + current,
    0
  )
}

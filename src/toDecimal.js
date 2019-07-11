export function toDecimal(number, charsAfterDecimalPoint = 2){
  return parseFloat(String(number))
}

export function sum(list){
  return list.reduce(
    (prev, current) => prev + current,
    0
  )
}

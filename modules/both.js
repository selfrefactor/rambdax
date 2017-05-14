function both (firstFn, secondFn, input) {
  if (secondFn === undefined) {
    return (secondFnHolder, inputHolder) => both(firstFn, secondFnHolder, inputHolder)
  } else if (input === undefined) {
    return inputHolder => both(firstFn, secondFn, inputHolder)
  }

  return firstFn(input) === true && secondFn(input) === true
}

module.exports = both

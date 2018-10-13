export function when(condition, whenTrueFn) {
  if (whenTrueFn === undefined) {
    return whenTrueFnHolder => when(condition, whenTrueFnHolder)
  }

  return input => {
    const flag = typeof condition === 'boolean' ?
      condition :
      condition(input)

    if (flag) {
      return whenTrueFn(input)
    }

    return input
  }
}

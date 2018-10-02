export function less (x, y) {
  if (y === undefined) {
    return yHolder => less(x, yHolder)
  }

  return y < x
}

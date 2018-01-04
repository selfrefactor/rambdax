export default function greater (x, y) {
  if (y === undefined) {
    return yHolder => greater(x, yHolder)
  }

  return y > x
}

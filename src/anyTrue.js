export function anyTrue(...inputs) {
  let counter = 0
  while (counter < inputs.length) {
    if (inputs[ counter ]) {
      return true
    }
    counter++
  }

  return false
}

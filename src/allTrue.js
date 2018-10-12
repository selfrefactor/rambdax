export function allTrue(...inputs) {
  //TODO escape early

  return inputs.filter(Boolean).length === inputs.length
}

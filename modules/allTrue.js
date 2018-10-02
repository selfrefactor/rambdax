export function allTrue (...inputs) {
  return inputs.filter(Boolean).length === inputs.length
}

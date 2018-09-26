export function allTrue(...inputs){
  if(inputs.length === 0) return true
  
  return inputs.filter(Boolean).length === inputs.length
}

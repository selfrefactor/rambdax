export function allFalse(...inputs){
  if(inputs.length === 0) return true
  
  return inputs.filter(
    x => Boolean(x) === false
  ).length === inputs.length
}

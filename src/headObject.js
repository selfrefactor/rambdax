export function headObject(input){
  const [ head ] = Object.entries(input)
  if (!head) return {
    prop  : undefined,
    value : undefined,
  }

  return {
    prop  : head[ 0 ],
    value : head[ 1 ],
  }
}

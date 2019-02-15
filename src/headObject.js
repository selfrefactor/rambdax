export function headObject(input){
  const [ head, _ ] = Object.entries(input)
  if (!head) return {
    prop  : undefined,
    value : undefined,
  }
  if (_) throw new Error('R.headObject expects object with only one key')

  return {
    prop  : head[ 0 ],
    value : head[ 1 ],
  }
}

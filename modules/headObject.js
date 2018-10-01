export default function headObject(x){
  const [tag] = Object.keys(x) 
  if(tag === undefined) throw new Error('R.headObject')
  
  return {prop: tag, value: x[tag]}
}
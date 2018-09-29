export default function defaultWhen (fn, fallback, input) {
  if(arguments.length === 2){
    return inputHolder => defaultWhen(fn, fallback, inputHolder)
  }

  return Boolean(fn(input)) ? 
    input :
    fallback
}

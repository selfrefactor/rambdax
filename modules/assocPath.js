export default function assocPath(path, x, obj){
  if(arguments.length === 2){
    return objHolder => assocPath(path, x, objHolder)
  }else if(arguments.length === 1){
    return (xHolder,objHolder => assocPath(path, x, objHolder)

  }
  return x
}
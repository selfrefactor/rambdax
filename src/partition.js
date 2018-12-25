function whenObject(rule, hash){
  const yes = {}
  const no = {}
  Object.entries(hash).forEach(([prop, value]) => {
    if(rule(value, prop)){
      yes[prop] = value
    }else{
      no[prop] = value
    }
  })

  return [yes, no]
}

export function partition (rule,list){
  if(arguments.length === 1){
    return listHolder => partition(rule, listHolder)
  }
  if(!Array.isArray(list)) return whenObject(rule, list)
  
  const yes = []
  const no = []
  let counter = -1

  while(counter++ < list.length-1){
    if(rule(list[counter], counter)){
      yes.push(list[counter])
    }else{
      no.push(list[counter])
    }
  }

  return [yes, no]
}
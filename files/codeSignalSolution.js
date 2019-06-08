function oddNumbersBeforeZero(sequence) {
  let counter = -1
  let setHolder = new Set()
  let holder = []
  const toReturn = []
  while (counter < sequence.length -1) {
    counter++
    const instance = sequence[counter]
    
    if(instance === 0){
      const result = holder.filter(x => x %2 === 0)

      toReturn.push(result.length)
    }else{
      holder.push(instance)
    }
  }    

  return toReturn
}

function when(rule, fn){
  if(rule === undefined){
    return ruleHolder => when(ruleHolder, fn)
  }
  
  return input => {
    if(rule(input) === true){
      return fn(input)
    }
    return input
  }
}

module.exports = when
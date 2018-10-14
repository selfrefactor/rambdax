let holder = {}

export function okInit(rules){
  if (!rules) throw new Error('R.okInit !rules')
  if (rules._internal) return holder

  holder = rules
}

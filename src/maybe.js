export function maybe (ifRule,whenIf,whenElse){ 
  return ifRule ?
    whenIf :
    whenElse
}
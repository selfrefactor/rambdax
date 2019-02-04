export function nextIndex(index, list){
  const newIndex = index === list.length - 1 ?
    0 :
    index + 1

  return newIndex
}

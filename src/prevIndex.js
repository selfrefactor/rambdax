export function prevIndex(index, list){
  const newIndex = index === 0 ?
    list.length - 1 :
    index - 1

  return newIndex
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function store() {
  if (sessionStorage.viewedItems && localStorage.dumpertPlusPlusViewedItems) {
    const sessionViewedItemsArray = sessionStorage.viewedItems.split(',')
    const localViewedItemsArray = localStorage.dumpertPlusPlusViewedItems.split(',')
    const mergedArray = localViewedItemsArray.concat(sessionViewedItemsArray)
    const uniqueArray = mergedArray.filter(onlyUnique)
    const uniqueString = uniqueArray.toString()
    localStorage.dumpertPlusPlusViewedItems = uniqueString
  }
  
  if (sessionStorage.viewedItems && !localStorage.dumpertPlusPlusViewedItems) {
    localStorage.dumpertPlusPlusViewedItems = sessionStorage.viewedItems
  }
  
  if (!sessionStorage.viewedItems && localStorage.dumpertPlusPlusViewedItems) {
    sessionStorage.viewedItems = localStorage.dumpertPlusPlusViewedItems
  }
}
store()

window.addEventListener('beforeunload', store)
window.addEventListener('click', store)
// console.log('dikke tieten')

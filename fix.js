function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function storeViewedVideos() {
  if (sessionStorage.viewedItems && localStorage.dumpertPlusPlusViewedItems) {
    const sessionViewedItemsArray = sessionStorage.viewedItems.split(',')
    const localViewedItemsArray = localStorage.dumpertPlusPlusViewedItems.split(',')
    const mergedArray = localViewedItemsArray.concat(sessionViewedItemsArray)
    const uniqueArray = mergedArray.filter(onlyUnique)
    const uniqueString = uniqueArray.toString()
    localStorage.dumpertPlusPlusViewedItems = uniqueString
    sessionStorage.viewedItems = localStorage.dumpertPlusPlusViewedItems
  }
  
  if (sessionStorage.viewedItems && !localStorage.dumpertPlusPlusViewedItems) {
    localStorage.dumpertPlusPlusViewedItems = sessionStorage.viewedItems
  }
  
  if (!sessionStorage.viewedItems && localStorage.dumpertPlusPlusViewedItems) {
    sessionStorage.viewedItems = localStorage.dumpertPlusPlusViewedItems
  }
}

function scrollToLocation(){
  window.scrollTo(0,  sessionStorage.scrollLocation)
}

function setScrollLocation(){
  const scroll = this.scrollY
  if(scroll != 0) {
    sessionStorage.scrollLocation = scroll
  }
}
window.addEventListener('beforeunload', storeViewedVideos)
window.addEventListener('load', scrollToLocation)
window.addEventListener('click', storeViewedVideos)
window.addEventListener("scroll", setScrollLocation)
window.addEventListener('fullscreenchange', scrollToLocation)
storeViewedVideos()
// console.log('dikke tieten')

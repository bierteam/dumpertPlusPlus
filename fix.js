function storeViewedVideos() {
  if (sessionStorage.viewedItems && localStorage.dumpertPlusPlusViewedItems) {
    const sessionViewedItemsArray = sessionStorage.viewedItems.split(',')
    const localViewedItemsArray = localStorage.dumpertPlusPlusViewedItems.split(',')
    localStorage.dumpertPlusPlusViewedItems = mergeArraysToString(sessionViewedItemsArray, localViewedItemsArray)
    sessionStorage.viewedItems = localStorage.dumpertPlusPlusViewedItems
  }
  
  syncViewedItems()
}

function mergeArraysToString(viewItems, localItems){
  return [...new Set([...viewItems, ...localItems])].toString()
}

function syncViewedItems(){
  if (sessionStorage.viewedItems && !localStorage.dumpertPlusPlusViewedItems) {
    localStorage.dumpertPlusPlusViewedItems = sessionStorage.viewedItems
  }

  if (!sessionStorage.viewedItems && localStorage.dumpertPlusPlusViewedItems) {
    sessionStorage.viewedItems = localStorage.dumpertPlusPlusViewedItems
  }
}

function scrollToLocation(){
  window.scroll({
    top: getScrollLocation(),
    left: 0,
    behavior: 'auto'
  })
}

function setScrollLocation(){
  if (this.scrollY !== 0) {
    sessionStorage.dumpertPlusPlusScrollLocation = this.scrollY
  }
}

function getScrollLocation(){
  return sessionStorage.dumpertPlusPlusScrollLocation ? sessionStorage.dumpertPlusPlusScrollLocation : 1
}

window.addEventListener('beforeunload', storeViewedVideos)
window.addEventListener('click', storeViewedVideos)
window.addEventListener('scroll', setScrollLocation)
window.addEventListener('fullscreenchange', scrollToLocation)

storeViewedVideos()

// console.log('dikke tieten')

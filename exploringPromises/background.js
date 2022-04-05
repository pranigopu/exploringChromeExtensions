// To demonstrate that the onMessage event from the popup script is not detected by the background script...
console.log("Background service worker, check.");

chrome.action.onClicked.addListener(shout);
function shout(tab){
    chrome.tabs.sendMessage({"a": 2, "b": 5});
}
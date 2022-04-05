console.log("Background service worker, check.");

chrome.runtime.onMessage.addListener(respondToMessage);
function respondToMessage(message, sender, sendResponse){
    console.log("Message received:", message);

    // Sending response back to content.js
    sendResponse("Hello from the background script!");
}
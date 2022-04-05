console.log("Content script, check.");

chrome.runtime.onMessage.addListener(respondToMessage);
function respondToMessage(message, sender, sendResponse){
    console.log("Message received:", message)
    message.sentFrom = "content.js";

    // Sending message ot background.js and getting response
    chrome.runtime.sendMessage(
        message,
        getResponse);
    function getResponse(response){
        console.log("Response:", response);
    }

    // Sending response back to popup.js
    sendResponse("Hello from the content script!");
}
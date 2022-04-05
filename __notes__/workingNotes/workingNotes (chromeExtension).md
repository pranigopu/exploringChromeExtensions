# WORKING NOTES (Chrome extension)

## Note on browser actions and accessing action events
In order to access the events of browser and the methods associated with it, you must add an "action" field in the manifest of the extension. Otherwise, the return values of API calls from the `chrome.action` API will return NULL values, and you will not be able to handle events. Hence, for messaging the content script from the pop-up

## Effect of pop-ups on browser actions
If you add a pop-up for your extension, then clicking the button of the extension will not trigger the "onClicked" event.

## Note on content scripts & background service workers
Content script actions refect on the JavaScript console of the active web page. However, background service worker actions do not. This is because the debug console's scope is the contents of the webpage.
<br><br>
Furthermore, a content script cannot detect browser actions. To allow a background service worker to communicate to the content script, we use the messaging services of the chrome.runtime API provided my chrome.
<br><br>
A content script can access the DOM of the webpage that has been loaded (provided the extension is active), but has access to only a limited subset of the browser's (JavaScript) APIs. A background service worker has access to all the browser's (JavaScript) APIs, but cannot directly access the DOM of any webpage. This is why interaction between the content and background service worker is necessary to achieve more functionalities in your browser extension.

### References
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts

## Making content script react to browser actions
If you want to execute some code in the content script (to manipulate the DOM) whenever the user triggers the browser action, you need to use "messaging". A message is a JavaScript object (of your own design) that you send from the background service worker / background script to the content script. For example:
```
// IN BACKGROUND SCRIPT
function buttonClicked(tab){
  var msg = {
    message: "user clicked!"
  }
  chrome.tabs.sendMessage(tab.id, msg);
}
```
Then, in the content script, you can receive the message and perform an action. Lots of data comes in with the message, but the actual object you send is the one denoted by the request variable. For example:
```
// IN CONTENT SCRIPT
// Listen for messages
chrome.runtime.onMessage.addListener(receiver);

// Callback for when a message is received
function receiver(request, sender, sendResponse) {
  if (request.message === "user clicked!") {
    // Do something!
  }
}
```
SEE ALSO:
- Omnibox

### REFERENCES:
- https://shiffman.net/a2z/chrome-ext/

## Messaging between tab and non-tab contexts
Background service worker does not run with respect to a particular tab, hence is in a non-tab context. Content script runs with respect to particular tabs i.e. each open tab has a separate instance of the content script running for it (provided the browser extension is active), hence is in a given tab's context. Hence, to communicate between the background service and a content script, depending on which is the sender and which is the receiver. For sending a message from background service worker to content script, use `chrome.tabs.sendMessage`, sending a message to a particular tab (i.e. a particular instance of the content script). For sending a message from content script to background service worker, use `chrome.runtime.sendMessage`, sending the message in a non-tab context.

## Alerts
Any script (popup, content or background) can display alerts in the main window.
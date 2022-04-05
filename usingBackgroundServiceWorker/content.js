console.log("Hello there, young one.");
//========================
/*
We are calling the chrome.runtime API.
We are adding a listener for the event 'onMessage'.
This event is triggered when a message is sent in a script file of the extension.
This event is defined by the API.
*/
chrome.runtime.onMessage.addListener(ear);
//========================
/*
Any callback of this listener accepts three arguments.
1: the actual message object / data sent
2: the sender's information
3: whether a response must be sent back to the sender upon receiving the message
------------------------
NOTE ON MESSAGE SENT
In certain contexts, the message argument can also be interpreted as a request.
For example, the message sender requests something, which this listener can respond to.
Hence, we often see this argument given as 'request' in various documentations.
------------------------
This arguments are optional, and you can give the arguments any name.
Even if no arguments are given, the callback will execute upon the 'onMessage' event triggering.
*/
function ear(message, sender, sendResponse) {
    // REFERENCE STUFF AND MESSAGE RECEIVED
    console.log("Message text:", message.text);
    console.log("Source tab:", message.source);
    /*
    NOTE ON MESSAGE ATTRIBUTES
    The message attributes 'text' and 'source' are defined
    within the object that was sent as a message in the background script.
    The same message could have been defined with different attributes,
    or may simply have been a primitive data type, such as a string or an integer.
    */
}
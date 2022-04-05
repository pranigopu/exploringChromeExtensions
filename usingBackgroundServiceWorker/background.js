console.log("Hey... It's free real estate!");
//========================
/*
We are calling the chrome.action API.
We are adding a listener for the event 'onClicked'.
This event is defined by the API.
*/
chrome.action.onClicked.addListener(mouth);
//========================
/*
Any callback of this listener accepts the tab's info as argument.
This is an object with info of the tab where the browser action was done.
This argument is optional, and you can give it argument any name.
*/
function mouth(t) {
    //------------------------
    // REFERENCE STUFF ON THE CONSOLE
    console.log("Sending message!");
    console.log("Active tab info:", t);
    console.log("Active tab ID:", t.id);
    //------------------------
    // SENDING THE MESSAGE
    /*
    The message can be any object or data type, such as a string or an integer.
    For maximum demonstration purposes, our message is an object.
    The object or data type's attributes will be passed on to the argument
    of the callback function within the 'onMessage' listener of other scripts in the extension.
    */
    message = {
        "text": "It's over Anakin! I have the high ground!",
        "source": t.id
    }
    /*
    We are calling the chrome.tabs API.
    We are sending a message to the tab associated to t.
    This is the same tab in which the browser action was done.
    */
    chrome.tabs.sendMessage(t.id, message);
    /*
    The first argument is the tab ID where the message must be sent.
    The tab ID specifies the webpage in which content script must react (if at all).
    Note that for a content script to run in a tab, the extension must be active there.
    
    For example, we can do...
    chrome.tabs.sendMessage(t.id + 1, message);
    ... to send a message to the next created tab to the current tab (if existing).
    */

    /*
    NOTE ON SENDING MESSAGES
    In one callback, it seems that only one message can be send.
    Trying to send multiple messages (to multiple different tabs)
    only results in the message being received in one tab.
    Note that a callback can include more instructions after sending the message.
    For demonstration, we have the following instruction...
    */
    console.log("Still here...");
}
// Defining the server address
let serverhost = "http://127.0.0.1:8000/"; // localhost address
// NOTE: localhost => my own computer

// Checking if background service worker is loaded properly
console.log("Background service worker, check.");

// Listener
chrome.runtime.onMessage.addListener(respondToMessage);
function respondToMessage(message, sender, sendResponse){
    console.log("Message received:", message);
    //------------------------------------
    // Defining endpoint URL
    /*
    Accessing the URL of the
    Django web framework designed
    backend's app's particular view functions
    (giving the user's input as the userinput option in the request)

    NOTE: For the URL to work, the server should be running!
    */
    let url = serverhost + "alpha/"; // Base URL, including the web application URL;

    // Endpoint URL based on the requested service (from the popup script)
        url = url + message.operation + "?targeturl=" + message.targeturl + "&userinput=" + message.userinput;
    // Viewing the URL for confirmation in the console
    console.log("Endpoint URL:", url)
    //------------------------------------
    // Sending response back to popup.js
    fetch(url)
    // Resolving the promise containing the Response object
    .then(function(response){
        // Inspecting return value of fetch in the console
        console.log("Response from fetch: ", response)
        /*
        We see that response is a Response object (which was contained in the promise object returned by fetch).
        This object contains the JSON data required, obtained below...
        */
        
        // Obtaining a promise containing the JSON object within the Response object
        res = response.json();

        // Inspecting res in console
        console.log("JSON from response: ", res);
        /*
        We see that res i.e. the return value of response.json()
        is a promise object, that is in the 'pending' state.
        To resolve this promise object, we use the following .then call.
        The resolution of this object will give the JSON data required.
        */
    
        // Returning this promise object makes it accessible outside the current scope
        // Hence we can apply the following .then call
        return res;
    })
    // Resolving the promise containing the JSON object
    .then(d => {
        console.log("JSON data: ", d);
        sendResponse(d);
    });
    /*
    SIDE NOTE
    // Alternate codes for...
    .then(function(response){
        return response.json();
    })
    //____________
    //1.
    .then(response => {return response.json()})
    //____________
    //2.
    .then(response => response.json())
    */
    return true;
}

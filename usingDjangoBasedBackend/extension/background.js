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
    let url = serverhost + "alpha/" // Base URL, including the web application URL;

    // Endpoint URL based on the requested service (from the popup script)
    if(message.doFunction === "getVowels"){
        // GET VOWELS VIEW FUNCTION...
        url = url + "getvowels?userinput=" + message.userinput;
    } else if(message.doFunction === "scrape"){
        // PYTHON WEB SCRAPER VIEW FUNCTION...
        url = url + "scrape?targeturl=" + message.targeturl + "&userinput=" + message.userinput;
    }
    // Viewing the URL for confirmation in the console
    console.log("Endpoint URL:", url)
    //------------------------------------
    // Sending response back to popup.js
    fetch(url)
    .then(function(response){
        res = response.json();
        // Inspecting res in console
        console.log(res);
        /*
        We see that res i.e. the return value of response.json()
        is a promise object, that is in the 'pending' state.
        To resolve this promise object, we use the following .then call.
        */
    
        // Returning this promise object makes it accessible outside the current scope
        // Hence we can apply the following .then call
        return res;
    })
    .then(d => {
        console.log(d);
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
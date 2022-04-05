document.querySelector("#submit").addEventListener("click", react);
// For querying ID, we use '#'. For querying classes, we would use '.'.
function react(){
    // OBTAINING TAB ID'S FOR PASSING MESSAGE TO CONTENT SCRIPT
    // (this is not needed for passing message to background service worker)
    
    /*
    To get current tab, since popup is running in a non-tab context, we use chrome.tabs.query.
    The main arguments are chrome.tabs.query(object queryInfo, function callback).
    Returns object with info on the tabs selected based on properties specified in queryInfo.
    If no properties are specified, info on all open tabs are returned.
    */
    properties = {
        active: true, // Must be active tab
        currentWindow: true // Tab must be from current window
    }
    chrome.tabs.query(properties, getTabs); // getTabs defined below
    /*
    The callback of this query accepts the info of tabs as an argument.
    Through this, the required object containing tab info can be obtained within the callback.
    Note that the argument's scope is within the function, and you cannot use it outside.
    */

    /*
    NOTE:
    Here, we have done all the messaging within the 'getTabs' callback that we have defined here.
    However, since messaging to background script does not require any tab ID, we obviously don't need it for that.
    Nevertheless, I have done the following simply because it was more convenient to lay out.
    */
    function getTabs(tabs){
        console.log("Getting tabs...");
        console.log(tabs)
        
        // Creating message data
        let userinput = document.querySelector("#name").value;
        let message = {
            "name": userinput,
            "activeTab": tabs[0].id,
            "sentFrom": "popup.js"
        };
        //====================================
        // Options based on user's input...
        
        if(userinput === "content"){
            // POPUP TO CONTENT SCRIPT (+ RESPONSE)
            //------------------------
            // Sending message to active tab getting response
            // (i.e. to content.js that is injected in active tab)
            chrome.tabs.sendMessage(
                tabs[0].id,
                message,
                getResponse);
            function getResponse(response){
                document.querySelector("#blank").innerHTML = response;
            }
        } else if(userinput === "background"){
            // POPUP TO BACKGROUND SERVICE WORKER (+ RESPONSE)
            //------------------------
            // Sending message to non-tab scripts and getting response
            // (i.e. to background.js)
            chrome.runtime.sendMessage(
                message,
                getResponse);
            function getResponse(response){
                document.querySelector("#blank").innerHTML = response;
            }
        } else{
            // Simply changing some aspect of the popup page
            document.querySelector("#blank").innerHTML = "Hello there, " + userinput;
        }
    }
}
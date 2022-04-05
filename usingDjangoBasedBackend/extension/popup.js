document.querySelector("#getvowels").addEventListener("click", getVowels);
document.querySelector("#scrape").addEventListener("click", scrape);
// For querying ID, we use '#'. For querying classes, we would use '.'.
//================================================
// GET VOWELS
function getVowels(){
    //------------------------------------
    // Creating message
    let userinput = document.querySelector("#userinput").value;
    // Making the message in a generalised format
    message = {
        "doFunction": "getVowels",
        "userinput": userinput
    }
    //------------------------------------
    // Sending message to the service worker & getting response
    chrome.runtime.sendMessage(
        message,
        getResponse);
    function getResponse(response){
        console.log(response);
        /*
        NOTE ON INTENDED RESPONSE'S STRUCTURE
        The structure of the JSON response (return value)
        of the view function in question
        (defined in the website's (backend's) source code) is
        
        {
            "userinput": <user input>,
            "vowels": <vowel list>
        }
        
        Keeping this in mind, we can access the vowel list using
        response.vowels
        */
        document.querySelector("#blank").innerHTML = "Vowels: " + response.vowels;
    }
}
//================================================
// PYTHON WEB SCRAPER
function scrape(){
    //------------------------------------
    // Creating message
    //________________________
    // Obtaining the URL of the current page
    /*
    To do this, we will acquire the information on the current tab
    using chrome.tabs.query. The message will be sent to the background script
    from the callback of this API call.
    */
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function(tabs){
            // Obtaining current tab URL
            console.log("Current tab URL:", tabs[0].url);

            // Creating message
            userinput = document.querySelector("#userinput").value;
            message = {
                "doFunction": "scrape",
                "userinput": userinput,
                "targeturl": tabs[0].url
            }

            chrome.runtime.sendMessage(
                message,
                function(response){
                    console.log("Response received:", response);
                });
        })
}
// Defining the server address
let serverhost = "http://127.0.0.1:8000/" // localhost address
// NOTE: localhost => my own computer

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
        "doFunction": "getVowels", // Not necessary here, but just put for visual parity with the alternative code
        "userinput": userinput
    }
    //------------------------------------
    // Defining endpoint URL
    /*
    Accessing the URL of the
    Django web framework designed
    backend's app's particular view functions
    (giving the user's input as the userinput option in the request)

    NOTE: For the URL to work, the server should be running!
    */
    let url = serverhost + "alpha/getvowels?userinput=" + userinput
    // Viewing the URL for confirmation in the console
    console.log("Endpoint URL:", url)
    //------------------------------------
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
        document.querySelector("#blank").innerHTML = "Vowels: " + d['vowels'];
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
                "doFunction": "scrape", // Not necessary here, but just put for visual parity with the alternative code
                "userinput": userinput,
                "targeturl": tabs[0].url
            }

            //------------------------------------
            // Defining endpoint URL
            /*
            Accessing the URL of the
            Django web framework designed
            backend's app's particular view functions
            (giving the user's input as the userinput option in the request)

            NOTE: For the URL to work, the server should be running!
            */
            let url = serverhost + "alpha/scrape?targeturl=" + message.targeturl + "&userinput=" + message.userinput;
            // Viewing the URL for confirmation in the console
            console.log("Endpoint URL:", url)
            //------------------------------------
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
                console.log("Response received:", response);
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
    )
}
//================================================
/*
NOTE ON THE CUMBERSOME CODE ABOVE
Could I have made a simpler leaner code for the above? For sure.
But the above functions are made separate, despite redundant code,
to outline the separate functionalities very clearly.
*/
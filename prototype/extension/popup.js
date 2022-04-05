document.querySelector("#go").addEventListener("click", makeRequest);

// For querying ID, we use '#'. For querying classes, we would use '.'.
//================================================
function makeRequest(){
    //------------------------------------
    // Checking if the command input is valid
    commands = [
        "scrape",
        "clean",
        "normalize",
        "summarize"];
    usercmd = document.querySelector("#command").value;
    
    // Displaying whether the command is valid or not
    document.querySelector("#blank").innerHTML = " ";
    if(!(commands.includes(usercmd))){
        document.querySelector("#blank").innerHTML = "Invalid command";
        return; // Terminating callback
    }
    //------------------------------------
    // Creating and sending message (if command is valid)
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
                "doFunction": usercmd,
                "userinput": userinput,
                "targeturl": tabs[0].url
            }

            chrome.runtime.sendMessage(
                message,
                function(response){
                    console.log("Response received:", response);
                    /*
                    The response's expected structure is
                    {
                        'process': <text>,
                        'report': <text>
                    }
                    Using this, we do the following...
                    */

                    // Showing whether process was successful or not
                    document.querySelector("#blank").innerHTML = response.report;
                });
        })
}
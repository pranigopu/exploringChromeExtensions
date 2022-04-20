document.querySelector("#go").addEventListener("click", makeRequest);

// For querying ID, we use '#'. For querying classes, we would use '.'.
//================================================
function makeRequest(){
    //------------------------------------
    // Checking if the command input is valid
    // Object relating commands to numbers (allows switch-case based on command later on)
    let commands = [
        "scrape",
        "clean",
        "normalize",
        "summarize"];
    let usercmd = document.querySelector("#command").value;

    // Displaying whether the command is valid or not
    document.querySelector("#blank").innerHTML = " ";
    if(!(commands.includes(usercmd))){
        /*
        Object.keys(commands) returns an array containing
        all the key names of the object 'commands'.
        */

        // Displaying that the given command invalid
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
            let userinput = document.querySelector("#userinput").value;
            let message = {
                "operation": usercmd,
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

                    // Acting based on response
                    // Acting also based on the operation performed
                    // Note that in JavaScript, switch-case works with strings as well.
                    switch(response.operation){
                        case "summarize":
                            // Creating a wordcloud using '.wordcloud/wordcloud2.js'
                            // The above script is included before this popup script in the 'popup.html' file.
                            // Hence, we can access the required functions when the popup page is running.
                            
                            // Creating a canvas object within 'popup.html'
                            // (And adding it to the popup page DOM)
                            // First we check if the element with the required ID already exists
                            let canvas = document.getElementById("wordcloud");
                            // Adding the required canvas element if it doesn't already exist
                            if(canvas == null){
                                canvas = document.createElement("canvas");
                                canvas.id = "wordcloud";
                                document.body.appendChild(canvas);
                            }
                            
                            // Creating wordcloud within above canvas
                            WordCloud(canvas, {list: response.report});
                            /*
                            ALTERNATE CODE FOR CONCEPTUAL CLARITY:
                            WordCloud(document.getElementById('wordcloud'), {list: message.report} );
                            */
                            break;

                        default:
                            // Displaying confirmation
                            document.querySelector("#blank").innerHTML = response.report;
                            break;
                    }
                    // Prompting the background script to save the popup's state after results are obtained
                    // (This helps make the popup page seem persistent)

                });
        })
}
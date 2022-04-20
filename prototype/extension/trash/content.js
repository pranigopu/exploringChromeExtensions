// Checking if content script is loaded properly
console.log("Content script, check.");

// Listening for message (from popup script)
// (chrome.runtime is used since message is coming from a non-tab context i.e. popup)
chrome.runtime.onMessage.addListener(respondToMessage);
function respondToMessage(message, sender, sendResponse){
    console.log(message);
    if(message.operation == "wordcloud"){
        // Creating a wordcloud using '.wordcloud/wordcloud2.js'
        // (This script's functions should be accessible if
        // you included its path as a content script in 'manifest.json')

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
    }
}
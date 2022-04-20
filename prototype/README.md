# Text mining & sentiment analysis extension prototype
## Project aims
Run and view the results of text mining and sentiment analysis functions implemented in a Python backend using a Chrome extension.

## Implementation notes
### Using service worker vs. using popup script
To make the request to the server, we can use any extension script. Using popup script would have been most direct, since messaging would not be necessary, and we can directly show the response in the popup page.
<br><br>
My reason for using background service worker was because a background service worker loads when an event it listens for is triggered, and only halts after the completion of its code's exectution. However, a popup script will only run as long as the popup page is loaded. While in this mini-project, this is not an issue, since the processes happen quite quickly, for more time consuming processes, such as text mining or sentiment analysis, it could be an issue, since closing the popup page would halt those processes.

### Wordcloud script
The JavaScript code for wordcloud was taken from

- https://www.npmjs.com/package/wordcloud

I have modified the installed package, removing all the files I deemed unnecessary and renaming the package directory to simply 'wordcloud'.

#### Accessing through popup script
To access the 'WordCloud' function from 'wordcloud2.js' using the popup script, I simply include the script in 'popup.html' before the popup script. The required canvas element must be created in the popup page's DOM, either dynamically or in the HTML document itself.

#### Accessing through content script
__(And why this approach was abandoned)__ <br><br>
To access the 'WordCloud' function from 'wordcloud2.js' using the content script, I simply added the relative path to 'wordcloud2.js' in the "content_scripts" field of the 'manifest.json' file. Accessing the wordcloud functionalities in the content script was necessary to create and insert a canvas object with the wordcloud within the current webpage's DOM (since the current webpage is not stored locally in the extension's directory, we cannot simply add a script tag with a reference to 'wordcloud2.js' using the relative path).
<br><br>
This approach to a user interface was abandoned due to the following reasons:

- Even if we insert the canvas at the beginning of the current webpage, and even if we do it within a division (div) tag, the result may not appear as desired for every webpage as desired, due to the possible particular features applied for the webpage. For example, when trying to insert the canvas at the beginning of a Wikipedia page's body, the wordcloud display always clashed with the Wikipedia logo at the top left of the page. We could fine-tune our code for Wikipedia, but then we would lose generality.
- As a user, it may be more convenient to have the results always readily accessible in the popup page, and not at the very top of the webpage's body. This inconvenience may occur if the user wishes to scroll around the webpage or go to other tabs but still wishes to have the results easily accessible through the extension's button (that would open the popup page).<br><br> __The issue with a popup page, however, is that a popup page and its script are only loaded when the popup page is opened, and the dynamic results on the page are not persistent. If this issue can be overcome, the popup page interface would be undoubtedly superior, in my eyes.__
- To display the results in the current webpage's DOM, anu open webpage had to be reloaded whenever the extension was reloaded in developer mode. This issue is not going to occur for the end-user of course, since the end-user is not supposed to want to (or be able to) reload the extension as a developer. But this is a minor developer hassle that added to our other woes.
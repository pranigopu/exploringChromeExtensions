# Text mining & sentiment analysis extension prototype
## Project aims
Run and view the results of text mining and sentiment analysis functions implemented in a Python backend using a Chrome extension.

## Implementation notes
### Using service worker vs. using popup script
To make the request to the server, we can use any extension script. Using popup script would have been most direct, since messaging would not be necessary, and we can directly show the response in the popup page.
<br><br>
My reason for using background service worker was because a background service worker loads when an event it listens for is triggered, and only halts after the completion of its code's exectution. However, a popup script will only run as long as the popup page is loaded. While in this mini-project, this is not an issue, since the processes happen quite quickly, for more time consuming processes, such as text mining or sentiment analysis, it could be an issue, since closing the popup page would halt those processes.

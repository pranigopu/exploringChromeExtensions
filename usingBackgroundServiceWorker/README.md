# Extension using a background service worker
## Project aims
Understand how to create and implement a background service worker, and how to send a message from this service worker to a content script. The aim of this project is mainly conceptual, with minimal complexity in terms of coding.
## Code aims
The code will...
- Respond to the extension icon being clicked
- Display active tab details in the service worker debug console
- Send message to the tab where the icon was clicked

Thi message sent to the tab will reflect on the webpage's debug console, due to a listener present in the content script that will react accordingly.
<br><br>
This particular code is designed to work for all URLs, as specified by the manifest. However, you can limit the functioning of this code to certain webpages by mentioning the specific URLs in the "matches" attribute within the "content_scripts" attribute.
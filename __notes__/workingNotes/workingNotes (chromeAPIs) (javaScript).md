# WORKING NOTES (Chrome APIs) (JavaScript)
## NOTE ON NAMING FORMAL ARGUMENTS OF CALLBACKS
The arguments discussed for the callbacks are not keywords, unless otherwise specified, i.e. any name can be given to them, provided they are passed in the appropriate order. However, for convenience, we usually use the above names as the formal arguments of our callback definitions.

## chrome.tabs.getCurrent()
_Why is cannot be used for pop-ups or background service workers..._
<br><br>
`chrome.tabs.getCurrent(function callback)` returns an object containing information on the tab in which the script call is made. It may be undefined if it is called from a non-tab context, such as a background page, background script and pop-up views. Note that to allow the extension to access current tab, you must give the permission 'activeTab' in the 'manifest.json' file.

## chrome.tabs.query()
`chrome.tabs.query(object queryInfo, function callback)` returns objects containing information for every tab that satisfies the properties specified in `queryInfo`. If no properties are specified, it returns objects containing information for every open tab in the browser. Note that

- To allow the extension to access current tab, you must give the permission 'activeTab' in the 'manifest.json' file
- To allow the extension to access all tabs, you must give the permission 'tabs' in the 'manifest.json' file.

## Anatomy of chrome.runtime.sendMessage
_Also applies for chrome.tabs.sendMessage_ <br><br>
`chrome.runtime.sendMessage` can have the following optional arguments:

- message (to be sent)
- response (sent from the receiver)

### response
This argument is a callback, which executes upon receiving a response from the receiver of the message that was sent. It can have at most one argument (you can define more, but they won't be used, since the sent reponse (as seen later) will only contain one argument's worth of data), which will by default store the data passed in the response.
<br><br>
For example...

```
chrome.runtime.sendMessage(
        message,
        getResponse);
// getResponse is a callback defined as follows...
function getResponse(response){
    console.log("Response:", response)
    }
```

## Anatomy of a chrome.runtime.onMessage event listener callback
_Also applies for chrome.tabs.sendMessage_<br><br>
To detect an `onMessage` event, we add a listener for this event using `chrome.runtime.onMessage.addListener(<callback>)`.
<br><br>
The callback (i.e. the function that whose call will be triggered upon event) here has three optional arguments:

- message (also called request, in different contexts)
- sender (information about the sender), which contains
	- message ID
	- message origin _(as URL... is null when message is sent from a non-tab context ex. from a background page)_
	- message tab _(from which message was sent)_
- sendResponse

### sendResponse
This argument is a callback that, if called but undefined, can be used to:

- simply send an acknowledgement response
- send a single object as response

For example, in a background script...

```
chrome.runtime.onMessage.addListener(respondToMessage);
function respondToMessage(message, sender, sendResponse){
    console.log("Message received:", message);
    sendResponse("Hello from the other side!");
}
```

Here, we see that sendResponse has not been defined anywhere, and takes on some default definition. I am not too sure about the exact mechanism.

## Sending multiple messages
I found that, when trying to send messages from popup script to content script and popup script to background service worker within the same event handler, only the message from popup script to background service worker got a response, no matter whether I first messaged the content script or the background service worker. I need to look into this...

## Making cross-origin requests (i.e. from one domain to another)
## Notes on implementation
When trying to make requests from extension scripts (service worker, specifically) I got the following errors
<br>**ERROR 1**

```
Access to fetch at 'http://127.0.0.1:8000/alpha/getvowels?userinput=Prani' from origin 'chrome-extension://pehhkdndjcmeebmpmkeofnbaiideooeh' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

**ERROR 2**

```
Uncaught (in promise) TypeError: Failed to fetch
```

The latter error is due to the former. Furthermore, I haven't included a **.catch** function for my **fetch** function call, so errors are 'uncaught' and handled automatically.
<br><br>
From these errors and some reading, I learnt that
-  We can make requests from the extension script if we set the 'mode' option in the **fetch** funtion to 'no-cors'<br><br>(**NOTE**:<br> **fetch** has two main arguments, one being the URL to make the requets to, the other being the set of properties to apply to the request... if none are applied, the request is a simple GET request)
-  Requests we make from the extension script using the above option will return an opaque response only i.e. we cannot
  - read response data
  - check request status (to see if it was successful or not)

The above clearly presents an undesirable situation.

### Apparent cause
To prevent leaks of sensitive information, webpages are generally not allowed to fetch cross-origin data. Unless a valid CORS header is present on the response, the page's request will fail with an error like the one above.
<br><br>
A valid CORS header in this case would indicate that the requested resource (in whose response the header would be present) (ex. a server host or website) allows requests from other origins (ex. other server hosts or websites) to access its resources (ex. response data)

### Reiteration of key point and side notes
Just to emphasise the point, the extension package and Django-based backend are stored in and run from different domains, hence a request from the extension scripts to the server web application's service is a cross-origin request.
<br><br>
To allow the cross-origin request (from the extension's scripts) to access the requested resource (i.e. the localhost server's web application's service), the server host (my computer's local IP address) must add the appropriate header to its responses, so that there is no issue according to the CORS policy.

### Solution details
To handle CORS headers in Python, I installed the `django-cors-headers` package. In the Django-based website's configurations directory (i.e. backend/backend), in the 'settings.py' file, I did the following:

- Added `corsheaders` in the `INSTALLED_APPS` list
- Added `corsheaders.middleware.CorsMiddleware` in the `MIDDLEWARE` list
- To allow any possible host (for my website) to add the valid CORS header to the website's responses, I did the following (within the 'settings.py' file)

```
ALLOWED_HOSTS=['*']
CORS_ORIGIN_ALLOW_ALL = True
```

### REFERENCES
- https://www.chromium.org/Home/chromium-security/extension-content-script-fetches/
- https://dzone.com/articles/how-to-fix-django-cors-error

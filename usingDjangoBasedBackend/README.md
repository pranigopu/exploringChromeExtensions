# Learning to make requests to a Django-based backend
## Project aims
Having implemented a simple Django-based website on my own computer (localhost), using an emulated server, I will make requests to particular endpoints (services i.e. view functions) within the web applications contained in the the server from within a Chrome extension. Functionally, the end product here is simply a Chrome extension that uses functions written in Python using the respective URL's of the functions.
<br><br>
Using an external server to host the web applications containing the actual services required for your extension is not ideal, especially on a practical level i.e. if we want to publish our extension as a usable tool. But since much of our testing code is in Python, we have used this as a temporary "proof of concept" kind of solution, using our codes in Python for now the time being before we come up with JavaScript implementations for the same.

## Code aims
- Make a service i.e. view function in the server that takes the 'name' option's value and returns the vowels in the name
- Make a popup interface in the Chrome extension to allow user input
- Message the user input to the service worker
- Make a request from the service worker using the received input
- Obtain the response and send it in a serialised format as a response to the popup script's messaging call
- Display the results within the popup

Additionally, I wanted to add some Python webscraping as a service of the web application, with the service triggered from the extension and the output shown in the computer's terminal.

## NOTE 1: Cross origin request from extension to server
When trying to make requests from extension scripts (service worker, specifically) I got the following errors <br>
<br> **ERROR 1** <br>
```
Access to fetch at 'http://127.0.0.1:8000/alpha/getvowels?userinput=Prani' from origin 'chrome-extension://pehhkdndjcmeebmpmkeofnbaiideooeh' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
<br> **ERROR 2** <br>
```
Uncaught (in promise) TypeError: Failed to fetch
```
<br>
The latter error is due to the former. Furthermore, I haven't included a **.catch** function for my **fetch** function call, so errors are 'uncaught' and handled automatically.
<br><br>
From these errors and some reading, I learnt that

-  We can make requests from the extension script if we set the 'mode' option in the **fetch** funtion to 'no-cors'<br>( **NOTE**: **fetch** has two main arguments, one being the URL to make the requets to, the other being the set of properties to apply to the request... if none are applied, the request is a simple GET request)
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

## NOTE 2: Using service worker vs. using popup script
To make the request to the server, we can use any extension script. Using popup script would have been most direct, since messaging would not be necessary, and we can directly show the response in the popup page. To see this code for the popup script, see 'popup (ALTERNATE).js'.
<br><br>
My reason for using background service worker was because a background service worker loads when an event it listens for is triggered, and only halts after the completion of its code's exectution. However, a popup script will only run as long as the popup page is loaded. While in this mini-project, this is not an issue, since the processes happen quite quickly, for more time consuming processes, such as text mining or sentiment analysis, it could be an issue, since closing the popup page would halt those processes.

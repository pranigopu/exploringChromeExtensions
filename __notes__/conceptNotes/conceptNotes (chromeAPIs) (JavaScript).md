# CONCEPT NOTES (Chrome APIs) (JavaScript)
Chrome APIs are browser APIs available for the client-side scripts (in particular JavaScript codes) that are built into a given web browser (Chrome in our case) that help exposing data from the browser (ex. browser pages, tabs and actions) and computer environment (ex. local databases and scripts) and perform useful operations on them.

## Callback
A callback is any reference to executable code that is passed as an argument to other code. In other words, the other code is expected to call back the code at a given time.

## Promise
A 'Promise' is an object representing the eventual completion or failure of one or more asynchronous operations, such as API calls or HTTP requests. Compared to events and regular callbacks, promises are...

- Easier to manage when dealing with multiple asynchronous operations, where callbacks associated with each operation can create a messy situation and unmanageable code.
- Better at handling errors
- Offer better code readability

Essentially, a promise is a returned object to which you attach callbacks (instead of passing callbacks into a function).

### Advantages of using promises
#### General advantages
- Improves code readability
- Better handling of asynchronous operations
- Better flow of control definition in asynchronous logic
- Better error handling

#### Particular advantages
Unlike regular callbacks, a promise comes with some guarantees...

- Callbacks added with 'then()' will never be invoked before the completion of the current run of the JavaScript event loop.
- Callbacks will be invoked even if they were added after the success or failure of the asynchronous operation that the promise represents.
- Multiple callbacks may be attached to the same promise by calling then() several times. They will be invoked one after another, in the order in which they were inserted.
- Chaining of callbacks can be done, i.e. two or more asynchronous operations can be executed back to back, where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. We accomplish this by creating a promise chain.

### Promise states
A promise has 4 possible states:

1. **fulfilled**: action related to the promise has succeeded
2. **rejected**: action related to the promise has failed
3. **pending**: promise is still pending i.e. not fulfilled or rejected yet
4. **settled**: promise has been fulfilled or rejected

### Promise construction
A promise object can be created using the promise constructor, which follows the following syntax:

```var <promise object> = new Promise(<function>)```

where the function in the constructor takes two optional arguments, which are generally named resolve and reject (these names are chosen to indicate the nature of these arguments, but you may give any name).
<br><br>
These arguments 'resolve' (i.e. 'fulfill') and 'reject' are themselves functions (hence callbacks, since they are passed as arguments). Their names and definitions can be changed based on the programmer, but the first function, when called, fulfills the promise, and the second function, when called, rejects the promise.
<br><br>

**NOTES ON RESOLVE AND REJECT**:<br>
_Note that resolve and reject refer to the first and second arguments of the callback function of the promise constructor respectively. Their names are not keywords, and can be replaced with any valid identifier by the programmer._

- Order in which they are passed as arguments matters
- Order in which they appear within the callback does not matter
- 'resolve' and 'reject' can be defined within the callback's definition _(defining them outside won't work, since the scope is strictly limited)_
- If 'resolve' and 'reject' are defined, they cannot be carried further by promise consumers _(discussed later)_
- If 'resolve' is undefined, it returns a result, and can carried further by the **.then** function _(discussed later)_
- If 'reject' is undefined, it returns an error, and can carried further by the **.catch** function _(discussed later)_
- Conditions for which they are called do not matter

### Promise consumers
A promise, and the data within a promise object, can be further handled (even after resolution or rejection) using the **.then** and **.catch** functions, which are available as attributes for promise objects (i.e. they are defined within the promise class). For these to work, the 'resolve' and 'reject' arguments of the promise constructor's callback (discussed previously) must not be defined (using a function definition).
<br><br>
**.then** is a function that accepts 1-2 function(s) as argument(s). The first function carries forward the 'resolve' call, and the second function carries the 'reject' call. These argument functions can have at most one argument each (optional).
<br><br>
**.catch** is a function that accepts a function as an argument. It can either carry forward the 'reject' call or handle an error.

#### REFERENCES:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
- https://www.geeksforgeeks.org/javascript-promises/

## chrome.runtime
Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
<br><br>
The runtime API provides methods to support a number of areas of functionality that your extensions can use, such as...

### Message passing
`chrome.runtime.sendMessage` sends a single message to event listeners within your extension or a different extension. If sending within your extension, omit the 'extensionId' argument. The 'runtime.onMessage' event will be fired in each page in your extension, except for the frame that called 'runtime.sendMessage'. If sending to a different extension, include the 'extensionId' argument set to the other extension's ID. 'runtime.onMessageExternal' will be fired in the other extension. 'runtime.sendMessage' is an asynchronous function that returns a 'Promise' object.
<br><br>
If one argument is given, it is the message to send, and the message will be sent internally. if two arguments are given, the arguments are interpreted as (message, options), and the message is sent internally, if the second argument is any of the following:

- a valid options object (i.e. an object which contains only the option properties the browser supports)
- null
- undefined

Otherwise, the arguments are interpreted as (extensionId, message). The message will be sent to the extension identified by extensionId. If three arguments are given, the arguments are interpreted as (extensionId, message, options). The message will be sent to the extension identified by extensionId.
<br><br>
Extensions scripts cannot send messages to content scripts using this method. To send messages to content scripts, use 'tabs.sendMessage'.

#### REFERENCES:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendMessage

### Accessing extension and platform metadata
These methods let you retrieve several specific pieces of metadata about the extension and the platform. Methods in this category include getBackgroundPage, getManifest, getPackageDirectoryEntry, and getPlatformInfo.

### Other functionalities
Other options (not relevant to me right now)

- Managing extension lifecycle and options
- Device restart support
- Helper utilities

### REFERENCES:
- https://developer.chrome.com/docs/extensions/reference/runtime/

## fetch
The JavaScript **fetch** method is used to make a request to server (maybe through an API) using a URL for a particular webpage or endpoint in the server, and load the information to or from the webpage or endpoint. The request can be made for any APIs that return data in the format JSON or XML.
<br><br>
The syntax for **fetch** is as follows:
`fetch(url, options)`
, where

- url =>  URL to which the request is to be made
- options => an dictionary or array of properties

**NOTE**: Without options, **fetch** will by default act as a get request.
<br><br>
The return value of **fetch** returns a promise object. It returns a promise, whether it is resolved or not. The return data can be of the format JSON or XML, and can be an array of objects or simply a single object.

### REFERENCES
- https://www.geeksforgeeks.org/javascript-fetch-method/

## CORS policy
CORS => **C**ross-**O**rigin **R**esource **S**haring
<br><br>
A CORS policy specifies the settings that can be applied to resources to allow resource sharing between for web applications hosted at different origins/domains. A request for a resource outside of the origin is known as a cross-origin request.
<br><br>
CORS in particular is a mechanism that uses an additional HTTP header (applied to an HTTP request made from one web application to another) to inform the browser to allow a web application running at one origin/domain have permission to access selected resources from a server at a different origin/domain. The CORS policy is always applied from the receiver's end.
<br><br>
Note that you can create your own CORS policies for your API or website.

### REFERENCES
- https://www.ibm.com/docs/en/sva/10.0.1?topic=control-cross-origin-resource-sharing-cors-policies

## Opaque response
An opaque response is for a request made for a resource on a different origin that doesn't return CORS headers. With an opaque response we won't be able to read the data returned or view the status of the request, meaning we can't check if the request was successful or not.

### REFERENCES
- https://developers.google.com/web/updates/2015/03/introduction-to-fetch

## Synchronous & asynchronous execution
#### Synchronous execution
Here, each task in a program must finish processing before moving on to executing the next task.

#### Asynchronous execution
Here, a second task can begin executing in parallel, without waiting for an earlier task to finish.

### REFERENCES
- https://www.koyeb.com/blog/introduction-to-synchronous-and-asynchronous-processing

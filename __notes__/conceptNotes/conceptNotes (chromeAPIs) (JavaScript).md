# CONCEPT NOTES (Chrome APIs) (JavaScript)
Chrome APIs are browser APIs available for the client-side scripts (in particular JavaScript codes) that are built into a given web browser (Chrome in our case) that help exposing data from the browser (ex. browser pages, tabs and actions) and computer environment (ex. local databases and scripts) and perform useful operations on them.
<br><br>
**NOTE ON NAMING FORMAL ARGUMENTS OF CALLBACKS**:<br>
The arguments discussed for the callbacks are not keywords, unless otherwise specified, i.e. any name can be given to them, provided they are passed in the appropriate order. However, for convenience, we usually use the given names as the formal arguments of our callback definitions.

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

## chrome.tabs.getCurrent()
_Why is cannot be used for pop-ups or background service workers..._
<br><br>
`chrome.tabs.getCurrent(function callback)` returns an object containing information on the tab in which the script call is made. It may be undefined if it is called from a non-tab context, such as a background page, background script and popup views. Note that to allow the extension to access current tab, you must give the permission 'activeTab' in the 'manifest.json' file.

## chrome.tabs.query()
`chrome.tabs.query(object queryInfo, function callback)` returns objects containing information for every tab that satisfies the properties specified in `queryInfo`. If no properties are specified, it returns objects containing information for every open tab in the browser. Note that

- To allow the extension to access current tab, you must give the permission 'activeTab' in the 'manifest.json' file
- To allow the extension to access all tabs, you must give the permission 'tabs' in the 'manifest.json' file.

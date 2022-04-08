# CONCEPT NOTES (Chrome extension)
## Extension version & version name
An extension version is the version given to the current form of the extension by the programmer. One to four dot-separated integers (given as a string i.e. within double quotes) can be used to identify the version of this extension. A couple of rules apply to the integers: they must be between 0 and 65535, inclusive, and non-zero integers can't start with 0. For example, 99999 and 032 are both invalid.
<br><br>
Chrome's autoupdate system compares versions to determine whether an installed extension needs to be updated. If the published extension has a newer version string than the installed extension, then the extension is automatically updated. The comparison starts with the leftmost integers. If those integers are equal, the integers to the right are compared, and so on. For example, 1.2.0 is a newer version than 1.1.9.9999. A missing integer is equal to zero. For example, 1.1.9.9999 is newer than 1.1 and 1.1.9.9999 is older than 1.2.
<br><br>
In addition to the version field, which is used for update purposes, version_name can be set to a descriptive version string and will be used for display purposes, if present. Here are some examples of version names:

- "version\_name": "1.0 beta"
- "version\_name": "build rc2"
- "version\_name": "3.1.2.4567"

If no version name is present, the version field will be used for display purposes as well.

### REFERENCES:
- https://developer.chrome.com/docs/extensions/mv2/manifest/version/

## Overriding Chrome pages
Chrome extensions allow you to replace the default chrome pages for bookmarks, history, and new tab. Override pages are a way to substitute an HTML file from your Chrome browser extension for a page that Google Chrome normally provides. In addition to HTML, an override page usually has CSS and JavaScript code. To replace new tab, for example, add the following to manifest.json.

```
"chrome_url_overrides": {
  "newtab": "someReplacement.html"
}
```

An extension can replace any one of the following pages:

- Bookmark manager
- History
- New tab

### REFERENCES:
- https://developer.chrome.com/docs/extensions/mv3/override/

## Browser action (action in manifest version 3)
A browser action (or simply action in manifest version 3) is a button that your extension adds to the browser's toolbar. The button has an icon, and may optionally have a popup whose content is specified using HTML, CSS, and JavaScript.
<br><br>
Note that browser and page actions can’t access the DOM itself, however, they can communicate with the content script via the chrome “messaging” API. A browser action should have an icon (for the button) as well as a JavaScript file for the code.
<br><br>
When the user clicks the button, it triggers an "onClick" event. Other events cn also be triggered through this event, as we see in JavaScript 'messaging'.
<br><br>
Each extension has only one browser action, which can involve multiple aspects  such as

- Title
- Popup display
- Icon

## Permissions
Permissions of a browser extension includes the aspects of the browser or client device that the extension needs to access and control to some degree for some or all of its functionalities.
<br><br>
For example, "activeTab" allows access to the current (active) tab that the user is on. "tabs" alows access to all open tabs in the browser.

## Message passing
Message passing allows you to communicate with different parts of your extension (such as an extension popup and background scripts), other extensions, or native applications on the user's device. Methods in this category include connect, connectNative, sendMessage, and sendNativeMessage.
<br><br>
**NOTE**: The API used to send or receive a message from a non-tab context (ex. from a background service worker or a popup) to content scripts (that operate within a tab's context) differs from the API used to send or receive a message from a tab's context (i.e. from the content script) to a non-tab context, specifically the background service worker. For the former, we use `chrome.tabs`, for the latter, we use `chrome.runtime`. Both APIs provide the `sendMessage` service.
<br><br>
This helps understand why we use listen for the `chrome.runtime.onMessage` event when listening for messages from the background service worker in the content script. This also helps understand why we need to send a message to a particular tab ID  using `chrome.tabs.sendMessage` when sending from the background service worker to the content script, since the content script has separate instances injected into each open tab.

## Content scripts
Content scripts are files that run in the context of web pages i.e. scripts that are injected into the DOM of webpages. By using the standard Document Object Model (DOM), they are able to read details of the web pages the browser visits, make changes to them, and pass information to their parent extension.
<br><br>
For each open tab, a separate instance of the content script (i.e. separate process based on the content script source code) is created (provided the browser extension is active). Content scripts are **injected** into a tab, either through the **manifest.json** file (under the **content_script** field) or through the background service worker.
<br><br>
A content script has full access to the DOM of a webpage, so you can do things like alter content, styles, layout, images, anything that is on the page. In other words, a content script deals specifically with the contents of the webpage, and not the browser in general. This is because a content script is injected into the DOM of the webpage (i.e. it becomes a part of the script for the DOM). You can access the DOM in the content script's source code through the 'document' object and its attributes and methods available in JavaScript. For example...

```document.getElementByTagName("h1");```

... will obtain all the "h1" elements of the current webpage (on which the extension is active).
<br><br>
Importantly, the content script is a source code (which can also include and reference CSS) that runs right after the page loads. Hence, when you load or reload a page with the extension active, the content script executes.
<br><br>
The manifest.json file should reference your content script, in the "content_scripts" field. For example:

```
"content_scripts": [
  {
    "js": ["content.js"]
  }
]
```

You also need to specify which URLs the content script should run on. Furthermore, you can use the wildcard * to encompass all paths on a given domain. For example, the following would run the content script on any github.com page:

```
"content_scripts": [
{
  "matches": [
    "http://github.com/*",
    "https://github.com/*",
    "http://*.github.com/*",
    "https://*.github.com/*"
    ],
   "js": ["content.js"]
  }
]
```

For allowing it to run on all URLs, you would add:

```
"content_scripts": [
  {
  "matches": [
    "<all_urls>"
    ],
  "js": ["content.js"]
    }
]
```

Note that the content scripts of an extension (that have been registered in the above manner) can directly access each others' functions, global variables, class definitions and objects.
<br><br>
Content scripts can access Chrome APIs used by their parent extension. They can also access the URL of an extension's file with 'chrome.runtime.getURL()' and use the result in the same way as other URLs.
<br><br>
Note that 

### REFERENCES:
- https://developer.chrome.com/docs/extensions/mv3/content_scripts/
- https://shiffman.net/a2z/chrome-ext/

## Managing events with service workers
_Service workers => Background scripts in manifest version 2_
<br><br>
Extensions are event-based programs used to modify and enhance the functionalities and features available through a Chrome browser. Events are browser triggers, such as:

- Navigating to a new page
- Removing a bookmark
- Closing a tab
-  Clicking the extension's button

Extensions monitor these events using scripts in their background service workers, which, when loaded, react based on specified instructions. A background service worker is loaded when needed, and unloaded when idle. Examples of scenarios where background service workers would be loaded:

- Extension is first installed or updated to a new version
- The event background script was listening for is dispatched
- A content script or another extension sends a message
- Another view in the extension (such as a popup) calls the API endpoint `runtime.getBackgroundPage`

Once loaded, an extensions's service worker generally keeps running as long as it is performing an action, such as calling a Chrome API or issuing a network request. Effective background scripts lay dormant until the event they are listening for fires, which is when they react based on specified instructions, and then unload (i.e. stop exectuting).

### Registering background service workers
Extensions register their background service workers in the manifest, under the "background" field. This field associates the "service_worker" key to the JavaScript file of the background script. The script for the service worker must be located in your extenstion's root directory.
<br><br>
You can optionally specify an extra key within the "background" field, called "type". For this, if you specify "module", the given script file will be considered as a JavaScript module that can be imported by other scripts.

### Debug console for background service workers
Note that the debug console of a service worker differs from the webpage debug console (which can show the outputs of the `console.log` commands of the content scripts). Rather, a service worker has a different debug console (which can show the outputs of the `console.log` commands of the service worker's script), that can be accessed through the developer mode in the browser extensions display page (chrome://extensions for Google Chrome), usually by clicking the relevant option on the desired extension's information box, such as _"Inspect views service worker"_.

### REFERENCES:
- https://developer.chrome.com/docs/extensions/mv3/service_workers/

## Browser extension pop-up
A browser action (typically clicking the extension icon) can also trigger the appearance of a pop-up (which is simply an HTML page. which possibly uses JavaScript and CSS elements). To do this, reference the pop-up HTML file in manifest.json as follows:

```
"browser_action": {
  "default_title": "Hello there!",
  "default_popup": "popup.html"
}
```

The pop-up can communicate with the content script via messaging _(through the `chrome.tabs` API, since the content scripts are always found injected into a tab's webpage, and we must address the particular injection of the content script)_.  The pop-up can also communicate with the background service worker via messaging _(through the `chrome.runtime` API, since the background service worker runs independent of any given tab)_.
<br><br>
Also note that a pop-up's script starts to execute only when the browser action is performed and the popup page is opened. In other words, it does not keep running in the background, and only runs when the popup is viewed.

### REFERENCES
- https://shiffman.net/a2z/chrome-ext/

## Scopes of the content, service worker and popup scripts
The scopes of these scripts are separate.
<br><br>
The scope of content script is the DOM of the current webpage. Only the content script can access and manipulate the DOM of the current webpage. The script is run as soon as the webpage is loaded.
<br><br>
The scope of the background service worker is browser actions. Only the background script can detect and respond to browser actions. The script is only run upon the firing of an event it is listening for.
<br><br>
The scope of the popup script is the extension popup alone. Only the popup script can access and manipulate the DOM of the popup of the extension. The script is only run when the popup is loaded on screen.

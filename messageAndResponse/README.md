# Messaging back and forth from script to script
## Project aims
Introducing popups, and understanding how messaging is done from

- popup to content script (in a certain tab)
- popup to background service worker
- content script (in a certain tab) to background service worker

Also, we will see how responses can be sent by the receivers and obtained by the senders.

## Code aims
- Presenting a popup input
- Based on input, sending message from popup script to
    - Content script injected in the active tab
    - Background service worker
- Getting responses for each
- Displaying responses in the popup

## Waiting for responses from asynchronous functions
JavaScript is synchronous by default, and may not wait long enough for a response from an asynchronous function. This is because an asynchronous function (ex. a callback or a promise-based function) can execute in parallel, and allows the JavaScript code block from where the asynchronous function was called to continue executing. This can lead to the following error:
```
Unchecked runtime.lastError: The message port closed before a response was received.
```

To make the JavaScript code to wait for a response from the called asynchronous function, we can either use the `setTimer` function, or the `async` and `await` keywords. I prefer the latter since I am unsure about how to specify the timer. These operators are discussed in the working notes for JavaScript.
<br><br>
The reason they were not used in this mini-project was because the responses were returned quickly, and no waiting was required in the code.
# WORKING NOTES (JavaScript)
## Accessing the DOM automatically through JavaScript
Consider an HTML document that includes a script that contains code requiring access to certain elements of the DOM, or event handlers associated with events of certain elements of the DOM. Also consider that these event handlers require accessing elements from the DOM. To ensure proper interpretation of the JavaScript code _(JavaScript is interpreted, not compiled, which is what makes it an effective web development scripting language)_, we must make sure the DOM gets loaded before the script, so that the interpretation happens without errors _(for example, if the DOM is not loaded for the script and the script requires access to some element in the DOM, a NULL value is returned instead of the required element)_. To do this, we can simply include the script after the required elements present in the HTML document's body element.

### REFERENCES:
- https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null

## Content Security Policy (CSP) for inline script
CSP by default prevents execution of inline script, due to the danger of script injection by unwanted third parties.

### REFERENCES:
- Why is inline script & style execution dangerous?<br>https://content-security-policy.com/unsafe-inline/

## Accessing & changing DOM
You may already know that you can alter the DOM made from an HTML document through the JavaScript code included in the document. However, you must be careful about whether you are dealing with an HTML collection or an HTML element.
<br><br>
For example, if you want to access and alter the 'html' element of the DOM, you may use 'getElementByTag("html)' and think that since there is only one 'html' element in the DOM, you will get an HTML element. But in fact, you get an HTML collection with only one element! Hence, to access the element itself, you may do:

```
htmlElement = getElementByTag("html)[0]
```

## Waiting for responses from asynchronous functions
JavaScript is synchronous by default, and may not wait long enough for a response from an asynchronous function. This is because an asynchronous function (ex. a callback or a promise-based function) can execute in parallel, and allows the JavaScript code block from where the asynchronous function was called to continue executing. This can lead to the following error:

```
Unchecked runtime.lastError: The message port closed before a response was received.
```

To make the JavaScript code to wait for a response from the called asynchronous function, we can either use the `setTimer` function, or the `async` and `await` keywords. I prefer the latter since I am unsure about how to specify the timer.

### `async` keyword
The keyword 'async' before a function makes the function return a promise. Hence, async functions in JavaScript are same as functions that return a promise. If a promise is not explicitly returned in an async function, JavaScript automatically wraps the return value in a resolved promise.

### `await` keyword
The keyword 'await' is used to wait for a Promise. It is used only within an async function, and is applied before a function call (or a variable that stores the return value of a function), and makes parent async function wait for a promise from the function call.

#### Syntax
```
[rv] = await expression
```
where

- **expression**: a promise or any value to wait for
- **rv**: returns the fulfilled value of the promise, or the value itself if it's not a promise

#### Purpose
This is necessary when calling an asynchronous function (such as a promise constructor), which would normally allow the parent function's code to continue executing even when its results are not delivered. But this becomes an issue when you want to use the return value of this called function in a later code. If the value is not available yet, the variable supposed to hold that value or a value derived from that value will be undefined. To avoid this and wait for the called function to deliver its results, we use await.
<br><br>

**NOTE 1**:<br>
'await' can only be used inside an async function within regular JavaScript code, but can be used on its own with JavaScript modules.
<br><br>

**NOTE 2**:<br>
If the value of the expression following the await operator is not a Promise, it is converted to a resolved Promise.
<br><br>

**NOTE 3**:<br>
An await splits execution flow, allowing the caller of the async function to resume execution. After the await defers the continuation of the async function, execution of subsequent statements ensues.
<br><br>

**NOTE 4**:<br>
If 'await' is applied for the last expression executed by the parent async function, execution continues by returning a pending Promise to the parent async function's caller to indicate the pending completion of the parent async function await, and allowing the caller to resume execution.

### REFERENCES
- https://www.geeksforgeeks.org/async-await-function-in-javascript/
- https://www.geeksforgeeks.org/how-to-wait-for-a-promise-to-finish-before-returning-the-variable-of-a-function/?ref=lbp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
- https://exploringjs.com/impatient-js/ch_async-functions.html
- https://www.w3schools.com/js/js_async.asp
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

## Adding HTML elements to a DOM
We can either reassign the inner HTML of an element, or we can use `document.createElement(<tagName>)` followed by `<parent element>.appendChild()`, or some variation of (using 'insertBefore' or other similar functions). The issue with the former approach is that the i-frames that contain advertisements are loaded again, reducing the performance of the addition of HTML elements to the desired element in the DOM. The latter approach avoids this issue.

## JavaScript switch-case interesting points
- Works with string expressions too

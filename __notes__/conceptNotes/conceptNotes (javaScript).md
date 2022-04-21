# CONCEPT NOTES (JavaScript)
## Console
In a web scripting langauge, the console is an object which provides access to the browser debugging console.

## Anonymous functions in JavaScript
Functions in JavaScript can be anonymous.

```
function(){
  alert('unicorn!');
}
```

And if you put that whole anonymous function in parentheses and then add parentheses after it, it’s a self-executing function. Meaning it’s called the moment it’s defined.

```
(function(){
  alert('unicorn!');
})();
```

If your code is complicated and long it’s often simpler to just put it in another JS file and reference it like so:

```
(function (){
  var script = document.createElement('script');
  script.src = 'someRandomCode.js';
  document.body.appendChild(script);
})();
```

## Inline script vs. external script
Inline script is simply script that is provided within the HTML document. Furthermore, when the DOM is created using the HTML document, references to an external script within HTML elements, such as

- `onclick` option for submit buttons
- `action` option for form elements

become inline code within the DOM.
<br><br>
External script is simply script that is provided in another document and included in the HTML document through the script tag.
<br><br>
Similarly, we also have inline styles and external styles.

## CSS selector
A CSS selector selects the HTML element, using the CSS (cascading style sheets) format. They are used to find select the elements that you want to

- style
- listen (for events, such as `onclick` for a button)
- simply access and modify

We can divide CSS selectors into five categories:

- Simple selectors (select elements based on name, id, class)
- Combinator selectors (select elements based on a specific relationship between them)
- Pseudo-class selectors (select elements based on a certain state)
- Pseudo-elements selectors (select and style a part of an element)
- Attribute selectors (select elements based on an attribute or attribute value)

(For this project, we are only concerned with simple selectors).

### Simple selectors
- CSS element selector (HTML element name, ex. 'p')
- CSS ID selector _(ID prefixed with '#', ex. '#xyz')_
- CSS class selector _(class prefixed with '.', ex. '.xyz')_
- CSS element class selector _(element name follows by class, ex. 'p.xyz' (p is the element, xyz is the class))_
- CSS universal selector _(all elements, denoted by '*')_
- CSS grouping selector _(multiple selectors separated by comma, ex. 'h1, h2, p')_

## document.querySelector
### Description
`querySelector` is a function that is an attribute of the DOM object of an HTML page. It returns the first element that matches a given CSS selector.

### Syntax and return value
`document.querySelector(<CSS selector>, <callback>)`... The return value is a NodeList (there can be multiple document nodes if CSS group selectors are used... otherwise, there may be a single document node). If no matches are found, `null` is returned.

#### NodeList vs. HTMLCollection
A node list is similar to an HTMLCollection, except that HTMLCollection elements can only be HTML elements, whereas NodeList elements are document nodes (ex. element nodes, attribute nodes, and text nodes), which can be similar to HTML elements if the match happens to be an HTML element.
<br><br>
Furthermore, An HTML collection is always a live collection that dynamically reflects changes to the DOM. However, a NodeList is a static collection. The nature of the return value is the main thing that separates `getElementBy...` functions and `querySelector...` functions.

### Notes on related functions
`querySelectorAll()` is similar to `querySelector()`, except that instead of stopping at the first match, it returns all possible matches in a NodeList. Also like `querySelector()`, its return value is a static collection.

### REFERENCES:
- https://www.w3schools.com/jsref/met\_document\_queryselector.asp

## Importing and exporting JavaScript modules
### Within DOM's context
If you want a script included as an external script in an HTML document to access the functions, variables, objects or classes of another script, you can simply include the other script as an external script in the same HTML document, before the former script.

### AMD module
**AMD** => **A**synchronous **M**odule **D**efinition.<br>
This is a specification for the programming language JavaScript. It defines an API that defines code modules and their dependencies, and loads them asynchronously if desired. Implementations of AMD provide the following benefits:

- Website performance improvements, since AMD implementations load smaller JavaScript files, and only when they are needed.
- Fewer page errors, since AMD implementations allow developers to define dependencies that must load before a module is executed, so the module does not try to use outside code that is not available yet.

#### REFERENCES
- https://en.wikipedia.org/wiki/Asynchronous\_module\_definition

## JavaScript objects
Objects in JavaScript are variables that contain multiple values. Hence, arrays in JavaScript are also processed as objects. Furthermore, objects can have multiple fields/attributes, which can themselves be values, objects or functions. When defining them, we can give these attributes in the same way as we make dictionaries in Python, ex.

```
let myObject = {
    "attribute1": value1,
    "attribute2": value3,
    ...
};
```

Note that the keys i.e. field/attribute names may be given as a string, or may simply be given as it is, as in

```
let myObject = {
    attribute1: value1,
    attribute2: value3,
    ...
};
```
### Accessing the keys of an Object
The code for this is

```
Object.keys(myObject);
```

This will return an array containing all the key names.

#### REFERENCES
- https://stackoverflow.com/questions/10654992/how-can-i-get-a-collection-of-keys-in-a-javascript-dictionary

### REFERENCES
- https://www.w3schools.com/js/js\_object\_definition.asp

## Synchronous & asynchronous execution
#### Synchronous execution
Here, each task in a program must finish processing before moving on to executing the next task.

#### Asynchronous execution
Here, a second task can begin executing in parallel, without waiting for an earlier task to finish.

### REFERENCES
- https://www.koyeb.com/blog/introduction-to-synchronous-and-asynchronous-processing

## Callback
A callback is any reference to executable code that is passed as an argument to other code. In other words, the other code is expected to call back the code at a given time.

## Promise
A 'Promise' is an object representing the eventual completion or failure of one or more asynchronous operations, such as API calls or HTTP requests. In other terms, a promise represents a single asynchronous operation that hasn't completed yet, but is expected to complete in the future. Compared to events and regular callbacks, promises are...

- Easier to manage when dealing with multiple asynchronous operations, where callbacks associated with each operation can create a messy situation and unmanageable code.
- Better at handling errors
- Offer better code readability

At its most basic level, a promise is an object to which you attach callbacks (instead of passing callbacks into a function).

### Relevance of promise
JavaScript is a synchronous scripting language, which means the code executes in a strictly sequential manner, and waits for processes to complete before moving on, for the most part. We can have asynchronous functions or processes that do not compel the JavaScript code to wait for a response. This can lead to you obtaining a NULL valued response, even if the asynchronous computation executes correctly, since an asynchronous computation may take more time than the JavaScript code waits for. Promise objects are designed to handle such scenarios. The results of a particular asynchronous computation can be reflected in the associated promise object, whenever it completes. We can use promise handlers (discussed below) to handle the resolution or rejection (success or failure of the associated asynchronous computation), which will be executed asynchronously as JavaScript code.

#### REFERENCES
- https://stackoverflow.com/questions/39004567/why-do-we-need-promise-in-js

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

### Promise handlers
A promise, and the data within a promise object, can be further handled (even after resolution or rejection) using the **.then** and **.catch** functions, which are available as attributes for promise objects (i.e. they are defined within the promise class). For these to work, the 'resolve' and 'reject' arguments of the promise constructor's callback (discussed previously) must not be defined (using a function definition).
<br><br>
**.then** is a function that accepts 1-2 function(s) as argument(s). The first function carries forward the 'resolve' call i.e. it is the callback for when the promise is resolved, and the second function carries the 'reject' call i.e. it is the callback function for when a promise is rejected. These argument functions can have at most one argument each (optional).
<br><br>
**.catch** is a function that accepts a function as an argument, which is the callback function for when a promise is rejected. Hence, **.catch** can either carry forward the 'reject' call or handle an error in the function returning the promise (by default, a function returning a promise will return a rejected promise on error).

#### REFERENCES:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using\_promises
- https://www.geeksforgeeks.org/javascript-promises/

## Fetch API
The JavaScript fetch API, which is called using the **fetch** method, is used to make a request to any resource, using a URL (for a particular webpage in a website or endpoint in a server), and load the information to or from the webpage or endpoint. The request can be made for any APIs that return data in the format JSON or XML. Note that fetch also provides a single logical place to define other HTTP-related concepts such as CORS and extensions to HTTP.
<br><br>
The syntax for **fetch** is as follows:
`fetch(url, options)`
, where

- url =>  URL to which the request is to be made
- options => an dictionary or array of properties

**NOTE**: Without options, **fetch** will by default act as a get request.
<br><br>
The return value of **fetch** returns a promise object. It returns a promise, whether it is resolved or not. The return data wihthin the promise can be of the format JSON or XML, and can be an array of objects or simply a single object.

### Note on the processing of return of fetch
A fetch call does not directly return the JSON response body, but a promise that resolves with a response object (i.e. the resolution of the promise will result in a Response object).
<br><br>
The response object, in turn, does not directly contain the actual JSON response body, but a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the .json() method, which returns another promise that resolves with a JSON object (i.e. the resolution of the promise will result in a JSON object).
<br><br>
This is why we use two consecutive **.then** calls, since we are essentially peeling the layers of the response object contained in the fetched promise, to finally obtain the JSON data that we need.
<br><br>
**REMEMBER**: resolution of a promise happens through a callback defined within the promise object, which by default returns certain data.

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

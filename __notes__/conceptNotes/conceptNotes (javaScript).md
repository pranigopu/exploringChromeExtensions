# CONCEPT NOTES (JavaScript)
## Console
In a web scripting language, the console is an object which provides access to the browser debugging console.

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
- https://www.w3schools.com/jsref/met_document_queryselector.asp

## Importing and exporting JavaScript modules
### Within DOM's context
If you want a script included as an external script in an HTML document to access the functions, variables, objects or classes of another script, you can simply include the other script as an external script in the same HTML document, before the former script.

### AMD module
**AMD** => **A**synchronous **M**odule **D**efinition.<br>
This is a specification for the programming language JavaScript. It defines an API that defines code modules and their dependencies, and loads them asynchronously if desired. Implementations of AMD provide the following benefits:

- Website performance improvements, since AMD implementations load smaller JavaScript files, and only when they are needed.
- Fewer page errors, since AMD implementations allow developers to define dependencies that must load before a module is executed, so the module does not try to use outside code that is not available yet.

#### REFERENCES
- https://en.wikipedia.org/wiki/Asynchronous_module_definition

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
- https://www.w3schools.com/js/js_object_definition.asp

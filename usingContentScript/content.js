// Code put for no good reason
console.log("Hello there, young one.");
//================================================
// PART 1: Changing heading colors
//------------------------
let headings = Array();
// Searching for all possible heading levels:
for(let i = 0; i < 6; i++)
{
    // Obtaining the next level's heading tag elements:
    plus = document.getElementsByTagName("h" + String(i));
    // Adding each above element individually:
    for(let i = 0; i < plus.length; i++)
    {
        // Appending an element into the 'headings' array:
        headings.push(plus[i]);
    }
    /*
    The above loop is used instead of functions like 'concat',
    because such functions were observed to create an array of arrays,
    rather than a simple 1D array.
    */
}
// Changing the 'background-color' style attribute for each heading element:
for(let i = 0; i < headings.length; i++ )
{
    console.log(headings[i]);
    try{headings[i].style.backgroundColor = "red";}
    finally{continue;}
}
//================================================
// PART 2: Replacing words
//------------------------
let paragraphs = document.getElementsByTagName("p");
var swaps = {
    "the": "da",
    "this": "dis",
    "that": "dat",
    "Palpatine": "Darth Idiot"};
for(let i = 0; i < paragraphs.length; i++)
{
    p = paragraphs[i].innerHTML;
    // Iterating through each key in 'swaps':
    for(s in swaps)
    {
        // For all lowercase...
        p = p.replaceAll(s, swaps[s]);
        
        // For first letter capitalised...
        p = p.replaceAll(
            s[0].toUpperCase() + s.slice(1),
            swaps[s][0].toUpperCase() + swaps[s].slice(1)
            );
        /*
        NOTE ON SLICING
        myString.slice(i) slices myString from index i onwards.
        myString.slice(i, j) slices myString from index i upto j.
        */

        // For all uppercase...
        p = p.replaceAll(s.toUpperCase(), swaps[s].toUpperCase());
    }
    paragraphs[i].innerHTML = p;
}
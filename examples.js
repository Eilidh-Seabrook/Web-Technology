// Simple conversions between types:

let myNumber = 10;
let myString = myNumber.toString(); // myString = "10"

let myNumberAgain =
  parseFloat(myString); // myString = 10
parseInt(myString); // myString = 10

// A "float" is a number with a decimal point, like 10.5, or -3.1
// An "int" is an integer, a number without a decimal point.
// If you aren't sure, just use float.

//

// Some basic functions you may find useful

// Checks if a number is even or not. Returns true if it is, or false if it isn't
function isEven(number) {
  return !(number % 2);
  // You don't have to know how this works, but in essence it:
  // - Takes the number and divides it by 2
  // - Looks at the remainder (either 0 or 1 for an integer)
  // - Converts that into a boolean (0 -> false, 1 -> true)
  // - Returns the opposite of that

  // So 5 / 2 has a remainder of 1, which converts to true, and the opposite of that is false
  // And 20 / 2 has a remainder of 0, which converts to false, and the opposite of that is true
}

// Usage: if(isEven(x))

// 

// To store something in "local storage", which persists even if the webpage is closed.
localStorage.setItem("highScore", "10");

// To later retrieve that value
let x = localStorage.getItem("highScore");

// Be careful: if nothing is stored (say, it's the user's first time on the web page), x will be null.

// Only a string can be stored or retrieved. For simple things such as numbers, this is easy to do. If you need to store a more complex object (you probably don't), use the methods JSON.Stringify and JSON.Parse

// e.g.

let scores = {
  "anagrams": 10,
  "ciphers": 5,
  "hangman": 4
}

localStorage.setItem("scores", JSON.stringify(scores));

// Then later...

let scores_fromlocalstorage = JSON.parse(localStorage.getItem("scores"));

//

// To select elements

let myParagraph = document.getElementById("myParagraph");
// <p id="myParagraph"></p> <-- Only this will be selected
// <p id="myOtherParagraph">I'm unchanged</p>
myParagraph.innerText = "hello";
// <p id="myParagraph">hello</p>
// <p id="myOtherParagraph">I'm unchanged</p>

let allParagraphs = document.querySelectorAll("p"); // This works like css selectors
// <p id="myParagraph">hello</p> <-- This is selected
// <p id="myOtherParagraph">I'm unchanged</p> <-- And this

// The paragraphs are selected in an array, or a list.
// We don't want to edit the list, we want to edit each individual thing (or "element") on that list.
// This is where the forEach method comes in
allParagraphs.forEach(paragraph => {
  // This line above says:
  // - For each "element" in my "array" called allParagraphs
  // - Name that "element" paragraph (since this is a list of paragraphs, each individual item on the list is a paragraph)
  // - Do some code "=>" with that element.
  // Any code inside the curly brackets is executed once for each item on the list. Doing it this way, we don't even have to know how long our list is.
  paragraph.innerText = "goodbye";
});

// After this code is executed, our webpage will look like this.
// <p id="myParagraph">goodbye</p>
// <p id="myOtherParagraph">goodbye</p>

// There are other ways to select items in html:

document.querySelector("p"); // Select the FIRST element that matches the selector on the page. Returns just one item, NOT in a list
document.getElementsByClassName("paragraphs"); // Select ALL elements that have the given class name. Returns a list of items. (Even if there's only one item that matches, it will still return it in a list).

// You can also search within another element.

// <div>
//  <p></p>
//  <p></p>
// </div>
// <p></p>

let myDiv = document.querySelector("div"); // Selects the FIRST element that has the tag "div".
let myParagraphs = myDiv.querySelectorAll("p");

// <div>
//  <p></p> <-- This is in myParagraphs
//  <p></p> <-- This is in myParagraphs
// </div>
// <p></p> <-- This is NOT in myParagraphs
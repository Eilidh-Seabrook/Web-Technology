// DOM Queries
let lives = 5;

const wordDisplay = document.getElementById("word");
const input = document.getElementById("input");
const liveDisplay = document.getElementById("lives");
const victoryScreen = document.getElementById("victory");
const defeatScreen = document.getElementById("defeat");
liveDisplay.setAttribute("lives", lives);
/* inital declarations */

/* select random item from word list and key list */
let wordIndex = Math.floor(Math.random() * words.length);
let randomWord = words[wordIndex].toUpperCase();
let keyIndex = Math.floor(Math.random() * keys.length);
let randomKey = keys[keyIndex];

let wordFound = 0;

/*
console.log(randomWord);
console.log(randomKey);
*/

/* in order to implement caesar cipher, must introduce non-native modulus functionality */
/* taken from https://stackoverflow.com/questions/44232645/caesar-cipher-in-javascript */
function mod(n, p) {
  if (n < 0) {
    n = p - Math.abs(n) % p;
  }
  return n % p;
}

/* encryption algorithm */
function encryptWord(randomWord, randomKey) {
  var codedWord = "";
  for (var i = 0; i < randomWord.length; i++) {
    var code = randomWord.charCodeAt(i);
    /* shifts letters forwards or backwards along the alphabet by the given key */
    if (code >= 65 && code <= 65 + 26 - 1) {
      code -= 65;
      code = mod(code + randomKey, 26);
      code += 65;
    }
    codedWord += String.fromCharCode(code);
  }
  return codedWord;
}

function setWord(codedWord) {
  wordDisplay.innerHTML = "";
  /* render the scrambled word */
  for (let i = 0; i < codedWord.length; i++) {
    const letter = codedWord[i];
    let child = document.createElement("span");
    child.innerText = letter;
    wordDisplay.appendChild(child);
  }
}

const gameRunning = () => {
  if (wordFound === 1) {
    if (startTime) {
      const endTime = (Date.now() - startTime) / 1000;
      let pb = localStorage.getItem("ciphers") ?? "";
      pb = Number.parseFloat(pb);
      if (Number.isNaN(pb)) {
        localStorage.setItem("ciphers", endTime);
      } else if (pb > endTime) {
        localStorage.setItem("ciphers", endTime)
      }
    }
    victoryScreen.setAttribute("active", "");
    return;
  }

  input.value = "";
  if (input.minLength == randomWord.length) {
    return;
  }

  if (input.minLength < randomWord.length) {
    input.maxLength = randomWord.length;
    input.minLength = randomWord.length;
  } else {
    input.minLength = randomWord.length;
    input.maxLength = randomWord.length;
  }
  input.style.setProperty("--count", randomWord.length);
  input.parentElement?.style.setProperty("--underline", "'".padEnd(randomWord.length + 1, "_").concat("'"));

}

input.addEventListener("change", _event => {
  const userInput = input.value.toUpperCase();
  // console.log(userInput);
  if (userInput == randomWord) {
    wordFound = 1;
    victoryScreen.setAttribute("active", "");
  } else {
    // user guessed wrong, subtract 1 from lives
    liveDisplay.setAttribute("lives", --lives);
    if (lives <= 0) {
      defeatScreen.setAttribute("active", "")
    }
  }
});

function startGame() {
  const codedWord = encryptWord(randomWord, randomKey);
  setWord(codedWord);
  gameRunning();
}


startGame();
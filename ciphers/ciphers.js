// DOM Queries
const wordDisplay = document.getElementById("word");
const input = document.getElementById("input");
const liveDisplay = document.getElementById("lives");
const victoryScreen = document.getElementById("victory");
const defeatScreen = document.getElementById("defeat");
liveDisplay.setAttribute("lives", lives);
/* inital declarations */

/* select random item from word list and key list */
let word_index  = Math.floor(Math.random() * words.length);
let random_word = words[word_index];
let key_index = Math.floor(Math.random() * keys.length);
let random_key = keys[key_index];
let lives = 5;

/* i have no idea how booleans work in js so i am faking it */
let word_found = 0; 

console.log(random_word);
console.log(random_key);

/* in order to implement caesar cipher, must introduce non-native modulus functionality */
/* taken from https://stackoverflow.com/questions/44232645/caesar-cipher-in-javascript */
function mod(n, p){
  if ( n < 0 )
      n = p - Math.abs(n) % p;
  return n % p;
}

/* encryption algorithm */
function encrypt_word(random_word, random_key){
  var coded_word = "";
  for(var i = 0; i < random_word.length; i++){
      var code = random_word.charCodeAt(i);
      /* shifts letters forwards or backwards along the alphabet by the given key */
      if (code >= 65 && code <= 65 + 26 - 1){
          code -= 65;
          code = mod(code + random_key, 26);
          code += 65;
      }
      coded_word += String.fromCharCode(code);
  }
  return coded_word;
}

function set_word(coded_word){
  wordDisplay.innerHTML = "";
  /* render the scrambled word */
  for (let i = 0; i < coded_word.length; i++){
    const letter = coded_word[i];
    let child = document.createElement("span");
    child.innerText = letter;
    wordDisplay.appendChild(child);
  }
  return;
}

const game_running = (index) => {
  if (word_found = 1){
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
  if (input.minLength == word.length) {
    return;
  }

  if (input.minLength < word.length) {
    input.maxLength = word.length;
    input.minLength = word.length;
  } else {
    input.minLength = word.length;
    input.maxLength = word.length;
  }
  input.style.setProperty("--count", word.length);
  input.parentElement?.style.setProperty("--underline", "'".padEnd(word.length + 1, "_").concat("'"));

  input.addEventListener("change", _event => {
    const userInput = input.value.toLowerCase();
    // console.log(userInput);
    if (userInput == random_word){
      word_found = 1;
      victoryScreen.setAttribute("active", "");
    } else{
      // user guessed wrong, subtract 1 from lives
      liveDisplay.setAttribute("lives", --lives);
      if (lives <= 0) {
        defeatScreen.setAttribute("active", "")
      }
    }

}

function start_game(){
  encrypt_word();
  set_word(coded_word);

  let i = 0
  game_running(i);
}


start_game();

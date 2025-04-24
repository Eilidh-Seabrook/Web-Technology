const MAX_GUESSES = 6;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

let secretWord, guessedLetters, remaining;

const wordDiv = document.getElementById("word");
const keyboardDiv = document.getElementById("keyboard");
const statusP = document.getElementById("status");
const victoryScreen = document.getElementById("victory");
const defeatScreen = document.getElementById("defeat");
const man = document.getElementById("man");
const bodyParts = [...man.children];

ALPHABET.split("").forEach((letter) => {
  const btn = document.createElement("button");
  btn.innerText = letter;
  btn.disabled = false;
  btn.addEventListener("click", () => handleGuess(letter, btn));
  keyboardDiv.appendChild(btn);
});

function startGame() {
  secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  // console.log(secretWord);
  guessedLetters = new Set();
  remaining = MAX_GUESSES;
  updateWord();
  updateStatus();
}

/* this is the function that determines weather the user has chosen the correct letter */
function handleGuess(letter, buttonEl) {
  if (guessedLetters.has(letter) || remaining === 0) return;
  guessedLetters.add(letter);
  buttonEl.disabled = true;

  if (!secretWord.includes(letter)) {
    bodyParts[MAX_GUESSES - remaining].setAttribute("shown", "")
    remaining--;
  }

  updateWord();
  updateStatus();
}
/* this is the function to tell the user if they have guessed the
 correct character or not by showing an underline if incorrect of if correct will show the character guessed */
function updateWord() {
  const display = secretWord
    .split("")
    .map((ch) => (guessedLetters.has(ch) ? ch : "_"))
    .join(" ");
  wordDiv.innerText = display;
}
/* this is the function that shows the user if they have
 sucsesfully completed the hangman level or not by showing either victory or defeat /*
function updateStatus() {
  if (remaining === 0) {
    defeatScreen.setAttribute("active", "")
  } else if (secretWord.split("").every((ch) => guessedLetters.has(ch))) {
    victoryScreen.setAttribute("active", "")
  } else {
    statusP.textContent = `lifes left: ${remaining}`;
  }
}

startGame();

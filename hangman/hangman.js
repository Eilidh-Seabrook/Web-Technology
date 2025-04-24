const MAX_GUESSES = 5;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
// const WORDS_MEDIUM = ["hello", "coffee", "kitten", "house"];
// const WORDS_HARD = ["liberal", "dinosaur", "encyclopaedia"];

let secretWord, guessedLetters, remaining;

const wordDiv = document.getElementById("word");
const keyboardDiv = document.getElementById("keyboard");
const statusP = document.getElementById("status");
const victoryScreen = document.getElementById("victory");
const defeatScreen = document.getElementById("defeat");

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

function handleGuess(letter, buttonEl) {
  if (guessedLetters.has(letter) || remaining === 0) return;
  guessedLetters.add(letter);
  buttonEl.disabled = true;

  if (!secretWord.includes(letter)) {
    remaining--;
  }

  updateWord();
  updateStatus();
}

function updateWord() {
  const display = secretWord
    .split("")
    .map((ch) => (guessedLetters.has(ch) ? ch : "_"))
    .join(" ");
  wordDiv.innerText = display;
}

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

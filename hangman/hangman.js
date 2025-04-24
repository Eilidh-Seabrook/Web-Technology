
const WORDS = [
    'javascript','browser','function','variable','object',
    'internet','hangman','algorithm','framework','element'
  ];
  const MAX_GUESSES = 6;
  

  let secretWord, guessedLetters, remaining, level = 1;
  

  const wordDiv     = document.getElementById('word');
  const keyboardDiv = document.getElementById('keyboard');
  const statusP     = document.getElementById('status');
  const resetBtn    = document.getElementById('reset');
  const livesDiv    = document.getElementById('lives');
  const levelHeading= document.getElementById('level-heading');
  

  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.addEventListener('click', () => handleGuess(letter, btn));
    keyboardDiv.appendChild(btn);
  });
  

  function startGame() {
    secretWord     = WORDS[Math.floor(Math.random()*WORDS.length)];
    guessedLetters = new Set();
    remaining      = MAX_GUESSES;
    levelHeading.textContent = `LEVEL ${level}`;
    renderHearts();
    updateWord();
    updateStatus();
    [...keyboardDiv.children].forEach(b => { b.disabled = false; });
  }
  
  function handleGuess(letter, buttonEl) {
    if (guessedLetters.has(letter) || remaining === 0) return;
    guessedLetters.add(letter);
    buttonEl.disabled = true;
  
    if (!secretWord.includes(letter)) {
      remaining--;
      renderHearts();
    }
  
    updateWord();
    updateStatus();
  }
  
  function updateWord() {
    const display = secretWord
      .split('')
      .map(ch => guessedLetters.has(ch) ? ch : '_')
      .join(' ');
    wordDiv.textContent = display;
  }
  
  function updateStatus() {
    if (remaining === 0) {
      statusP.textContent = `you loser “${secretWord}”.`;
      disableKeyboard();
    } else if (secretWord.split('').every(ch => guessedLetters.has(ch))) {
      statusP.textContent = 'You a winner!';
      disableKeyboard();
      level++;                
    } else {
      statusP.textContent = `lifes left: ${remaining}`;
    }
  }
  
  function disableKeyboard() {
    [...keyboardDiv.children].forEach(b => { b.disabled = true; });
  }

  
  
  resetBtn.addEventListener('click', startGame);
  
 
  startGame();
  
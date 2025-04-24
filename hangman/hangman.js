/********* data *********/
const WORDS = [
    'javascript','browser','function','variable','object',
    'internet','hangman','algorithm','framework','element'
  ];
  const MAX_GUESSES = 6;
  
  /********* state *********/
  let secretWord, guessedLetters, remaining, level = 1;
  
  /********* DOM *********/
  const wordDiv     = document.getElementById('word');
  const keyboardDiv = document.getElementById('keyboard');
  const statusP     = document.getElementById('status');
  const resetBtn    = document.getElementById('reset');
  const livesDiv    = document.getElementById('lives');
  const levelHeading= document.getElementById('level-heading');
  
  /********* build keyboard once *********/
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.addEventListener('click', () => handleGuess(letter, btn));
    keyboardDiv.appendChild(btn);
  });
  
  /********* functions *********/
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
      statusP.textContent = `You lost! The word was “${secretWord}”.`;
      disableKeyboard();
    } else if (secretWord.split('').every(ch => guessedLetters.has(ch))) {
      statusP.textContent = '🎉 You win!';
      disableKeyboard();
      level++;                // advance level for next round
    } else {
      statusP.textContent = `Guesses left: ${remaining}`;
    }
  }
  
  function disableKeyboard() {
    [...keyboardDiv.children].forEach(b => { b.disabled = true; });
  }
  
  function renderHearts() {
    livesDiv.innerHTML = '';
    for (let i=0;i<remaining;i++){
      const span=document.createElement('span');
      livesDiv.appendChild(span);
    }
  }
  
  /********* events *********/
  resetBtn.addEventListener('click', startGame);
  
  /********* init *********/
  startGame();
  
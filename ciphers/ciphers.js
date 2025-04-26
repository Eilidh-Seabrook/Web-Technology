const main = () => {
    // Variable Declaration
    let lives = 5;
  
    // Implementation of the Fisher–Yates shuffle algorithm
    /*
    const shuffleArray = array => {
      for (let n = array.length - 1; n > 0; n--) {
        const i = Math.floor(Math.random() * (n + 1));
        [array[n], array[i]] = [array[i], array[n]];
      }
    }*/
  
    // DOM Queries
    const wordDisplay = document.getElementById("word");
    const input = document.getElementById("input");
    const liveDisplay = document.getElementById("lives");
    const victoryScreen = document.getElementById("victory");
    const defeatScreen = document.getElementById("defeat");
  
    liveDisplay.setAttribute("lives", lives);
  



  /* in order to implement caesar cipher, must introduce non-native modulus functionality */
  /* taken from https://stackoverflow.com/questions/44232645/caesar-cipher-in-javascript */
  function mod(n, p){
    if ( n < 0 )
        n = p - Math.abs(n) % p;

    return n % p;
  }

  /* select random item from word list and key list */
  let word_index  = Math.floor(Math.random() * words.length);
  let random_word = words[word_index];

  let key_index = Math.floor(Math.random() * keys.length);
  let random_key = keys[key_index]



  /* encryption algo */
  function encrypt(random_word, random_key){
    var encMsg = "";

    for(var i = 0; i < random_word.length; i++)
    {
        var code = random_word.charCodeAt(i);

        // Encrypt only letters in 'A' ... 'Z' interval
        if (code >= 65 && code <= 65 + 26 - 1)
        {
            code -= 65;
            code = mod(code + random_key, 26);
            code += 65;
        }

        encMsg += String.fromCharCode(code);
    }

    return encMsg;
}


/* everything below is copied, yoink from it as needed */

/*

    // Executed once per word
    const setWord = (index) => {
      if (index > words.length - 1) {
        if (startTime) {
          const endTime = (Date.now() - startTime) / 1000;
          let pb = localStorage.getItem("anagrams") ?? "";
          pb = Number.parseFloat(pb);
          if (Number.isNaN(pb)) {
            localStorage.setItem("anagrams", endTime);
          } else if (pb > endTime) {
            localStorage.setItem("anagrams", endTime)
          }
        }
        victoryScreen.setAttribute("active", "");
        return;
      }
  
      wordDisplay.innerHTML = "";
  
      let word = words[index];
  
      let scrambledWord = word.split("");
      shuffleArray(scrambledWord);
  
      for (let i = 0; i < scrambledWord.length; i++) {
        const letter = scrambledWord[i];
        let child = document.createElement("span");
        let biasedRandom = 0.5 * (Math.random() + i % 2);
        child.style.setProperty("--random", biasedRandom)
        child.innerText = letter;
        wordDisplay.appendChild(child);
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
    }
  
    let i = 0;
  
    setWord(i);
  
    input.addEventListener("change", _event => {
      const userInput = input.value.toLowerCase();
      // console.log(userInput);
      if (userInput == words[i]) {
        // user guessed word, move to next word
        setWord(++i);
      } else {
        // user guessed wrong, subtract 1 from lives
        liveDisplay.setAttribute("lives", --lives);
        if (lives <= 0) {
          defeatScreen.setAttribute("active", "")
        }
      }
    })
  }
  */
  main();
  
const main = () => {
    // Variable Declaration
    let lives = 5;
  
    // Implementation of the Fisher–Yates shuffle algorithm
    //const shuffleArray = array => {
    //  for (let n = array.length - 1; n > 0; n--) {
    //    const i = Math.floor(Math.random() * (n + 1));
    //    [array[n], array[i]] = [array[i], array[n]];
    //  }
    //}
  
    // DOM Queries
    const wordDisplay = document.getElementById("word");
    const input = document.getElementById("input");
    const liveDisplay = document.getElementById("lives");
    const victoryScreen = document.getElementById("victory");
    const defeatScreen = document.getElementById("defeat");
    const helpScreen = document.getElementById("help");
  
    // Check for errors
    if (wordDisplay === null) {
      console.error("Could not find element with id 'word'");
      return;
    }
    if (input === null) {
      console.error("Could not find element with id 'input'");
      return;
    }
    if (liveDisplay === null) {
      console.error("Could not find element with id 'lives'");
      return;
    }
    if (victoryScreen === null) {
      console.error("Could not find element with id 'victory'");
      return;
    }
    if (defeatScreen === null) {
      console.error("Could not find element with id 'defeat'");
      return;
    }
    if (helpScreen === null) {
        console.error("Could not find element with id 'help'");
        return;
    }


    liveDisplay.setAttribute("lives", lives);
  
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
  main();
  
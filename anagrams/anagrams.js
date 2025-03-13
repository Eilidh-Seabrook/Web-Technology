const main = () => {

  const words = [
    "banana",
    "apple",
    "tomato",
    "orange",
    "clementine"
  ]

  // Implementation of the Fisher–Yates shuffle algorithm
  const shuffleArray = array => {
    for (let n = array.length - 1; n > 0; n--) {
      const i = Math.floor(Math.random() * (n + 1));
      [array[n], array[i]] = [array[i], array[n]];
    }
  }

  const wordDisplay = document.getElementById("word");
  const input = document.getElementById("input");

  if (wordDisplay == null) {
    console.error("Could not find element with id 'word'");
    return;
  }

  if (input == null) {
    console.error("Could not find element with id 'input'");
    return;
  }

  const setWord = (index) => {
    if (index > words.length - 1) {
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

  input.addEventListener("change", event => {
    const userInput = input.value.toLowerCase();
    console.log(userInput);
    if (userInput == words[i]) {
      setWord(++i);
    }
  })
}
main();

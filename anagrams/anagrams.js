const words = [
  "apple",
  "banana",
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

// Shuffles a given word using the above algorithm
const scramble = word => {
  let chars = word.split("");
  shuffleArray(chars);
  return chars.join("");
}

// Test
words.forEach(word => {
  console.log(scramble(word));
})
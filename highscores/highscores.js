function getScore(key) {
  let value = localStorage.getItem(key) ?? "";
  const num = Number.parseFloat(value);
  return Number.isNaN(num) ? 0 : num;
}

const highScores = [
  getScore("anagrams"),
  getScore("ciphers"),
  getScore("hangman")
];

const elements = [
  document.getElementById("anagrams"),
  document.getElementById("ciphers"),
  document.getElementById("hangman")
];

for (let i = 0; i < highScores.length; i++) {
  const score = highScores[i];
  const element = elements[i];
  if (element === null) {
    continue;
  }
  element.innerText = score;
}
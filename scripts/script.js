const lettersDiv = document.querySelector("#lettersDiv");
const blanksDiv = document.querySelector("#blanksDiv");
const livesDiv = document.querySelector("#livesDiv");
const stickman = document.querySelector("#stickman");
const resetButton = document.querySelector("#reset");

const letters = "abcdefghijklmnopqrstuvwxyz";

function createLetterButtons() {
  for (let i = 0; i < letters.length; i++) {
    const button = document.createElement("button");
    button.textContent = letters[i];
    button.className = "letter-button";
    lettersDiv.appendChild(button);
  }
}

function displayRandomWord() {
  fetch("https://random-word-api.herokuapp.com/word?number=1")
    .then((response) => response.json())
    .then((word) => {
      console.log(word);
      const randomWord = word[0];
      const blanks = "_ ".repeat(randomWord.length);
      blanksDiv.textContent = blanks;

      // Add event listener to letter buttons
      document.querySelectorAll(".letter-button").forEach((button) => {
        button.addEventListener("click", function () {
          if (this.disabled) {
            return;
          }

          const clickedLetter = this.textContent;

          let positions = [];
          for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === clickedLetter) {
              positions.push(i);
            }
          }

          if (positions.length > 0) {
            let blanks = blanksDiv.textContent.split("");
            positions.forEach((position) => {
              blanks[position * 2] = clickedLetter;
            });
            blanksDiv.textContent = blanks.join("");
          } else {
            lives--;
            livesDiv.textContent = `Lives: ${lives}`;
            if (lives === 0) {
              alert("Game over!");
              reset();
            }
          }

          this.disabled = true;
        });
      });
    })
    .catch((error) => console.error(error));
}

let lives = 6;

function reset() {
  lives = 6;
  livesDiv.textContent = `Lives: ${lives}`;
  blanksDiv.textContent = "";
  lettersDiv.textContent = "";
  createLetterButtons();
  displayRandomWord();
  document.querySelectorAll(".letter-button").forEach((button) => {
    button.disabled = false;
  });
}

resetButton.addEventListener("click", reset);

reset();

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

const boxesSelected = [];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  // add flipped class to the card clicked, class contains no styling rules/doesn't exist, just used for designating flipped cards
  event.target.classList.add("flipped");
  // change color
  event.target.style.backgroundColor = event.target.classList[0];
  // make clicked card inaccessible to further clicks
  event.target.style.pointerEvents = "none";
  // collect all flipped, will be either 1,or 2
  const flippedCards = document.querySelectorAll(".flipped");
  // see if there are two cards flipped, only then do we do check
  if (flippedCards.length === 2) {
    // make all other cards non-clickable for the duration of the check
    const cards = document.querySelectorAll("#game div");
    cards.forEach((card) => {
      card.style.pointerEvents = "none";
    });
    // check to see if the flipped cards match or not
    if (flippedCards[0].classList[0] === flippedCards[1].classList[0]) {
      console.log("CARDS MATCHED!");
      // after 1 sec, make all the cards except for the matched pair lcickable once more
      flippedCards.forEach((card) => {
        card.classList.add("matched");
      });
      setTimeout(() => {
        cards.forEach((card) => {
          if (
            // card.classList[0] !== flippedCards[0].classList[0] ||
            !card.classList.contains("matched")
          ) {
            card.style.pointerEvents = "auto";
          }
        });
      }, 1000);
      // removed flipped class from our cards
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
    } else {
      console.log("NOT A MATCH!");
      // set all other cards to clickable once more
      setTimeout(() => {
        cards.forEach((card) => {
          if (
            // card.classList[0] !== flippedCards[0].classList[0] ||
            // card.classList[0] !== flippedCards[1].classList[0] ||
            !card.classList.contains("matched")
          ) {
            card.style.pointerEvents = "auto";
          }
        });
        // remove flipepd classes
        flippedCards.forEach((card) => {
          // set back to default white color
          card.style.backgroundColor = "transparent";
          card.classList.remove("flipped");
        });
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */

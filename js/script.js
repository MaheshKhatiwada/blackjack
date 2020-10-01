let blackjackGame = {
  you: { spanScore: "#your-box-result", div: "#your-box", score: 0 },
  dealer: { spanScore: "#dealer-box-result", div: "#dealer-box", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
};
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const sound = new Audio("static/sounds/swish.m4a");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  card = randomCard();
  showCard(card, YOU);
}
function randomCard() {
  let random = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][random];
}

function showCard(card, player) {
  let yourImage = document.createElement("img");
  yourImage.src = `static/images/${card}.png`;
  document.querySelector(player["div"]).appendChild(yourImage);
  sound.play();
}

function blackjackDeal() {
  let allImages = document.querySelector("#your-box").querySelectorAll("img");

  for (let i = 0; i < allImages.length; i++) {
    allImages[i].remove();
  }
}

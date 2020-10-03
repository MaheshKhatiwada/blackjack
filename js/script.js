let blackjackGame = {
  you: { spanScore: "#your-box-result", div: "#your-box", score: 0 },
  dealer: { spanScore: "#dealer-box-result", div: "#dealer-box", score: 0 },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11],
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const sound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const looseSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);
document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", blackjackStand);
document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}
function randomCard() {
  let random = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][random];
}

function showCard(card, player) {
  if (player["score"] <= 21) {
    let yourImage = document.createElement("img");
    yourImage.src = `static/images/${card}.png`;
    document.querySelector(player["div"]).appendChild(yourImage);
    sound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOver"] === true) {
    let allImages = document.querySelector("#your-box").querySelectorAll("img");

    for (let i = 0; i < allImages.length; i++) {
      allImages[i].remove();
    }
    allImages = document.querySelector("#dealer-box").querySelectorAll("img");

    for (let i = 0; i < allImages.length; i++) {
      allImages[i].remove();
    }
    YOU["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#your-box-result").textContent = 0;
    document.querySelector("#dealer-box-result").textContent = 0;

    document.querySelector("#your-box-result").style.color = "white";
    document.querySelector("#dealer-box-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Let's Play";
    document.querySelector("#blackjack-result").style.color = "grey";

    blackjackGame["isStand"] = false;
    blackjackGame["turnsOver"] = false;
  }
}

function updateScore(card, player) {
  if (card === "A") {
    if (player["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      player["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      player["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {
    player["score"] += blackjackGame["cardsMap"][card];
  }
}
function showScore(player) {
  if (player["score"] > 21) {
    document.querySelector(player["spanScore"]).textContent = "BUST";
    document.querySelector(player["spanScore"]).style.color = "red";
  } else {
    document.querySelector(player["spanScore"]).textContent = player["score"];
  }
}

function blackjackStand() {
  blackjackGame["isStand"] = true;
  card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
  if (DEALER["score"] > 15) {
    blackjackGame["turnsOver"] = true;
    showResult(competeWinner());
  }
}

function competeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
      blackjackGame["wins"]++;
      winner = YOU;
    } else if (YOU["score"] < DEALER["score"]) {
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (YOU["score"] === DEALER["score"]) {
      blackjackGame["draws"]++;
    }
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) {
    blackjackGame["losses"]++;
    winner = DEALER;
  } else if (YOU["score"] > 21 && DEALER["score"] > 21) {
    blackjackGame["draws"]++;
  }
  console.log(blackjackGame);
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOver"] === true) {
    if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You Won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You Lost!";
      messageColor = "red";
      looseSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "You drew!";
      messageColor = "grey";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}

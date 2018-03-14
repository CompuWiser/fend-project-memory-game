/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector("ul.deck");
const resetButton = document.querySelector("div.restart");
let movesCounter = document.querySelector("span.moves");
let timerDisplay = document.querySelector("span.timer");

let cardSymbols = ["repeat", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "university", "coffee", "eye", "gamepad", "gift"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createCardsList(arrayOfCardSymbols) {
    shuffle(arrayOfCardSymbols);
    let cardsList = [];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 8; i++) {
            let newAnchor = document.createElement("i");
            newAnchor.setAttribute("class", "fa fa-" + arrayOfCardSymbols[i]);
            let newElement = document.createElement("li");
            newElement.setAttribute("class", "card");
            newElement.appendChild(newAnchor);
            cardsList.push(newElement);
        }
    }

    return shuffle(cardsList);
}

function createAndAppend(cardsList, parent) {
    let fragment = document.createDocumentFragment();
    cardsList.forEach(function(card) {
        fragment.appendChild(card);
    });
    parent.appendChild(fragment);
}




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var timer = new Timer();
timer.addEventListener('secondsUpdated', function () {
    //$('#basicUsage').html(timer.getTimeValues().toString());
    timerDisplay.innerHTML = timer.getTimeValues().toString();
});

startGame();

resetButton.addEventListener("click", function(){
	deck.innerHTML = "";
	startGame();
});



let listOfRevealedCards = [];
deck.addEventListener("click", function(evt) {

	if (timerDisplay.innerHTML == "00:00:00") timer.start();

    if (listOfRevealedCards.length < 2) {

        if (!evt.target.classList.contains("show")) {
            evt.target.classList.add("show", "open", "flipInY");
            listOfRevealedCards.push(evt.target)
        }

        if (listOfRevealedCards.length == 2) {
        	movesCounter.innerHTML++;
            if (listOfRevealedCards[0].firstElementChild.classList.value === listOfRevealedCards[1].firstElementChild.classList.value) {
                console.log("matched");
                listOfRevealedCards.length = 0;
            } else {
                let [cardOne, cardTwo] = listOfRevealedCards;
                setTimeout(function() {
                    reHide(cardOne, cardTwo);
                }, 1000);
            }

        }
    }
});

function reHide(...card) {
    card.forEach(function(element) {
        element.classList.remove("show", "open", "flipInY");
        listOfRevealedCards.length = 0;
    });
}

function startGame() {
	movesCounter.innerHTML = 0;
	createAndAppend(createCardsList(cardSymbols), deck);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
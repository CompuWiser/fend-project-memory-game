/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector("ul.deck");
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

createAndAppend(createCardsList(cardSymbols), deck);


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

let listOfRevealedCards = [];
deck.addEventListener("click", function(evt) {
    if (listOfRevealedCards.length >= 2) {
        listOfRevealedCards.forEach(function(card) {
            card.classList.remove("show");
        });
        listOfRevealedCards = [];
    }
    if (!evt.target.classList.contains("show")) {
    	console.log(evt.target.firstElementChild.classList.value);
        evt.target.classList.add("show");
        listOfRevealedCards.push(evt.target)
    }
});
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
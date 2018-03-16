/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector("ul.deck");
const resetButton = document.querySelector("div.restart");
let movesCounter = document.querySelector("span.moves");
let timerDisplay = document.querySelector("span.timer");
let panelStars = document.querySelector(".score-panel .stars");
let modalStars = document.querySelector(".modal-stars");

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
timer.addEventListener('secondsUpdated', function() {
    timerDisplay.innerHTML = timer.getTimeValues().toString();
});

startGame();

resetButton.addEventListener("click", resetTheGame);

document.querySelector(".modal-restart").addEventListener("click", function() {
    modal.style.display = "none";
    resetTheGame();
});

function resetTheGame() {
    deck.innerHTML = "";
    timer.stop();
    timerDisplay.innerHTML = "00:00:00";
    resetStars();
    startGame();
}



let listOfRevealedCards = [];
let numberOfMatches = 0;
let timerStarted = false;

deck.addEventListener("click", function(evt) {

    if (!timerStarted) {
        timer.start();
        timerStarted = true;
    }



    if (listOfRevealedCards.length < 2) {

        if (!evt.target.classList.contains("show")) {
            evt.target.classList.add("show", "open", "flipInY");
            listOfRevealedCards.push(evt.target)
        }

        if (listOfRevealedCards.length == 2) {
            movesCounter.innerHTML++;

            if (movesCounter.innerHTML == 12) {
                setStarsOnPage(2);
            } else if (movesCounter.innerHTML == 20) {
                setStarsOnPage(1);
            }

            if (listOfRevealedCards[0].firstElementChild.classList.value === listOfRevealedCards[1].firstElementChild.classList.value) {
                evt.target.classList.add("match");
                listOfRevealedCards[0].classList.add("match");
                numberOfMatches++;
                if (numberOfMatches == 8) matchComplete();
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

function matchComplete() {
    timer.stop();
    displayResults();
}

// Get the modal
var modal = document.querySelector('.modal');

// Get the <span> element that closes the modal
var closeButton = document.querySelector(".close");

// When the user clicks the button, open the modal 
function displayResults() {
    document.querySelector(".modal-moves").innerHTML = movesCounter.innerHTML;
    document.querySelector(".modal-time").innerHTML = timerDisplay.innerHTML;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function setStarsRating(numOfStars, starClass, ...elements) {
    elements.forEach(function(element) {
        let starElement = element.querySelectorAll("li");
        let starElementKeys = Object.keys(starElement);

        for (let i = 3; i > numOfStars; i--) {
            let key = starElementKeys[i - 1];
            starElement[key].firstElementChild.classList = starClass;
        }
    });
}

function setStarsOnPage(n) {
    setStarsRating(n, "fa fa-star-o", panelStars, modalStars);
}

function resetStars(){
	setStarsRating(0, "fa fa-star", panelStars, modalStars);
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
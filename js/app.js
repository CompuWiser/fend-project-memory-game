let deck = document.querySelector('ul.deck');
let resetButton = document.querySelector('div.restart');
let modalRestart = document.querySelector('.modal-restart');
let movesCounter = document.querySelector('span.moves');
let timerDisplay = document.querySelector('span.timer');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.close');
let modalMoves = document.querySelector('.modal-moves');
let modalTime = document.querySelector('.modal-time');
let panelStars = document.querySelector('.score-panel .stars');
let modalStars = document.querySelector('.modal-stars');

let cardSymbols = ['repeat', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'university', 'coffee', 'eye', 'gamepad', 'gift'];


function createCardsList(arrayOfCardSymbols) {

	//get different 8 symbols each time
    shuffle(arrayOfCardSymbols);

    //create 2 cards from each of the first 8 cards, to get 16 cards in total
    let cardsList = [];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < 8; i++) {
            let newAnchor = document.createElement('i');
            newAnchor.setAttribute('class', 'fa fa-' + arrayOfCardSymbols[i]);
            let newElement = document.createElement('li');
            newElement.setAttribute('class', 'card');
            newElement.appendChild(newAnchor);
            cardsList.push(newElement);
        }
    }

    return shuffle(cardsList);
}

//create a random card-list, and append it to parent
function createAndAppend(cardsList, parent) {
    let fragment = document.createDocumentFragment();
    cardsList.forEach(function(card) {
        fragment.appendChild(card);
    });
    parent.appendChild(fragment);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
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

initializeDeckOfCards();

function initializeDeckOfCards() {
    movesCounter.innerHTML = 0;
    createAndAppend(createCardsList(cardSymbols), deck);
}

let timer = new Timer();
timer.addEventListener('secondsUpdated', function() {
    timerDisplay.innerHTML = timer.getTimeValues().toString();
});

resetButton.addEventListener('click', resetTheGame);
modalRestart.addEventListener('click', resetTheGame);

function resetTheGame() {
	modal.style.display = 'none';
    deck.innerHTML = '';
    timer.stop();
    timerDisplay.innerHTML = '00:00:00';
    resetStars();
    initializeDeckOfCards();
}


let listOfRevealedCards = [];
let numberOfMatches = 0;
let timerStarted = false;

deck.addEventListener('click', function(evt) {

    if (!timerStarted) {
        timer.start();
        timerStarted = true;
    }

    // only reveal two cards at a time
    if (listOfRevealedCards.length < 2) {

    	//only reveal un-revealed cards
        if (!evt.target.classList.contains('show')) {
            evt.target.classList.add('show', 'open', 'flipInY');
            listOfRevealedCards.push(evt.target)
        }

        //do compare two revealed cards
        if (listOfRevealedCards.length == 2) {
            movesCounter.innerHTML++;

            //set star rating based on moves count
            if (movesCounter.innerHTML == 12) {
                setStarsOnPage(2);
            } else if (movesCounter.innerHTML == 20) {
                setStarsOnPage(1);
            }

            //if there is a match
            if (listOfRevealedCards[0].firstElementChild.classList.value === listOfRevealedCards[1].firstElementChild.classList.value) {
                evt.target.classList.add('match');
                listOfRevealedCards[0].classList.add('match');
                numberOfMatches++;
                if (numberOfMatches == 8) matchComplete();
                listOfRevealedCards.length = 0;
            } else {	//when the two cards are not equal:
            	//set perminent reference to last revealed cards
                let [cardOne, cardTwo] = listOfRevealedCards;

                //cards will be rehidden after 1 second, and clicks will not received during this period
                setTimeout(function() {
                    reHide(cardOne, cardTwo);
                }, 1000);
            }

        }
    }
});

function reHide(...card) {
    card.forEach(function(element) {
        element.classList.remove('show', 'open', 'flipInY');
        listOfRevealedCards.length = 0;
    });
}

function matchComplete() {
    timer.stop();
    displayResults();
}


// modal that shows results, the template took from https://www.w3schools.com/howto/howto_css_modals.asp

// When the user finishes the game, open the modal 
function displayResults() {
    modalMoves.innerHTML = movesCounter.innerHTML;
    modalTime.innerHTML = timerDisplay.innerHTML;
    modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


//format the modal content, show the results

//replace star-class with other one starting from the end. styling can be applied to several elements at once
function manipulateStarClassesFromBackToFront(numOfStarsToKeep, starClassToApply, ...elementsToApplyOn) {
    elementsToApplyOn.forEach(function(element) {
        let starElement = element.querySelectorAll('li');
        let starElementKeys = Object.keys(starElement);

        for (let i = 3; i > numOfStarsToKeep; i--) {
            let key = starElementKeys[i - 1];
            starElement[key].firstElementChild.classList = starClassToApply;
        }
    });
}

//reduce star rating
function setStarsOnPage(n) {
    manipulateStarClassesFromBackToFront(n, 'fa fa-star-o', panelStars, modalStars);
}

// reset stars to 3 stars
function resetStars(){
	manipulateStarClassesFromBackToFront(0, 'fa fa-star', panelStars, modalStars);
}
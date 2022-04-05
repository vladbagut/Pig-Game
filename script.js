'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePLayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePLayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  currentScore = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3.Check for rolled 1
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
    } else {
      //  switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.ADD CURRENT SCORE TO ACTIVER PLAYER'S SCORE
    scores[activePLayer] += currentScore;
    //  scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    //2.Chech if score is >= 100
    if (scores[activePLayer] >= 20) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      diceEl.src = `dice-${dice}.png`;
    } else {
      switchPlayer();
    }
  }
  //Switch to the next player
});

btnNew.addEventListener('click', init);

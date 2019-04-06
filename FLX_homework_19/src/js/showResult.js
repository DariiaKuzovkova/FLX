let showResult = (elem) => {
    if (counter <= 3) {
        let item = arrForRand[Math.floor(Math.random()*arrForRand.length)];
        if (item === elem) {
            showScore.innerHTML = `<strong>Round ${counter}.</strong> ${elem} vs. ${item}.<br>
            <span class="deadHeat">You have DEAD HEAT! Try again!</span>`;
        } else if (item === 'Rock' && elem === 'Scissors' || item === 'Scissors' && elem === 'Paper'
        || item === 'Paper' && elem === 'Rock') {
            showScore.innerHTML = `<strong>Round ${counter}.</strong> ${elem} vs. ${item}.<br>
            <span class = "lost">You have LOST!</span>`;
            gameScore++, counter++;
        } else {
            showScore.innerHTML = `<strong>Round ${counter}.</strong> ${elem} vs. ${item}.<br>
            <span class = "won">You have WON!</span>`;
            userScore++, counter++;
        }
    }
    if (counter === 4) {
        userScore > gameScore ? showScore.innerHTML = `<span class = "won">You are the WINNER!</span>` :
        userScore === gameScore ? showScore.innerHTML = '<span class = "deadHeat">You have DEAD HEAT!</span>' :
        showScore.innerHTML = '<span class = "lost">You are loser :(</span>';
        counter = 1, userScore = 0, gameScore = 0;
    }
}
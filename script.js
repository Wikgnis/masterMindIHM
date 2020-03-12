/* Generation of the masterMind */
console.log('Starting generating the Mastermind.');

/**
 * functions
 */
    /**
     * event related
     */
    function roundOnclick() {
        console.log(event.target.id + ' clicked');
        /* color choice */
    }

    /**
     * generation
    */
function createRow(gameFrame) {
    console.log('Row Creation ');
    var row = document.createElement('div');
    /* setup row */
    for (let index = 0; index < 4; index++) {
        var round = createRound();
        round.id = createID();
        round.onclick = function () { roundOnclick(event)};
        row.appendChild(round);
    }
    /* add row to top*/
    row.classList.add('row');
    if (gameFrame.firstChild == null) gameFrame.appendChild(row);
    else gameFrame.insertBefore(row, gameFrame.firstChild);
}

function createRound() {
    var round = document.createElement('div');
    round.classList.add('round');
    return round;
}

function createID() {
    if (typeof nbID == 'undefined') nbID = 0;
    else nbID++;
    return 'circle' + nbID;
}

/**
 * active part
 */
let gameFrame = document.getElementById("Game");

gameFrame.style.height = "100vh";
gameFrame.style.background = "#FDF1B8";
gameFrame.style.overflow = "hidden";

createRow(gameFrame);
createRow(gameFrame);
/**
 * @autor LEBOCQ Titouan
 */

/* Generation of the masterMind */
console.log('Starting generating the Mastermind.');

var colorList = ['yellow', 'black', 'blue', 'red', 'magenta', 'cyan'];
let elementChoosed;

/**
 * functions
 */
    /**
     * event related
     */
var colorPaletteGenerated = false; // used to delete the colorpalette if the user click in the gameFrame
/**
 * create the color palette if element is clicked
 */
function roundOnclick() {
    var element = event.target;
    var parentClassList = element.parentElement.classList;
    console.log("this element is inactive : " + parentClassList.contains('inactive'));
    if (!(parentClassList.contains('inactive'))) {
        elementChoosed = element;
        console.log(element.id + ' clicked');
        /* color choice */
        frame = document.getElementById("Game");
        try {
            frame.appendChild(generateColorPalette());
            setTimeout(function () {
                colorPaletteGenerated = true;
            }, 500);
        } catch (error) {
            console.log("color palette already exist")
        }
    }
}
/**
 * Generate if necessary a color palette
 */
function generateColorPalette(){
    if (document.getElementById("palette") == null) {
        var palette = document.createElement('div');
        palette.id = "palette";
        colorList.forEach(element => {
            var colorElement = document.createElement('div');
            colorElement.classList.add(element);
            colorElement.classList.add("paletteElement");
            colorElement.onclick = function () { chooseColor(); };
            palette.appendChild(colorElement);
        });
        return palette;
    }
}

/**
 * Change the color of the Master mind element actually choosed
 */
function chooseColor() {
    if (elementChoosed != null) {
        console.log("Color choosed : " + event.target.classList[0]);
        color = event.target.classList[0];
        elementChoosed.classList.add(color);
        if (elementChoosed.classList.length > 2) elementChoosed.classList.remove(elementChoosed.classList[1]);
        delColorPalette();
    }
}

/**
 * destroy (if generated) the color palette
 */
function delColorPalette() {
    try {
        console.log("destroy palette");
        var palette = document.getElementById("palette");
        palette.remove();
        colorPaletteGenerated = false;
    } catch (error) {}
}

/**
 * if ( @see allChecked ) generate new row
 * @param {*} gameFrame in which we work
 */
function validationCheck(gameFrame) {
    if (allChecked()) {
        elementChoosed = null;
        var rows = document.getElementsByClassName('row');
        rows[0].classList.add('inactive');
        delColorPalette();
        createRow(gameFrame);
    }
}

/**
 * Check if all 4 Master Mind element have colors
 */
function allChecked() {
    var activeRow = document.getElementsByClassName("row")[0];
    var colorsChoosed = 0;
    (activeRow.childNodes).forEach(elementChild => {
        (elementChild.classList).forEach(elementChildClass => {
            colorList.forEach(color => {
                if (color == elementChildClass) colorsChoosed++;
            });

            console.log("Element : " + elementChild.id + " | class element :" + elementChildClass + " | actual nb color choosed : " + colorsChoosed);
        });
    });
    console.log("Nb color choosed : " + colorsChoosed);
    return (colorsChoosed == 4);
}

    /**
     * generation
    */
/**
 * generate a new row with round in it ( @see createRound )
 * @param {*} gameFrame in which we work
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

/**
 * create a round div
 */
function createRound() {
    var round = document.createElement('div');
    round.classList.add('round');
    return round;
}

/**
 * generate an unique id for round div
 * @return {String} composed of circle + number of other circle
 */
function createID() {
    if (typeof nbID == 'undefined') nbID = 0;
    else nbID++;
    return 'circle' + nbID;
}

/**
 * active part
 */

let gameFrame = document.getElementById("Game"); // create gameFrame
//setup gamFrame
gameFrame.style.height = "100vh";
gameFrame.style.background = "#FDF1B8";
gameFrame.style.overflow = "hidden";

gameFrame.onclick = function () { // delete the color palette if needed (focus on the gameFrame)
    console.log("Palette can be deleted : " + colorPaletteGenerated);
    if (colorPaletteGenerated) delColorPalette();
}

// creation of the validation button to generate rows
var b = document.createElement('button');
b.innerText = "Valider";
b.id = 'validationButton';
gameFrame.appendChild(b);
b.onclick = function () { validationCheck(gameFrame); };
// end creation of the validation button

createRow(gameFrame); // creation first row

/* generation game engine */
var scriptGen = document.createElement('script');
scriptGen.src = 'MasterMind_gameEngine.js';
gameFrame.appendChild(scriptGen);
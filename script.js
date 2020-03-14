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
var colorPaletteGenerated = false;
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

function generateColorPalette(element){
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

function chooseColor() {
    if (elementChoosed != null) {
        console.log(event.target.classList[0]);
        color = event.target.classList[0];
        elementChoosed.classList.add(color);
        if (elementChoosed.classList.length > 2) elementChoosed.classList.remove(elementChoosed.classList[1]);
        delColorPalette();
    }
}

function delColorPalette() {
    try {
        console.log("destroy palette");
        var palette = document.getElementById("palette");
        palette.remove();
        colorPaletteGenerated = false;
    } catch (error) {}
}

function validationCheck(gameFrame) {
    if (allChecked()) {
        elementChoosed = null;
        var rows = document.getElementsByClassName('row');
        rows[0].classList.add('inactive');
        delColorPalette();
        createRow(gameFrame);
    }
}

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

gameFrame.onclick = function () {
    console.log("Palette can be deleted : " + colorPaletteGenerated);
    if (colorPaletteGenerated) delColorPalette();
}

var b = document.createElement('button');
b.innerText = "Valider";
b.id = 'validationButton';
gameFrame.appendChild(b);
b.onclick = function () { validationCheck(gameFrame); };

createRow(gameFrame);
/**
 * Event listener
 */
document.addEventListener("keydown", event => {
    switch (event.keyCode) { // enter key
        case 13:
            valider();
            break;

        default:
            break;
    }
})
/**
 * Creating elements
 */
function createMenu() {

}

function createRules() {
    let Rules = document.createElement("div");
    Rules.style.cssText = "position : absolute; top : 0; width : 100%; height : 100%; background : red; transition : 1s;";
    Rules.onclick = function () {
        this.id = "toDelete";
        this.style.top = "-100%";
        setTimeout(function () { document.getElementById("toDelete").remove(); }, 1000);
        document.body.style.overflow = "auto";
    }
    return Rules;
}

function showRules() {
    document.body.appendChild(createRules());
    document.body.style.overflow = "hidden";
}

var nbVis = 0;
function createIdVisual() {
    nbVis++;
    return "Visual_" + nbVis;
}

var nbTry = 12;
function createContainer() {
    let container = document.createElement("div");
    soluce = createSoluce();
    console.log(soluce);
    container.classList.add("container");
    for (let i = 0; i < nbTry; i++) {
        container.appendChild(createRow());
    }
    row_Active(container.lastChild);
    return container;
}

var nbChoix = 4;
function createRow() {
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("inactive");
    for (let i = 0; i < nbChoix + 1; i++) {
        let rowElement = createRowElement();
        row.appendChild(rowElement);
        if (i==nbChoix) {
            for (let index = 0; index < nbChoix; index++) {
                rowElement.appendChild(createHintElement());
            }
        }
        else {
            rowElement.appendChild(createVisual());
        }
    }
    return row;
}

function createRowElement() {
    let rowElement = document.createElement("div");
    rowElement.classList.add("rowElement")
    return rowElement;
}

function createHintElement() {
    let Hint = document.createElement("div");
    Hint.classList.add("Hint");
    return Hint;
}

function createVisual() {
    let visual = document.createElement("div");
    visual.id = createIdVisual();
    visual.classList.add("visual");
    visual.onclick = function (event) {
        let FcdVisual = event.target;
        Array.from(FcdVisual.parentElement.parentElement.classList).forEach(element => {
            if ("active" == element) {
                FocusedVisual = FcdVisual;
                if (!paletteDeployed) deployPallette();
                else destroyPalette();
            }
        });
    }
    return visual;
}

function createRestartButton() {
    let restartButton = document.createElement("button");
    restartButton.style.cssText = "position : absolute; top : 0; Left : 0; height : 50px";
    restartButton.innerHTML = "restart";
    restartButton.onclick = function () { restart(); }
    return restartButton;
}

function createEndScreen() {
    let ecranDeFin = document.createElement("div");
    ecranDeFin.id = "ecranFin";
    ecranDeFin.style.cssText = "position : absolute; top : 0; left : 0; width : 100%; height : 100%; background: #313638;display: flex;justify-content: center;align-items: center;flex-direction: column;; transition : 1s";
    ecranDeFin.onclick = function () {
        let element = this;
        setTimeout(function () { document.getElementById("ecranFin").remove(); }, 1000);
        this.style.top = "-100%";
        restart()
    }
    let text = document.createElement("div");
    let img = document.createElement("img");
    img.src = gagne ? "https://image.flaticon.com/icons/svg/2784/2784484.svg" : "https://image.flaticon.com/icons/svg/1687/1687666.svg";
    img.alt = "logo";
    img.style.cssText = "width: 200px; height: 200px;"
    text.appendChild(img);
    let textCongrat = document.createElement("div");
    if (gagne) textCongrat.innerHTML = "Bravo vous avez gagné !";
    else textCongrat.innerHTML = "Dommage vous avez perdu"
    text.appendChild(textCongrat);
    text.style.cssText = "display: flex;justify-content: center;align-items: center;margin: 50px;font-size: 50px;font-family: 'Playfair Display', serif;font-weight: bold;color: black;background-color: #e8e9eb;padding: 20px 100px;border-radius: 20px;"
    let textRestart = document.createElement("div");
    textRestart.innerHTML = "Click to Restart";
    textRestart.style.cssText = "color:#e8e9eb;font-size: 80px;font-family: 'Playfair Display', serif;font-weight: bold;padding: 10px;";
    ecranDeFin.appendChild(text);
    ecranDeFin.appendChild(textRestart);
    return ecranDeFin;
}

function styleWrapper() {
    return newStyle(".MastrMindWrapper", ["width : 100%", "min-height : 100vh", "max-height : min-content", "background : radial-gradient(circle, #F9A72B 0%, #FA9026 70%, #FB6C1F 100%)", "display : inline-flex", "justify-content : center", "align-items : center"]);
}

function newStyle(name, args) {
    style = new String();
    style += name + " { ";
    args.forEach(element => {
        style += " " + element + ";"
    });
    style += "}"
    return style;
}

function styleRow() {
    return newStyle(".row", ["display : flex", "align-items : flex-start"])
}

function styleRowElements() {
    let styles = new String();
    // content
    styles += newStyle(".rowElement", ["display : flex", "width : 5vh", "height : 5vh", "padding: 10px","background : #2D2D2D"]);
    // last child
    styles += newStyle(".rowElement:last-child", ["width : 10vh ", "align-items:center", "justify-content : space-evenly"]);
    styles += newStyle(".active>.rowElement:last-child>.Hint", ["display : none"])
    // visual
    styles += newStyle(".visual", ["width : 100%", "height : 100%", "border-radius : 50%", "background : white"])
    // color choice
    styles += newStyle(".orange", ["background : #f0932b"]);
    styles += newStyle(".red", ["background : #eb4d4b"]);
    styles += newStyle(".green", ["background : #6ab04c"]);
    styles += newStyle(".white", ["background : #c7ecee"]);
    styles += newStyle(".blue", ["background : #4834d4"]);
    styles += newStyle(".black", ["background : #130f40"]);
    styles += newStyle(".grey", ["background : #535c68"]);
    styles += newStyle(".violet", ["background : #be2edd"]);
    return styles;
}

function styleHint() {
    let styles = new String();
    styles += newStyle(".Hint", ["width : 20%", "height : 40%", "border-radius : 50%", "background : white", "display : inline-block"]);
    styles += newStyle(".found", ["background : green"]);
    styles += newStyle(".partFound", ["background : black"])
    return styles;
}

function styleValidationButton() {
    return newStyle("#validationButton", ["width : 100%", "height : 100%", "background: #378AD3", "border-style: none", "border-radius: 8px", "color : white", "font-size: 1vw"]);
}

function stylePalette() {
    let styles = "";
    styles += newStyle(".palette>div", ["display : inline-block", "width : 10vw", "height : 10vw", "margin : 1vw"]);
    styles += newStyle(".palette", ["position : absolute", "left : 0", "width : 100%", "height : 100%", "display : flex", "justify-content : center", "align-items : center", "background : rgba(0, 0, 0, 0.9);"]);
    return styles;
}

function styleContainer() {
    return newStyle(".container", ["display: inline-block;"])
}

function styleAnimation() {
    let styles = "";
    styles += "$n: 20;";
    return styles;
}

function setupStyleSheet(style) {
    let content = new String();
    content += styleWrapper();
    content += styleRowElements();
    content += stylePalette();
    content += styleRow();
    content += styleHint();
    content += styleValidationButton();
    content += styleContainer();
    content += styleAnimation();
    style.appendChild(document.createTextNode(content));
}

function createStyleSheet() {
    var style = document.createElement("style");
    style.id = "MstrMind_StyleSheet";
    style.appendChild(document.createTextNode("")); // WebKit hack
    style.type = 'text/css';
    return style;
}

/**
 * Editing Elements
 */

function restart() {
    wrappers[0].getElementsByClassName("container")[0].remove();
    wrappers[0].appendChild(createContainer())
}

function finPartie() {
    wrappers[0].appendChild(createEndScreen());
    gagne = false;
}

function updateRowElement() {

}

var paletteDeployed = false;
var palette;
var FocusedVisual = new Object();
var colors = ["orange", "red", "green", "white", "blue", "black", "grey", "violet"];

function deployPallette() {
    palette = document.createElement("div");
    palette.classList.add("palette")
    palette.onclick = function () { destroyPalette(); }
    colors.forEach(color => {
        let element = document.createElement("div");
        element.classList.add(color);
        element.onclick = function (event) {
            colors.forEach(color => {
                FocusedVisual.classList.remove(color);
            });
            FocusedVisual.classList.add(event.target.classList);
            destroyPalette();
        }
        palette.appendChild(element);
    });
    wrappers[0].appendChild(palette);
    paletteDeployed = true;
}

function destroyPalette() {
    FocusedVisual = null;
    try {
        palette.parentNode.removeChild(palette);
        paletteDeployed = false;
    }
    catch {}
}

function createSoluce() {
    let CreatedSoluce = [];
    let colorsSoluce = Array.from(colors);
    for (let index = 0; index < nbChoix; index++) {
        CreatedSoluce.push(colorsSoluce.splice(Math.floor(Math.random() * colorsSoluce.length), 1)[0]);
    }
    return CreatedSoluce;
}

var gagne = false;
function valider() {
    try {
        let row = detectActiveRow();
        let colorChoosed = [];
        for (let index = 0; index < row.childNodes.length - 1; index++) {
            const elementRow = row.childNodes[index];
            if (elementRow.childNodes[0].classList.length > 1) {
                colorChoosed.push(elementRow.childNodes[0].classList[1])
            }
        }
        if (colorChoosed.length == nbChoix) {
            let answer = detectCorrectAnswer(colorChoosed);
            if (editHint(row, answer) == nbChoix) {
                gagne = true;
                finPartie();
            }
            else {
                row_Inactive(row);
            }
        }
    } catch (error) {
        console.log(error)
        finPartie();
    }
}

var soluce;
function row_Active(element) {
    element.classList.remove("inactive");
    element.classList.add("active");
    // creation validation
    let validationButton = document.createElement("button");
    validationButton.id = "validationButton";
    validationButton.innerHTML = "Valider";
    validationButton.onclick = function () { valider(); }
    element.lastChild.appendChild(validationButton);
}

function row_Inactive(element) {
    element.classList.remove("active");
    element.classList.add("inactive");
    let button = document.getElementById("validationButton");
    button.parentNode.removeChild(button);
    row_Active(element.previousSibling)
}

function editHint(row, Answers) {
    let foundCount = 0;
    for (let index = 0; index < Answers.length; index++) {
        const element = Answers[index];
        const Hint = row.lastChild.childNodes[index];
        if (element == "found") {
            Hint.classList.add("found");
            foundCount++;
        }
        else {
            Hint.classList.add("partFound");
        }
    }
    return foundCount;
}

/**
 * Detection
 */

function detectActiveRow() {
    let rows = wrappers[0].getElementsByClassName("container")[0].children;
    let activeRow = null;
    for (let index = rows.length - 1; index >= 0 && activeRow == null; index--) {
        const element = rows[index];
        Array.from(element.classList).forEach(classElement => {
            if (classElement == "active") {
                activeRow = element;
            }
        });
    }
    return activeRow;
}

function isInSoluce(element) {
    let isSoluce = false;
    for (let index = 0; index < soluce.length && !isSoluce; index++) {
        const color = soluce[index];
        if (color == element) isSoluce = true
    }
    return isSoluce;
}

function isIn(element, ArrayT) {
    let returnState = false;
    for (let index = 0; index < ArrayT.length && !returnState; index++) {
        const elementArray = ArrayT[index];
        if (elementArray == element) returnState = true;
    }
    return returnState;
}

function detectCorrectAnswer(choices) {
    let returnArray = [];
    let colorsChoosed = [];
    for (let index = 0; index < choices.length; index++) {
        const element = choices[index];
        if (!(isIn(element, colorsChoosed)) && isInSoluce(element)) {
            colorsChoosed.push(element);
            if (soluce.indexOf(element) == index) {
                returnArray.unshift("found");
            } else {
                returnArray.push("foundPart");
            }
        }
    }
    return returnArray;
}

/**
 * Main
 */
let Style = createStyleSheet();
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
document.head.appendChild(Style); // Add the <style> element to the page
setupStyleSheet(Style);

let wrappers = document.getElementsByClassName("MastrMindWrapper");
Array.from(wrappers).forEach(wrapper =>{
    wrapper.appendChild(createContainer());
    wrapper.appendChild(createRestartButton());
    showRules();
})

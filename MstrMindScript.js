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
function showRules() {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden"
    document.getElementById("containerRules").style.top = "0px";
    let dropdownMenu = document.getElementsByClassName("dropdown")[0]
    dropdownMenu.style.left = "-100%"
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

function createEndScreen() {
    let ecranDeFin = document.createElement("div");
    ecranDeFin.id = "ecranFin";
    ecranDeFin.style.cssText = "position : absolute; top : 0; left : 0; width : 100%; height : 100%; background: #313638;display: flex;justify-content: center;align-items: center;flex-direction: column;; transition : 1s";
    ecranDeFin.onclick = function () {
        let element = this;
        setTimeout(function () { document.getElementById("ecranFin").remove(); }, 1000);
        this.style.top = "-100%";
        restartMstrMind()
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

function styleRules() {
    let styles = "";
    styles += newStyle("#containerRules", ["font-family: 'Playfair Display', serif", "position: absolute", "width: 100%", "height: 100%", "overflow: hidden", "top: 0", "transition: 1s"]);
    styles += newStyle("#Rules", ["transition: ease-in-out 1s", "position: relative", "height: 100%", "width: 200%", "background: linear-gradient(110deg, #0c2461 60%, #1e3799 60%)", "display: flex", "flex-direction: row", "overflow: auto", "color : #f6f0e6"])
    styles += newStyle("#Rules1, #Rules2", ["height: 100vh", "width: 100vw", "display: flex", "align-items: center", "justify-content: space-evenly", "flex-wrap: wrap"])
    styles += newStyle("#Rules1>div, #Rules2>div", [" margin-top: 150px", "width: 400px", "overflow: hidden", "max-width: 100vw", "background : hsla(0, 0%, 0%, 0.322)", "padding : 15px", "border-radius : 8px", "min-height : 400px", "display : flex", "justify-content : center", "flex-direction : column"]);
    styles += newStyle("#Rules1>div>img, #Rules2>div>img", ["max-width: 100vw", "max-height: 400px"])
    styles += newStyle(".square", ["display: inline-block", "height: 40px", "width: 40px", "background: white"])
    styles += newStyle("#hideRules", ["position: absolute", "top: 0", "left: 25%", "transition: ease-out 1s", "transform : translate(-50%, 0)"])
    return styles;
}

function styleHint() {
    let styles = new String();
    styles += newStyle(".Hint", ["width : 100%", "border-radius : 50%", "background : white", "display : inline-block"]);
    styles += newStyle(".Hint:after", ["padding-bottom: 100%", "display: block", "content: \"\";"])
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

function styleDropDown(params) {
    let styles = "";
    styles += newStyle(".dropdown", ["position: absolute", "top: 10px", "left: 10px", "display: inline-block", "transition : 1s"]);
    styles += newStyle(".dropdown>img", ["height: 50px","width: 50px"]);
    styles += newStyle(".dropdown-content", ["display: none", "position: absolute", "background-color: grey","z-index: 1"]);
    styles += newStyle(".dropdown-content>button", ["width : 100%", "height : 50px", "color : "]);
    styles += newStyle("#nbChoices, #nbTry", ["display : flex", "flex-direction : column", 'justify-content : center', "align-items : center"])
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
    content += styleDropDown();
    content += styleRules();
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

function restartMstrMind() {
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
var menuStatus;

function deployPallette() {
    menuStatus = document.getElementsByClassName("dropdown-content")[0].style.display
    document.getElementsByClassName("dropdown-content")[0].style.display = ""
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
        document.getElementsByClassName("dropdown-content")[0].style.display = menuStatus
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
    showRules();
})

Array.from(document.getElementsByClassName("dropdown")).forEach(element => {
    element.onclick = function () {
        Array.from(this.getElementsByClassName("dropdown-content")).forEach(classElement => {
            if (event.target.nodeName != "INPUT" && event.target.nodeName != "BUTTON") {
                if (classElement.style.display == "") {
                    classElement.style.display = "block";
                    element.getElementsByTagName("img")[0].src = "https://image.flaticon.com/icons/svg/2089/2089792.svg"
                }
                else {
                    classElement.style.display = "";
                    element.getElementsByTagName("img")[0].src = "https://image.flaticon.com/icons/svg/561/561123.svg"
                }
            }
        })
    }
})

Array.from(document.getElementsByClassName("range_value")).forEach(element => {
    let range = element.parentNode.children[1];
    element.textContent = (element.parentNode.id == "nbChoices" ? "nombre de couleurs " : "nombre de tentatives ") + makeValueRange(range.value);
    if (range.parentNode.id == "nbChoices") nbChoix = parseInt(range.value, 10);
    if (range.parentNode.id == "nbTry") nbTry = parseInt(range.value, 10);
    range.onchange = function () {
        element.textContent = (element.parentNode.id == "nbChoices" ? "nombre de couleurs " : "nombre de tentatives ") + makeValueRange(event.target.value);
        if (range.parentNode.id == "nbChoices") nbChoix = parseInt(range.value, 10);
        if (range.parentNode.id == "nbTry") nbTry = parseInt(range.value, 10);
    }
})

function makeValueRange(inp) {
    return inp > 9 ? inp : "0" + inp;
}

document.getElementById("hideRules").onclick = function () {
    document.getElementById("containerRules").style.top = "-100%";
    document.body.style.height = "100%";
    document.body.style.overflow = "auto"
    let dropdownMenu = document.getElementsByClassName("dropdown")[0]
    dropdownMenu.style.left = "10px"
    
}
document.getElementById("Rules").onclick = function () {
    if (event.target.nodeName != "IMG") {
        if (this.style.left == "-100%") {
            this.style.left = 0;
            setTimeout(function () {
                document.getElementById("hideRules").style.left = "25%"
            }, 500)
        }
        else {
            this.style.left = "-100%";
            setTimeout(function () {
                document.getElementById("hideRules").style.left = "75%"
            }, 500)
        }
    }
}

function acceuilDisapear(event) {
    let acceuil = document.getElementById("title");
    acceuil.style.opacity = 0;
    setTimeout(function () { document.getElementById("title").remove(); }, 1000);
}

function delTuto() {
    document.getElementById("tuto").remove()
}
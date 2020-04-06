/**
 * Creating elements
 */
var nbVis = 0;
function createIdVisual() {
    nbVis++;
    return "Visual_" + nbVis;
}

function createContainer() {
    let container = document.createElement("div");
    container.classList.add("container");
    for (let i = 0; i < 12; i++) {
        container.appendChild(createRow());
    }
    row_Active(container.lastChild);
    return container;
}

function createRow() {
    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("inactive");
    for (let i = 0; i < 5; i++) {
        let rowElement = createRowElement();
        row.appendChild(rowElement);
        if (i==4) {
            for (let index = 0; index < 4; index++) {
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

function createStyleSheet() {
    var style = document.createElement("style");
    style.id = "MstrMind_StyleSheet";
    style.appendChild(document.createTextNode("")); // WebKit hack
    style.type = 'text/css';
    return style;
}

function styleWrapper() {
    return newStyle(".MastrMindWrapper", ["width : 100%", "height : 100%", "background : radial-gradient(circle, #F9A72B 0%, #FA9026 70%, #FB6C1F 100%)", "display : inline-flex", "justify-content : center", "align-items : center"]);
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
    return newStyle("#validationButton", ["width : 100%", "height : 100%", "background: #378AD3", "border-style: none", "border-radius: 8px", "color : white", "font-size: 1em"]);
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

function setupStyleSheet(style) {
    let content = new String();
    content += styleWrapper();
    content += styleRowElements();
    content += stylePalette();
    content += styleRow();
    content += styleHint();
    content += styleValidationButton();
    content += styleContainer();
    style.appendChild(document.createTextNode(content));
}

/**
 * Editing Elements
 */

function updateContainer(container) {

}

function updateRow() {

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
    for (let index = 0; index < 4; index++) {
        CreatedSoluce.push(colorsSoluce.splice(Math.floor(Math.random() * colorsSoluce.length), 1)[0]);
    }
    return CreatedSoluce;
}
var soluce = createSoluce();

function row_Active(element) {
    element.classList.remove("inactive");
    element.classList.add("active");
    // creation validation
    let validationButton = document.createElement("button");
    validationButton.id = "validationButton";
    validationButton.innerHTML = "Valider";
    validationButton.onclick = function (event) {
        let row = event.target.parentNode.parentNode;
        let colorChoosed = [];
        for (let index = 0; index < row.childNodes.length - 1; index++) {
            const elementRow = row.childNodes[index];
            if (elementRow.childNodes[0].classList.length > 1){
                colorChoosed.push(elementRow.childNodes[0].classList[1])
            }
        }
        if (colorChoosed.length == 4) {
            row_Inactive(row);
            let answer = detectCorrectAnswer(colorChoosed);
            if (editHint(row, answer) == 4) {
                //do something
            }
        }
    }
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

function detectActiveRow(wrapper) {
    let rows = wrapper.getElementsByClassName("container")[0].children;
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

document.head.appendChild(Style); // Add the <style> element to the page
setupStyleSheet(Style);

let wrappers = document.getElementsByClassName("MastrMindWrapper");
Array.from(wrappers).forEach(wrapper =>{
    wrapper.appendChild(createContainer());
})
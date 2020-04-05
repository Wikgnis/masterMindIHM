let rules = document.createElement("div");
// style
rules.id = "rules"
rules.style.position = "absolute";
rules.style.top = "0";
rules.style.width = "100%";
rules.style.height = "100%";
rules.style.background = "red";
rules.style.transition = "1s";
// onclick
rules.onclick = function () {
    for (let opacity = 1; opacity > 0; opacity -= 0.1) {
        setTimeout(function () { document.getElementById('rules').style.opacity = opacity; }, 100)
    }
    setTimeout(function () { rules.remove(); }, 1000);
    document.getElementsByClassName("MastrMindWrapper")[0].appendChild(buttonRules);
    buttonRules.style.position = "absolute";
    for (let opacity = 0; opacity < 1; opacity = opacity + 0.1) {
        setTimeout(function () { document.getElementById('rulesButton').style.opacity = opacity; }, 100)
    }
}

let buttonRules = document.createElement("button");
// styles
buttonRules.innerHTML = "?";
buttonRules.style.borderWidth = "0";
buttonRules.style.color = "white";
buttonRules.style.fontSize = "30px";
buttonRules.style.opacity = 0;
buttonRules.id = "rulesButton";
buttonRules.style.bottom = "2px";
buttonRules.style.right = "2px";
buttonRules.style.width = "50px";
buttonRules.style.height = "50px";
buttonRules.style.background = "#2D2D2D";
buttonRules.style.transition = "1s";
buttonRules.style.borderRadius = "50%";
// onclick
buttonRules.onclick = function () {
    for (let opacity = 0; opacity < 1; opacity = opacity + 0.1) {
        setTimeout(function () { document.getElementById('rules').style.opacity = opacity; }, 100)
    }
    setTimeout(function () { buttonRules.remove(); }, 1000);
    document.body.appendChild(rules);
    for (let opacity = 1; opacity > 0; opacity -= 0.1) {
        setTimeout(function () { document.getElementById('rulesButton').style.opacity = opacity; }, 100)
    }
}

// start
document.body.appendChild(rules);

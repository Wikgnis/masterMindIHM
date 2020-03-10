/* Generation of the masterMind */
console.log('Starting generating the Mastermind.');

let gameFrame = document.getElementById("Game");

gameFrame.style.height = "100vh";
gameFrame.style.background = "#FDF1B8";
gameFrame.style.overflow = "hidden";

var content = document.createElement("div");
var newContent = document.createTextNode('Hi there and greetings!');
content.appendChild(newContent);
ocument.body.insertBefore(content, gameFrame);

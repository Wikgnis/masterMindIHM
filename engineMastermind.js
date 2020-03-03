function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var coul = ['jaune','bleu','rouge','vert','blanc','noir'];

var x = getRandomInt(6);
var y = getRandomInt(6);
var z = getRandomInt(6);
var t = getRandomInt(6);

var reponse = [coul[x],coul[y],coul[z],coul[t]];
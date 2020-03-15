function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


var colorList = ['yellow', 'black', 'blue', 'red', 'magenta', 'cyan'];

function getColorElement(element) {
	element.classList.forEach(className => {
		if (className != 'round') {
			colorList.forEach(color => {
				if (color == className) return className;
			});
		}
	})
	return 'none';
}

function getColorsOfMasterMindElements() {
	var activeRow = document.getElementsByClassName("row")[0];
	var colors = [];
	(activeRow.childNodes).forEach(elementChild => {
		colors.push(getColorElement(elementChild));
	});
	return colors;
}

function testVictoire( testS , testR ) {
	for(let pas = 0; pas < 4; pas++)
	{
		if(testS[pas] != testR[pas])
		{
			return false;
		}
	}
	return true;
}

var x = getRandomInt(6);
var y = getRandomInt(6);
var z = getRandomInt(6);
var t = getRandomInt(6);

var solution = [colorList[x],colorList[y],colorList[z],colorList[t]];

var reponse = [colorList[x],colorList[y],colorList[z],colorList[t]];

//var reponse = ['','','',''];

/*if(testVictoire(solution,reponse))
{
	console.log("Victoire");
}
else 
{
	console.log("nul");
}
coucou
*/
var compteur = 0;

while( (compteur<13) && !(testVictoire(solution,reponse)) )
{
	console.log('Tour '+compteur);
	var colors = getColorsOfMasterMindElements;
	console.log('Colors : ' + colors);
	reponse = [coul1,coul2,coul3,coul4];
	compteur++;
};
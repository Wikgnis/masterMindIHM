function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
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

var coul = ['jaune','bleu','rouge','vert','blanc','noir'];

var x = getRandomInt(6);
var y = getRandomInt(6);
var z = getRandomInt(6);
var t = getRandomInt(6);

var solution = [coul[x],coul[y],coul[z],coul[t]];

var reponse = [coul[x],coul[y],coul[z],coul[t]];

//var reponse = ['','','',''];

/*if(testVictoire(solution,reponse))
{
	console.log("Victoire");
}
else 
{
	console.log("nul");
}
*/

var scanf = require('scanf');

var compteur = 0;

while( (compteur<13) && not (testVictoire(solution,reponse))
{
	console.log('Tour '+compteur);
	console.log('Entrer la 1ère couleur');
	var coul1=scanf('%s');
	
	console.log('Entrer la 2ème couleur');
	var coul2=scanf('%s');
	
	console.log('Entrer la 3ème couleur');
	var coul3=scanf('%s');
	
	console.log('Entrer la 4ème couleur');
	var coul4=scanf('%s');
	
	reponse = [coul1,coul2,coul3,coul4];
	compteur++;
}
		

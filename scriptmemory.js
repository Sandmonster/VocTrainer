//erzeugen der Boxen mit random werten aus dic//
console.log ('here');
let randomkeyword;
let biblio = [];
let dicbib =[];
let allreadyused = [];
let allreadyusedkeywords = [];
let wortpaaranzahl=parseInt(prompt("Please enter how many words you wanna learn", "5"));
let x=wortpaaranzahl+1;
let Picklistcount= (x-1)*2;
let Picklistcountsave = Picklistcount;
let randomIndex;
let wertcounterindex = 0;
let gesamtsummesollindex=0;
let targettext;
let targetvergleichswert;
let clickedCardvergleichswert;
let clickedCard=null;
let preventClick=false;
var counterrichtig=0;


function randomIndexerhalten () {
	randomIndex = Math.floor(Math.random() * Picklistcount);
}

function randomkeywordfunc() {
	let randomnumber = Math.floor(Math.random() *dic.length);
     randomkeydic = dic[(randomnumber)];
	 randomkeyword = randomkeydic[0];
	 }	 

function indexcontrolkey(x) {
	//wenn Index bereits genutzt oder 0 -> neuer wert und neue überprüfung
	if(allreadyusedkeywords.includes(randomkeyword)) {randomkeywordfunc ();indexcontrolkey(x);}
	//wenn index unbenutzt -> weiter und Index als benutzt Kennzeichnen
	else {allreadyusedkeywords[x] = randomkeyword;}
}

for(x >= 1; x = x-1;) {
	randomkeywordfunc ();
	console.log (randomkeyword);
	indexcontrolkey(x)
	let y = x + wortpaaranzahl;
	biblio[x] = randomkeyword;
	biblio[y] = randomkeydic[1];
	let keywordanswer =randomkeydic[1];
dicbib[randomkeyword] = keywordanswer;
}
console.log ('alle Wörter:',biblio);
console.log ('alle Wörter dicbib:',dicbib);

//building fields

function indexcontrol(i) {
	//wenn Index bereits genutzt oder 0 -> neuer wert und neue überprüfung
	if(allreadyused.includes(randomIndex) || randomIndex==0) {randomIndexerhalten ();indexcontrol(i);}
	//wenn index unbenutzt -> weiter und Index als benutzt Kennzeichnen
	else {allreadyused[i] = randomIndex;}
}

function buildgame() {
	for (let i = 0; i < Picklistcount-1; i++) {
	randomIndexerhalten ();
	indexcontrol(i);
	const word = biblio[randomIndex];
	wertcounterindex = wertcounterindex + randomIndex;
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	}
	//Restbetrag ermitteln
	for(let a=1; a <= Picklistcountsave; a++) {
		gesamtsummesollindex = a + gesamtsummesollindex;
	}
	const restbetrag = gesamtsummesollindex - wertcounterindex;
	// wort des Restbetrags
	const word = biblio[restbetrag];
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	//console.log ('restbetrag',restbetrag);
}


// Gamelogic

function resetcards(target,clickedCard){
			clickedCard.className = clickedCard.className.replace(' done','').trim() + ' text-hidden';
		target.className = target.className.replace(' done','').trim() + ' text-hidden';
		console.log ('after1 target.className', target.className);	
		console.log ('after1 clickedCard.className', clickedCard);}

function timeoutcards(clickedCard) {
	setTimeout (function() {
		clickedCard.className = clickedCard.className.replace(' done','').trim() + ' text-hidden';},500)
}

function onCardClicked(e) {
	const target=e.currentTarget;
	
	if (preventClick || target===clickedCard || target.className.includes('done')){return;}
	
	
	if (target.className.includes('done')) {console.log ('target.className  return ', target.className); return;}
	
	//auswahlkarte fixieren
	target.className = target.className
	.replace('text-hidden', '')
	.trim();
	target.className += ' done';
	console.log ('target.className', target.className);
	
	if (!clickedCard) {
		clickedCard = target;
		
		//wenn dic[Text] undefined nimm Text sonst dic[Text]
		
		if(dicbib[clickedCard.innerText] == undefined) {clickedCardvergleichswert = clickedCard.innerText;console.log ('1.card, engl. ', clickedCardvergleichswert);} 
		else {clickedCardvergleichswert = dicbib[clickedCard.innerText];console.log ('1.card, deutsch ', clickedCardvergleichswert);}
		}
		
	else if (clickedCard) {
		
		if(dicbib[target.innerText] == undefined) {targetvergleichswert = target.innerText; console.log ('2.card, engl. ', targetvergleichswert);} else {targetvergleichswert = dicbib[target.innerText];console.log ('2.card, deutsch ', targetvergleichswert);}
		
		console.log ('1.card ',targetvergleichswert,' 2.card ',clickedCardvergleichswert)
		
		if (clickedCardvergleichswert === targetvergleichswert){
			console.log ('stimmen überein')	
			clickedCard=null;
			counterrichtig = counterrichtig + 1
			if (counterrichtig >= wortpaaranzahl) 
			{spiel.className = 'vocbox'; spiel.innerHTML =`Gratuliere, du hast alle Paare gefunden <br> <br> <button onclick="window.location.reload();" class="mdl-button mdl-js-button mdl-button--raised">Neues Spiel</button>`}
		}
		else 
		{console.log ('stimmen nicht überein');
		preventClick=true;
		timeoutcards(target);
		timeoutcards(clickedCard);
		preventClick=false;
		clickedCard=null;
		}
		}
		
}



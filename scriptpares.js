//erzeugen der Boxen mit random werten aus dic//
console.log ('here');
let randomkeyword;
let biblio = [];
let dicbib =[];
let allreadyused = [];
let allreadyusedkeywords = [];
let wortpaaranzahl= parseInt(prompt("Please enter how many words you wanna learn", "5"));
let x=wortpaaranzahl+1;
let Picklistcount= (x-1)*2;
let Picklistcountsave = Picklistcount;
let randomIndex;
let wertcounterindex1 = 0;
let wertcounterindex2 = 0;
let gesamtsummesollindex1=0;
let gesamtsummesollindex2=0;
let targettext;
let targetvergleichswert;
let clickedCardvergleichswert;
let clickedCard=null;
let preventClick=false;
var counterrichtig=0;
var useddickeys =[];

function randomIndexerhalten () {
	randomIndex = Math.floor(Math.random() * (Picklistcount/2));
	
}

function randomkeywordfunc() {
	let randomnumber = Math.floor(Math.random() *dic.length);
	  useddickeys.push(randomnumber);
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
	let keywordanswer =randomkeydic[1];
	biblio[x] = randomkeyword;
	biblio[y] = keywordanswer;
	
dicbib[randomkeyword] = keywordanswer;}

//building fields
function indexcontrol(i) {
	//wenn Index bereits genutzt oder 0 -> neuer wert und neue überprüfung
	if(allreadyused.includes(randomIndex) || randomIndex==0) {randomIndexerhalten ();indexcontrol(i);}
	//wenn index unbenutzt -> weiter und Index als benutzt Kennzeichnen
	else {allreadyused[i] = randomIndex;}
}

function indexcontrol2(i) {
	//wenn Index bereits genutzt oder 0 -> neuer wert und neue überprüfung
	if(allreadyused.includes(randomIndex) || randomIndex <= wortpaaranzahl) {randomIndexerhalten ();randomIndex = randomIndex + wortpaaranzahl;indexcontrol2(i);}
	//wenn index unbenutzt -> weiter und Index als benutzt Kennzeichnen
	else {allreadyused[i] = randomIndex;}
}

function buildgame() {
	for (let i = 1; i <= (Picklistcount/2)-1; i++) {
	randomIndexerhalten ();
	indexcontrol(i);
	console.log ('Index ',randomIndex,' i1 ',i);
	let word = biblio[randomIndex];
	wertcounterindex1 = wertcounterindex1 + randomIndex;
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	
	randomIndexerhalten ();
	randomIndex = randomIndex+wortpaaranzahl;
	let izwei = i+wortpaaranzahl;
	indexcontrol2(izwei);
	console.log ('Index ',randomIndex,' i2 ',izwei);
	word = biblio[randomIndex];
	console.log (word);
	wertcounterindex2 = wertcounterindex2 + randomIndex;
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	}
	//Restbetrag ermitteln
	for(let a=1; a <= Picklistcountsave/2; a++) {
	gesamtsummesollindex1 = a + gesamtsummesollindex1;
	}
	
	for(let a=1; a <= Picklistcountsave; a++) {
		gesamtsummesollindex2 = a + gesamtsummesollindex2;
	}
	gesamtsummesollindex2 = gesamtsummesollindex2 - gesamtsummesollindex1;
	console.log ('ges1', gesamtsummesollindex1);	
	console.log ('ges2', gesamtsummesollindex2);
	
	const restbetrag1 = gesamtsummesollindex1 - wertcounterindex1;
	const restbetrag2 = gesamtsummesollindex2 - wertcounterindex2;
	console.log ('restbetrag1', restbetrag1);	
	console.log ('restbetrag2', restbetrag2);	
	// wort des Restbetrags
	let word = biblio[restbetrag1];
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	 word = biblio[restbetrag2];
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
		clickedCard.className = clickedCard.className.replace(' done','').trim() + ' text-hidden';
}

function searchwordandinitiate () {
	for (key in useddickeys) {
				var saveddickey = useddickeys[key];
				line = dic[saveddickey]; 
				if (line[1] == clickedCardvergleichswert) {
				var wordtospeak = line[1];
				speak (wordtospeak);
				//initiate
				learninitial(line);
				return;}
			}
	
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
			console.log ('stimmen überein');
			searchwordandinitiate ();
			
			target.setAttribute("id","richtig");
			clickedCard.setAttribute("id","richtig");
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



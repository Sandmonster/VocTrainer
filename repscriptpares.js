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
let wertcounterindex1 = 0;
let wertcounterindex2 = 0;
let gesamtsummesollindex1=0;
let gesamtsummesollindex2=0;
let targettext;
let targetvergleichswert;
let clickedCardvergleichswert;
let clickedCard=null;
let preventClick=false;
var useddickeys =[];
var dickkeyvar;
var counterrichtig =0;

function randomIndexerhalten () {
	randomIndex = Math.floor(Math.random() * (Picklistcount/2));	
}

function randomkeywordfuncrep() {
	let randomnumber = Math.floor(Math.random() *dicrep.length);
     dickkeyvar = dicrep[(randomnumber)];
	  useddickeys.push(dickkeyvar);
	 randomkeydic = dic[dickkeyvar];
	 randomkeyword = randomkeydic[0];
}

function indexcontrolkey(x) {
	//wenn Index bereits genutzt oder 0 -> neuer wert und neue überprüfung
	if(allreadyusedkeywords.includes(randomkeyword)) {randomkeywordfuncrep ();indexcontrolkey(x);}
	//wenn index unbenutzt -> weiter und Index als benutzt Kennzeichnen
	else {allreadyusedkeywords[x] = randomkeyword;}
}

	if (wortpaaranzahl > dicrep.length){
	}
	
	else{
	for(x >= 1; x = x-1;) {
	randomkeywordfuncrep ();
	indexcontrolkey(x)
	let y = x + wortpaaranzahl;
	let keywordanswer =randomkeydic[1];
	biblio[x] = randomkeyword;
	biblio[y] = keywordanswer;
	dicbib[randomkeyword] = keywordanswer;
	}	
}

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
	if (wortpaaranzahl > dicrep.length){
	spiel.className = 'vocbox';
	spiel.innerHTML = `Toll! So viel Wörter hast du gar nicht mehr zu Wiederholen...`;}
	else if (wortpaaranzahl < 2){
	spiel.className = 'vocbox';
	spiel.innerHTML = `Das wäre doch keine Herrausforderung...oder?`;
	}
	else
	{
	for (let i = 1; i <= (Picklistcount/2)-1; i++) {
	randomIndexerhalten ();
	indexcontrol(i);
	let word = biblio[randomIndex];
	wertcounterindex1 = wertcounterindex1 + randomIndex;
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	
	randomIndexerhalten ();
	randomIndex = randomIndex+wortpaaranzahl;
	let izwei = i+wortpaaranzahl;
	indexcontrol2(izwei);
	word = biblio[randomIndex];
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
	
	const restbetrag1 = gesamtsummesollindex1 - wertcounterindex1;
	const restbetrag2 = gesamtsummesollindex2 - wertcounterindex2;
	// wort des Restbetrags
	let word = biblio[restbetrag1];
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	 word = biblio[restbetrag2];
	spiel.innerHTML += `<div class="card text-hidden" onclick="onCardClicked(event)"><p>${word}</p></div>`;
	}
console.log('useddickeys',useddickeys);}


// Gamelogic

function resetcards(target,clickedCard){
			clickedCard.className = clickedCard.className.replace(' done','').trim() + ' text-hidden';
		target.className = target.className.replace(' done','').trim() + ' text-hidden';
}

function timeoutcards(clickedCard) {
		clickedCard.className = clickedCard.className.replace(' done','').trim() + ' text-hidden';
}

function searchwordandstepup(){
	for (key in useddickeys) {
				var saveddickey = useddickeys[key];
				line = dic[saveddickey]; 
				if (line[1] == clickedCardvergleichswert) {
				//stepup
				line[7] = line[7]+1;
				timesetbox (line);
				;return}
			}
}

function searchwordandstepdown(word){
	for (key in useddickeys) {
				var saveddickey = useddickeys[key];
				line = dic[saveddickey];
				if (line[1] == word) {
				//stepdown
				if (line[7] == undefined || line[7] == null) {}
				else if (line[7] == 0) {}
				else {
				line[7]= line[7]-1;
				timesetbox(line);
				}
				;return}
			}
}

function onCardClicked(e) {
	const target=e.currentTarget;
	
	if (preventClick || target===clickedCard || target.className.includes('done')){return;}
	if (target.className.includes('done')) {return;}
	
	//auswahlkarte fixieren
	target.className = target.className
	.replace('text-hidden', '')
	.trim();
	target.className += ' done';
	
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
			
			// suche in dic nach wort + stepup
			searchwordandstepup();
			
			target.setAttribute("id","richtig");
			clickedCard.setAttribute("id","richtig");
			clickedCard=null;
			var wordtospeak = randomkeydic[1];
			speak (wordtospeak);
			counterrichtig = counterrichtig + 1
			if (counterrichtig >= wortpaaranzahl) 
			{spiel.className = 'vocbox'; spiel.innerHTML =`Gratuliere, du hast alle Paare gefunden <br> <br> <button onclick="window.location.reload();" class="mdl-button mdl-js-button mdl-button--raised">Neues Spiel</button>`}
		}
		else 
		{console.log ('stimmen nicht überein');
	
		//suche in dic nach beiden wörtern + stepdown
		searchwordandstepdown(clickedCardvergleichswert);
		searchwordandstepdown(targetvergleichswert);
		preventClick=true;
		timeoutcards(target);
		timeoutcards(clickedCard);
		preventClick=false;
		clickedCard=null;
		}
		}
		
}



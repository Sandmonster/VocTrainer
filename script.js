let dic = JSON.parse(localStorage.getItem('dic')) ||[];
let dicrep=[];
dicfreerep =[];
let ranword;
let randomkeydic;
let irregularforms;
let switchirregularvar = document.getElementById("switchirregular");
let markdic = [];
let verbbib=[];
let randomverb;

dic.sort(sortMultialphabet);

function sortMultialphabet ( a, b ) {
	a= a[0].toLowerCase();
	b = b[0].toLowerCase();
    if (a === b) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
console.log (dic);

//erstellen dicrep (zu wiederholende Wörter laut Boxsystem)
for (key in dic) {
	let dickey = dic[key];
	let currentdate = new Date();
	if (dickey[9] !==undefined) {
	let savedate = new Date(dickey[9]);
		if (savedate <= currentdate) {
		dicrep.push (key);
		
		}
	}
}
console.log(dicrep);

// erstellen verbbib (Array mit allen Verben - für Grammartrainer)
for (key in dic) {
	let dickey = dic[key];
	if (dickey[2]==2) {
		verbbib.push(dickey);
	}
}
console.log(verbbib);

//erstellen dicfreerep (alle im Lernprozess befindlichen Wörter)
for (key in dic) {
	let dickey = dic[key];
	if (dickey[7] ==undefined | dickey[7] >=11) {
		}
		else {dicfreerep.push (key);}
	}
console.log(dicfreerep);


function speak(wordtospeak) {
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[15]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 0.9; // 0.1 to 10
	msg.pitch = 0; //0 to 2
	msg.text = wordtospeak;
    msg.lang="	ko";
	msg.onend = function (e) {
		
	};
	speechSynthesis.speak(msg);
}

function reloadwiderholung() {
	dicrep=[];
	for (key in dic) {
	let dickey = dic[key];
	let currentdate = new Date();
	if (dickey[9] !==undefined) {
	let savedate = new Date(dickey[9]);
		if (savedate <= currentdate) {
		dicrep.push (key);
		}
	}
}
}

function learninitial (w) {
	if (w[7] == undefined){w[7] = 0; w[8]= Date();w[9]= Date()} 
	localStorage.setItem('dic', JSON.stringify(dic));
}

function counterwiederholung () {
	let widerholungscounteranzeige = document.getElementById("wiederholung11");
	let widerholungscounter = dicrep.length;
	widerholungscounteranzeige.innerText = `Wiederholung | ${widerholungscounter}`;
}

function notnoungeneral() {
  // Get the output text
  var ausgabe = document.getElementById("switchirregular");

  // If the checkbox is checked, display the output text
  if (randomkeydic[2] <= 1){ausgabe.style.display = "none";} 
  else {
    ausgabe.style.display = "block";
  }
}

function irregulartrue() {
  // Get the checkbox
  var checkBox = document.getElementById("switch-2");
  // Get the output text
  var ausgabe = document.getElementById("irreg");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    ausgabe.style.display = "block";
  } 
  else {
    ausgabe.style.display = "none";
  }
}

function addVocabulary(){
	var wordformcheck = document.getElementById("wordform");
	var irregular = document.getElementById("switch-2");
	dic.push ([ausgangssprache.value, fremdsprache.value, wordformcheck.value, irregular.checked, present.value, past.value, future.value]);
	
	ausgangssprache.value = "";
	fremdsprache.value = "";
	wordformcheck.value = 0;
	present.value = "";
	past.value = "";
	future.value = "";
	irregular.checked = false;
	notnoun();
	irregulartrue();
	
	
	localStorage.setItem('dic', JSON.stringify(dic));
}

function showmore(showmorestylekey) {
	
let showmorestyle ='showmorestyle1'+showmorestylekey;
let showmorestylekeyelements = document.getElementById(showmorestyle);

if (showmorestylekeyelements.className.includes('hidden')===true){
	showmorestylekeyelements.className = showmorestylekeyelements.className.replace('hidden','');
	
	showmorestyle ='showmorestyle2'+showmorestylekey;
 showmorestylekeyelements = document.getElementById(showmorestyle);
	showmorestylekeyelements.className = showmorestylekeyelements.className.replace('hidden','');
	
	showmorestyle ='showmorestyle3'+showmorestylekey;
 showmorestylekeyelements = document.getElementById(showmorestyle);
	showmorestylekeyelements.className = showmorestylekeyelements.className.replace('hidden','');
}
else {showmorestylekeyelements.className = showmorestylekeyelements.className.replace('','hidden');
	
	showmorestyle ='showmorestyle2'+showmorestylekey;
 showmorestylekeyelements = document.getElementById(showmorestyle);
	showmorestylekeyelements.className = showmorestylekeyelements.className.replace('','hidden');
	
	showmorestyle ='showmorestyle3'+showmorestylekey;
 showmorestylekeyelements = document.getElementById(showmorestyle);
	showmorestylekeyelements.className = showmorestylekeyelements.className.replace('','hidden')}
}

function showmorebuttonfunc (dickey, showmorebuttonx) {
	let showmorebuttonitem =  document.getElementById(showmorebuttonx);
	if (dickey[3]!==true) {showmorebuttonitem.className = showmorebuttonitem.className.replace('showmorebutton', '').trim();
	}
}

function render (key) {
	dickey = dic[key];
		//if Noun
		if(dickey[2] == 1) {
					vocabularyList.innerHTML += `
		<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
		<div class="mutter voclist voctext">${dickey[0]}</div>
		<div class="fremd voclist voctext">${dickey[1]}</div>
		<div class="voclist">
			<button id="showmorebutton${key}" class="voclist vocbutton" onclick="" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
			N
			</button>
			</div>`;

		}
		//if Adjektive
		else if(dickey[2] == 3) {
			
			//irregular
			if (dickey[3] ==true) {
					vocabularyList.innerHTML += `
			<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
			<div class="mutter voclist voctext">${dickey[0]}</div>
			<div class="fremd voclist voctext">${dickey[1]}</div>
			<div class="voclist">
				<button id="showmorebutton${key}" class="showmorebutton voclist vocbutton" onclick="showmore(${key})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
				A
				</button>
			<br>
			<div id="showmorestyle1${key}" class="hidden voclist voctext">present: ${dickey[4]}</div>
			<div id="showmorestyle2${key}" class="hidden voclist voctext">past: ${dickey[5]}</div>
			<div id="showmorestyle3${key}" class="hidden voclist voctext">future: ${dickey[6]}</div>
				</div>`;
				showmorebutton = `showmorebutton${key}`;
			showmorebuttonfunc(dickey, showmorebutton);}
			//regular
			else{
				vocabularyList.innerHTML += `
				<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
				<div class="mutter voclist voctext">${dickey[0]}</div>
				<div class="fremd voclist voctext">${dickey[1]}</div>
				<div class="voclist">
				<button id="showmorebutton${key}" class="voclist vocbutton" onclick="showmore(${key})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
				A
				</button>
				</div>`;
			}
		}
		//if Verb
		else if(dickey[2] == 2) {
		
		//irregular
		if (dickey[3] ==true) {
		vocabularyList.innerHTML += `
		<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
		<div class="mutter voclist voctext">${dickey[0]}</div>
		<div class="fremd voclist voctext">${dickey[1]}</div>
		<div class="voclist">
			<button id="showmorebutton${key}" class="showmorebutton voclist vocbutton" onclick="showmore(${key})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
			V
			</button>
		<br>
		<div id="showmorestyle1${key}" class="hidden voclist voctext">present: ${dickey[4]}</div>
		<div id="showmorestyle2${key}" class="hidden voclist voctext">past: ${dickey[5]}</div>
		<div id="showmorestyle3${key}" class="hidden voclist voctext">future: ${dickey[6]}</div>
				</div>`;
		showmorebutton = `showmorebutton${key}`;
		showmorebuttonfunc(dickey, showmorebutton);
		}
		//regular
		else {
		vocabularyList.innerHTML += `
		<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
		<div class="mutter voclist voctext">${dickey[0]}</div>
		<div class="fremd voclist voctext">${dickey[1]}</div>
		<div class="voclist">
			<button id="showmorebutton${key}" class="voclist vocbutton" onclick="showmore(${key})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
			V
			</button>
			</div>`;
		}
		
			}
		//otherwise	
		else {
					vocabularyList.innerHTML += `
		<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
		<div class="mutter voclist voctext">${dickey[0]}</div>
		<div class="fremd voclist voctext">${dickey[1]}</div>
		<div class="voclist">
			<button id="showmorebutton${key}" class="showmorebutton voclist vocbutton" onclick="showmore(${key})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
			?
			</button>
		<br>
		<div id="showmorestyle1${key}" class="hidden voclist voctext">present: ${dickey[4]}</div>
		<div id="showmorestyle2${key}" class="hidden voclist voctext">past: ${dickey[5]}</div>
		<div id="showmorestyle3${key}" class="hidden voclist voctext">future: ${dickey[6]}</div>
				</div>`;
				showmorebutton = `showmorebutton${key}`;
				showmorebuttonfunc(dickey, showmorebutton);

		}
	
}

function renderbiblio () {
	for (let key in dic) {
		render(key);
		}
}

function chartstufenrender() {
	
	var counternewwords = stufencounter(undefined);
	newwords.innerHTML= `noch nicht angesehene Wörter: ` + counternewwords;
	
	var counterlearnedwords = stufencounter(11);
	learnedwords.innerHTML= `gelernte Wörter: ` + counterlearnedwords + `<p class="erklaerungstext">(werden alle 3-4 Monate wiederholt)</p>`;
	
	var wordsinprocess = dic.length;
	wordsinprocess = wordsinprocess-counternewwords-counterlearnedwords;
	
	var counter = stufencounter(1);
	var prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	console.log(counter, prozentsatz);
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--red);">
		<rect /> <text class="charttext" x="2%" y="10%">`+counter+`</text><text class="charttext" x="2%" y="20%">`+prozentsatz+`%</text><text x="2%" y="30%">1min</text>
	</g>`
	counter = stufencounter(2);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--red);">
		<rect /><text class="charttext" x="12%" y="10%">`+counter+`</text><text class="charttext" x="12%" y="20%">`+prozentsatz+`%</text><text x="12%" y="30%">2h</text>
	</g>`
	counter = stufencounter(3);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--orange);">
		<rect /><text class="charttext" x="22%" y="10%">`+counter+`</text><text class="charttext" x="22%" y="20%">`+prozentsatz+`%</text><text x="22%" y="30%">2d</text>
	</g>`
	counter = stufencounter(4);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--orange);">
		<rect /><text class="charttext" x="32%" y="10%">`+counter+`</text><text class="charttext" x="32%" y="20%">`+prozentsatz+`%</text><text x="32%" y="30%">3d</text>
	</g>`
	counter = stufencounter(5);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--yellow);">
		<rect /><text class="charttext" x="42%" y="10%">`+counter+`</text><text class="charttext" x="42%" y="20%">`+prozentsatz+`%</text><text x="42%" y="30%">5d</text>
	</g>`
	counter = stufencounter(6);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--yellow);">
		<rect /><text class="charttext" x="52%" y="10%">`+counter+`</text><text class="charttext" x="52%" y="20%">`+prozentsatz+`%</text><text x="52%" y="30%">8d</text>
	</g>`
	counter = stufencounter(7);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--blue);">
		<rect /><text class="charttext" x="62%" y="10%">`+counter+`</text><text class="charttext" x="62%" y="20%">`+prozentsatz+`%</text><text x="62%" y="30%">2w</text>
	</g>`
	counter = stufencounter(8);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--blue);">
		<rect /><text class="charttext" x="72%" y="10%">`+counter+`</text><text class="charttext" x="72%" y="20%">`+prozentsatz+`%</text><text x="72%" y="30%">3w</text>
	</g>`
	counter = stufencounter(9);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--green);">
		<rect /><text class="charttext" x="82%" y="10%">`+counter+`</text><text class="charttext" x="82%" y="20%">`+prozentsatz+`%</text><text x="82%" y="30%">4w</text>
	</g>`
	counter = stufencounter(10);
	prozentsatz = 100/wordsinprocess*counter;
	prozentsatz=(Math.round(prozentsatz));
	chartstufen.innerHTML +=`<g class="bar" tabindex="0" style="--value:`+prozentsatz+` ; --color: var(--green);">
		<rect /><text class="charttext" x="92%" y="10%">`+counter+`</text><text class="charttext" x="92%" y="20%">`+prozentsatz+`%</text><text x="92%" y="30%">6w</text>
	</g>`
	
	}

function stufencounter (stufe) {
	counter = 0;
	for (let key in dic){
		dickey = dic[key];
		if (dickey[7] == stufe) {
			counter=counter+1;
		}
		
	}
	return counter;
}

function renderstufe(stufe){
	vocabularyList.innerHTML='';
	for (let key in dic){
		var dickey = dic[key];
		if (dickey[7] == stufe) {
			render(key);
		}
		
	}
}

function nextVoc(){
	//irregularformformatierung zurücksetzten
	irregularforms = document.getElementById("irregularforms")
	if (irregularforms!==null || undefined) {
	irregularforms.innerHTML = '';
	word2.style.color ='black'
	}
		
	//neues wort aussuchen
		let randomnumber = Math.floor(Math.random() *dic.length);
		 randomkeydic = dic[(randomnumber)];	
		 ranword = randomkeydic[0];
		 switchirregularvar = document.getElementById("switchirregular");
		if (switchirregularvar!==null) {
			notnoungeneral(); 
			 irregulartrue()
		}
		 let wordformx;
		 if (randomkeydic[2]==1){wordformx = 'Noun'}
		 if (randomkeydic[2]==2){wordformx = 'Verb'}
		 if (randomkeydic[2]==3){wordformx = 'Adjektiv'}
		word.innerHTML = `${ranword} (${wordformx})`;
}

function nextVocfreerep(){
	//irregularformformatierung zurücksetzten
	irregularforms = document.getElementById("irregularforms")
	if (irregularforms!==null || undefined) {
	irregularforms.innerHTML = '';
	word2.style.color ='black'
	}
		
	//neues wort aussuchen
		let randomnumber = Math.floor(Math.random() *dicfreerep.length);
		 randomkeydic = dicfreerep[(randomnumber)];	
	 randomkeydic = dic[randomkeydic];	
		 ranword = randomkeydic[0];
		 switchirregularvar = document.getElementById("switchirregular");
		if (switchirregularvar!==null) {
			notnoungeneral(); 
			 irregulartrue()
		}
		 let wordformx;
		 if (randomkeydic[2]==1){wordformx = 'Noun'}
		 if (randomkeydic[2]==2){wordformx = 'Verb'}
		 if (randomkeydic[2]==3){wordformx = 'Adjektiv'}
		word.innerHTML = `${ranword} (${wordformx})`;
}

	
function compare(){

if (randomkeydic[2]=='1') {	
	//Noun
	if (fremdsprache.value == randomkeydic[1]) {
		word.innerHTML = "Richtig!"; learninitial(randomkeydic);}
	else {word.innerHTML = `Falsch, es wäre: <br><br>`+ randomkeydic[1]+` <br>`; learninitial(randomkeydic);}
	}
	//Adjectives/Verbs
else {
	var irregular = document.getElementById("switch-2");
	let present = document.getElementById("present");
	let past = document.getElementById("past");
	let future = document.getElementById("future");
		
	if (randomkeydic[3]===false) {
		if (fremdsprache.value == randomkeydic[1] && irregular.checked===randomkeydic[3]) {
		word.innerHTML = "Richtig!";  learninitial(randomkeydic)}
		else {
			word.innerHTML = `Falsch, es wäre: <br><br>`+ randomkeydic[1]+` <br><br> regular`; learninitial(randomkeydic);
		}}
	else{
		if (fremdsprache.value == randomkeydic[1] && irregular.checked===randomkeydic[3] && present.value===randomkeydic[4] && past.value===randomkeydic[5] && future.value===randomkeydic[6]) {
		word.innerHTML = "Richtig!";  learninitial(randomkeydic)}
		else {word.innerHTML = `Falsch, es wäre: <br><br>`+ randomkeydic[1]+` <br><br>irregular <br>`+ ' | present '+ randomkeydic[4] + ' | past '+ randomkeydic[5] + ' | future '+randomkeydic[6]; learninitial(randomkeydic)}
		}
	}
}

function next() {
	fremdsprache.value ="";
	nextVoc();
}

function nextrep() {
	fremdsprache.value ="";
	nextVocrep();
}

function nextVocrep(){ 
	//irregularformformatierung zurücksetzten
	irregularforms = document.getElementById("irregularforms")
	if (irregularforms!==null || undefined) {
	irregularforms.innerHTML = '';
	word2.style.color ='black'
	}
	
	 // richtig und falsch Button ausblenden
		let richtigbutton = document.getElementById("richtigbutton")
	if (richtigbutton.className.includes('hidden')===false){
		console.log('not includes hidden');
	richtigbutton.className = "mdl-button mdl-js-button mdl-button--raised hidden";
	console.log(richtigbutton);}
	if (falschbutton.className.includes('hidden')===false){
		console.log('not includes hidden');
	falschbutton.className = "mdl-button mdl-js-button mdl-button--raised hidden";}
	if (controlbutton.className.includes('hidden')===true){
	controlbutton.className = controlbutton.className.replace(' hidden',' ');}
	if (nextbutton1.className.includes('hidden')===true){
	nextbutton1.className = nextbutton1.className.replace(' hidden',' ');}
		
	//neues wort aussuchen
		if (dicrep.length<1) {
		repform.className = 'hidden';
		word.innerHTML = `Toll, du hast bereits alles wiederholt! Es ist vielleicht an der Zeit deinen Wortschatz zu erweitern...`}
		else {
	let randomnumber = Math.floor(Math.random() *dicrep.length);
     randomkeydic = dicrep[(randomnumber)];	
	 randomkeydic = dic[randomkeydic];
	 ranword = randomkeydic[0];
	 switchirregularvar = document.getElementById("switchirregular");
	if (switchirregularvar!==null) {
		notnoungeneral(); 
		 irregulartrue()
	}
	 let wordformx;
	 if (randomkeydic[2]==1){wordformx = 'Noun'}
	 if (randomkeydic[2]==2){wordformx = 'Verb'}
	 if (randomkeydic[2]==3){wordformx = 'Adjektiv'}
    word.innerHTML = `${ranword} (${wordformx})`;
	reloadwiderholung();
	}
}	
	
function comparerep(){
	
if (randomkeydic[2]==='1') {	
	//Noun
	if (fremdsprache.value == randomkeydic[1]) {
		word.innerHTML = "Richtig!"; stepup()}
	else {word.innerHTML = 'Falsch, es wäre: '+ randomkeydic[1]; stepdown()}
	}
	//Adjectives/Verbs
else {
	var irregular = document.getElementById("switch-2");
	let present = document.getElementById("present");
	let past = document.getElementById("past");
	let future = document.getElementById("future");
		
	if (randomkeydic[3]===false) {
		if (fremdsprache.value == randomkeydic[1] && irregular.checked===randomkeydic[3]) {
		word.innerHTML = "Richtig!";  stepup()}
		else {word.innerHTML = 'Falsch, es wäre: '+ randomkeydic[1] + ' | regular'
		}}
	else{
		if (fremdsprache.value == randomkeydic[1] && irregular.checked===randomkeydic[3] && present.value===randomkeydic[4] && past.value===randomkeydic[5] && future.value===randomkeydic[6]) {
		word.innerHTML = "Richtig!";  stepup()}
		else {word.innerHTML = 'Falsch, es wäre: '+ randomkeydic[1]+' | irregular'+ ' | present '+ randomkeydic[4] + ' | past '+ randomkeydic[5] + ' | future '+randomkeydic[6]}
		}
	}
}

function nextrep() {
	fremdsprache.value ="";
	nextVocrep();
}

function nextfreerep() {
	fremdsprache.value ="";
	nextVocfreerep();
}

function answer() {
	nextVoc(),
	word2.innerHTML = randomkeydic[1] 
	
	if(randomkeydic[4] !='' && randomkeydic[4]!= null) {word2.style.color ='red'; irregularforms.innerHTML += `<p>Present: ${randomkeydic[4]}</p>`};
	if(randomkeydic[5] !='' && randomkeydic[5]!= null) {irregularforms.innerHTML += `<p>Past: ${randomkeydic[5]}</p>`};
	if(randomkeydic[6] !='' && randomkeydic[6]!= null) {irregularforms.innerHTML += `<p>Future: ${randomkeydic[6]}</p>`};
	var wordtospeak = randomkeydic[1];
	speak (wordtospeak);
	learninitial (randomkeydic);
}

function answerfreerep() {
	nextVocfreerep(),
	word2.innerHTML = randomkeydic[1] 
	
	if(randomkeydic[4] !='' && randomkeydic[4]!= null) {word2.style.color ='red'; irregularforms.innerHTML += `<p>Present: ${randomkeydic[4]}</p>`};
	if(randomkeydic[5] !='' && randomkeydic[5]!= null) {irregularforms.innerHTML += `<p>Past: ${randomkeydic[5]}</p>`};
	if(randomkeydic[6] !='' && randomkeydic[6]!= null) {irregularforms.innerHTML += `<p>Future: ${randomkeydic[6]}</p>`};
	var wordtospeak = randomkeydic[1];
	speak (wordtospeak);
}

function answerrep() {
	nextVocrep(),
	word2.innerHTML = randomkeydic[1] 
	
	if(randomkeydic[4] !='' && randomkeydic[4]!= null) {word2.style.color ='red'; irregularforms.innerHTML += `<p>Present: ${randomkeydic[4]}</p>`};
	if(randomkeydic[5] !='' && randomkeydic[5]!= null) {irregularforms.innerHTML += `<p>Past: ${randomkeydic[5]}</p>`};
	if(randomkeydic[6] !='' && randomkeydic[6]!= null) {irregularforms.innerHTML += `<p>Future: ${randomkeydic[6]}</p>`};
	learninitial (randomkeydic);
	
	console.log(richtigbutton.innerHTML);
	if (richtigbutton.className.includes('hidden')===true){
	richtigbutton.className = richtigbutton.className.replace(' hidden',' ');}
	if (falschbutton.className.includes('hidden')===true){
	falschbutton.className = falschbutton.className.replace(' hidden',' ');}
	}

function remember() {
	word2.innerHTML = randomkeydic[1] 
	if (word2.style.color !=='red') {
	if(randomkeydic[4] !='' && randomkeydic[4]!= null) {word2.style.color ='red'; irregularforms.innerHTML += `<p>Present: ${randomkeydic[4]}</p>`};
	if(randomkeydic[5] !='' && randomkeydic[5]!= null) {irregularforms.innerHTML += `<p>Past: ${randomkeydic[5]}</p>`};
	if(randomkeydic[6] !='' && randomkeydic[6]!= null) {irregularforms.innerHTML += `<p>Future: ${randomkeydic[6]}</p>`};}
	var wordtospeak = randomkeydic[1];
	speak (wordtospeak);
	learninitial(randomkeydic);
}

function nextRemember() {
	word2.innerHTML =' ';
	nextVoc();
}

function nextRememberfreerep() {
	word2.innerHTML =' ';
	nextVocfreerep();
}

function rememberrep() {
	word2.innerHTML = randomkeydic[1];
	if (word2.style.color !=='red') {
	if(randomkeydic[4] !='' && randomkeydic[4]!= null) {word2.style.color ='red'; irregularforms.innerHTML += `<p>Present: ${randomkeydic[4]}</p>`};
	if(randomkeydic[5] !='' && randomkeydic[5]!= null) {irregularforms.innerHTML += `<p>Past: ${randomkeydic[5]}</p>`};
	if(randomkeydic[6] !='' && randomkeydic[6]!= null) {irregularforms.innerHTML += `<p>Future: ${randomkeydic[6]}</p>`};}
	var wordtospeak = randomkeydic[1];
	speak (wordtospeak);
	let richtigbutton = document.getElementById('richtigbutton');
	
	if (richtigbutton.className.includes(' hidden')===true){
	richtigbutton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';}
	if (falschbutton.className.includes('hidden')===true){
	falschbutton.className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"}
	if (controlbutton.className.includes(' ')===true){
	controlbutton.className = controlbutton.className + " hidden";}
	}

function nextRememberrep() {
	word2.innerHTML =' ';
	nextVocrep();
}

function notnoun() {
  // Get the checkbox
  var auswahl = document.getElementById("wordform");
  // Get the output text
  var ausgabe = document.getElementById("switchirregular");

  // If the checkbox is checked, display the output text
  if (auswahl.value <= 1){ausgabe.style.display = "none";} 
  else {
    ausgabe.style.display = "block";
  }
}

function searchinstring(str, strArray, counter) {
			let strLowerCase = str.toLowerCase();
				let strArrayLowerCase = strArray.toLowerCase();
				if (strArrayLowerCase.includes(strLowerCase)) {
				return counter;
				}
				else {return -1}
}

function searchStringInArray (str, strArray) {
    for (let count=0; count < strArray.length; count++) {
		if (count ==0 || count==1 || count ==4 ||count ==5 || count ==6) {
			if (strArray[count] !== null) {
				if (strArray[count].length > 0) {
				antwort = searchinstring(str, strArray [count], count);
					if (antwort ==-1) {}
					else {return antwort;} 
				}
			}
		}
	}
	return antwort;
}

function search() {
	let input = document.getElementById("searchfield");
	let  filter = input.value;
	
	vocabularyList.innerHTML = '';
	for (let key in dic) {
	dickey = dic[key];
		
	let j = searchStringInArray (filter, dickey);
	if(j >=0) { 
		vocabularyList.innerHTML += `
	<div class="vocboxbib row" onclick= "mark(${key})" id="vocbox${key}">
	<div class="mutter voclist voctext">${dickey[0]}</div>
	<div class="fremd voclist voctext">${dickey[1]}</div>
	<div class="voclist">
		<button id="showmorebutton${key}" class="showmorebutton voclist vocbutton" onclick="showmore(${key})" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
		i
		</button>
	<br>
	<div id="showmorestyle1${key}" class="hidden voclist voctext">present: ${dickey[4]}</div>
	<div id="showmorestyle2${key}" class="hidden voclist voctext">past: ${dickey[5]}</div>
	<div id="showmorestyle3${key}" class="hidden voclist voctext">future: ${dickey[6]}</div>
			</div>`;
			showmorebutton = `showmorebutton${key}`;
			showmorebuttonfunc(dickey, showmorebutton);
		}
	}
}

function deletevoc (vockey) {
	dic[vockey]= dic[dic.length-1];
	dic.pop(dic[dic.length-1]);
	vocabularyList.innerHTML = ``;
	localStorage.setItem('dic', JSON.stringify(dic));
	render();
}

function deletevocwithoutrender (vockey) {
	dic[vockey]= dic[dic.length-1];
	dic.pop(dic[dic.length-1]);
	localStorage.setItem('dic', JSON.stringify(dic));
}

function timesetbox (box){
let currentdate = new Date();
if (box[7] == undefined) {box[7] = 0;}
else if (box[7] == 0) {
	let hours = currentdate.getTime() + (1000 * 60);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 1) {
	let hours = currentdate.getTime() + (1000 * 60 * 120);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 2) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 3) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 2);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 4) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 3);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 5) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 5);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 6) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 8);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 7) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 7* 2);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 8) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 7* 3);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 9) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 7* 4);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] == 10) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 7* 6);
	let newdate = new Date(hours);
	box[9] = newdate;
}
else if (box[7] >= 11) {
	let hours = currentdate.getTime() + (1000 * 60 * 60* 24* 7* 4* 4);
	let newdate = new Date(hours);
	box[9] = newdate;
}
localStorage.setItem('dic', JSON.stringify(dic));
}

function stepup () {
	randomkeydic[7] = randomkeydic[7]+1;
	timesetbox (randomkeydic);
}

function rightbuttonrep() {
	stepup();
	nextRememberrep();
}

function stepdown () {
		if (randomkeydic[7] == undefined || randomkeydic[7] == null) {}
	else if (randomkeydic[7] == 0) {}
	else {
		randomkeydic[7]= randomkeydic[7]-1;
		timesetbox(randomkeydic);
		}
}

function falsebuttonrep() {
	stepdown();
	nextRememberrep();
}

function showrepetitionmenu () {
	let widerholungscounteranzeige = document.getElementById("wiederholung11");
	if (repetitionmenu.className.includes('hidden')===true){
	repetitionmenu.className = repetitionmenu.className.replace('hidden',''); widerholungscounteranzeige.style.backgroundColor='rgba(0,0,0,.5)'; widerholungscounteranzeige.style.color='white'}
	else {repetitionmenu.className = repetitionmenu.className.replace('','hidden');widerholungscounteranzeige.style.backgroundColor='white'; widerholungscounteranzeige.style.color=''}
}

function showfreieslernen () {
	if (freieslernmenu.className.includes('hidden')===true){
	freieslernmenu.className = freieslernmenu.className.replace('hidden',''); freieslernen.style.backgroundColor='rgba(0,0,0,.5)'; freieslernen.style.color='white'}
	else {freieslernmenu.className = freieslernmenu.className.replace('','hidden');freieslernen.style.backgroundColor='white'; freieslernen.style.color=''}
}

function showfreieswiederholen () {
	if (freieswiederholenmenu.className.includes('hidden')===true){
	freieswiederholenmenu.className = freieswiederholenmenu.className.replace('hidden',''); freieswiederholen.style.backgroundColor='rgba(0,0,0,.5)'; freieswiederholen.style.color='white'}
	else {freieswiederholenmenu.className = freieswiederholenmenu.className.replace('','hidden');freieswiederholen.style.backgroundColor='white'; freieswiederholen.style.color=''}
}

function showpresent () {
	if (presentmenu.className.includes('hidden')===true){
	presentmenu.className = presentmenu.className.replace('hidden',''); presentmenu.style.backgroundColor='rgba(0,0,0,.5)'; presentmenu.style.color='white'}
	else {presentmenu.className = presentmenu.className.replace('','hidden');presentmenu.style.backgroundColor='white'; presentmenu.style.color=''}
}

function showpast () {
	if (pastmenu.className.includes('hidden')===true){
	pastmenu.className = pastmenu.className.replace('hidden',''); pastmenu.style.backgroundColor='rgba(0,0,0,.5)'; pastmenu.style.color='white'}
	else {pastmenu.className = pastmenu.className.replace('','hidden');pastmenu.style.backgroundColor='white'; pastmenu.style.color=''}
}

function showfuture () {
	if (futuremenu.className.includes('hidden')===true){
	futuremenu.className = futuremenu.className.replace('hidden',''); futuremenu.style.backgroundColor='rgba(0,0,0,.5)'; futuremenu.style.color='white'}
	else {futuremenu.className = futuremenu.className.replace('','hidden');futuremenu.style.backgroundColor='white'; futuremenu.style.color=''}
}

function mark(markkey) {
	vocbox = 'vocbox'+markkey;
	vocbox = document.getElementById(vocbox);
	let optionmenuband =  document.getElementById('optionmenuband');
	if(vocbox.style.backgroundColor == 'white') {
		vocbox.style.backgroundColor = '';
		//search key and delete
		for (key in markdic) {
			if (markdic[key] == markkey){
				markdic[key]= markdic[markdic.length-1];
				markdic.pop(markdic[markdic.length-1]);
				console.log ('length larkdic',markdic.length)
				if (markdic.length == 0) {optionmenuband.className = optionmenuband.className.replace(' ',' hidden')}
			}
		}
	}
	else {
		vocbox.style.backgroundColor = 'white';
		markdic.push(markkey);
	if (optionmenuband.className.includes('hidden')===true){
	optionmenuband.className = optionmenuband.className.replace('hidden',' ')}
	}
}

function deletemark() {
	for (key in markdic) {
		deletevoc(markdic[key]);
	}
	markdic =[];
	let optionmenuband =  document.getElementById('optionmenuband');
	optionmenuband.className = optionmenuband.className.replace(' ',' hidden')
}

function stepupmark() {
	for (key in markdic) {
		vocbox = 'vocbox'+markdic[key];
		console.log(vocbox);
		vocbox = document.getElementById(vocbox);
		vocbox.style.backgroundColor = '';
		let vocdickey = markdic[key];
		
	if (dic[vocdickey][7] == undefined) {
		learninitial (dic[vocdickey])
	}
	else {
		dic[vocdickey][7]= dic[vocdickey][7]+1;
		}
	timesetbox(vocdickey);
	}
	markdic =[];
	let optionmenuband =  document.getElementById('optionmenuband');
	optionmenuband.className = optionmenuband.className.replace(' ',' hidden')
}

function stepdownmark() {
	for (key in markdic) {
		vocbox = 'vocbox'+markdic[key];
		console.log(vocbox);
		vocbox = document.getElementById(vocbox);
		vocbox.style.backgroundColor = '';
		let vocdickey = markdic[key];
		
	if (dic[vocdickey][7] == undefined || dic[vocdickey][7] == null) {}
	else if (dic[vocdickey][7] == 0) {}
	else {
		dic[vocdickey][7]= dic[vocdickey][7]-1;
		timesetbox(vocdickey);
		}
	
	}
	markdic =[];
	let optionmenuband =  document.getElementById('optionmenuband');
	optionmenuband.className = optionmenuband.className.replace(' ',' hidden')
	localStorage.setItem('dic', JSON.stringify(dic));
	
}

function resetmark() {
	for (key in markdic) {
		vocbox = 'vocbox'+markdic[key];
		console.log(vocbox);
		vocbox = document.getElementById(vocbox);
		vocbox.style.backgroundColor = '';
		let vocdickey = markdic[key];
		delete dic[vocdickey][7]; delete dic[vocdickey][8]; delete dic[vocdickey][9]; 
		localStorage.setItem('dic', JSON.stringify(dic));
	}
	markdic =[];
	let optionmenuband =  document.getElementById('optionmenuband');
	optionmenuband.className = optionmenuband.className.replace(' ',' hidden')
}

function generatebasicverb () {
	let randomnumber = Math.floor(Math.random() *verbbib.length);
     randomkeydic = verbbib[(randomnumber)];	
	 randomverb = randomkeydic[1];
}

function showbasicverb () {
	generatebasicverb()
	verbbasic.innerHTML =`<h2>${randomverb}</h2>`;
}

function compareverbpresent() {
if (randomkeydic[3]==true) {
	if (verbpresent.innerText == randomkeydic[4]) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML +=`Falsch, es wäre: ${randomkeydic[4]}`;}
}	
else {
	let presentform = presentconjunction ();
	if (verbpresent.innerText == presentform) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML += `Falsch, es wäre: ${presentform}`}
	}
}

function presentconjunction () {	
		let verb = randomkeydic[1];
		let verblength = verb.length;
		let verbstam;
		
		//if ends in hada
		if (verb.endsWith('하다')===true) {
				verbstam = verb.slice(0, verblength-2);
				return verbstam + '해';
			}
		
		//if ends in idda
			if (verb.endsWith('잇다')===true) {
			verbstam = verb.slice(0, verblength-2);
			verblength = verbstam.length;
			let lastsylable = verbstam.slice(verblength-1);
			if (Hangul.endsWithConsonant(lastsylable)===true){return verbstam + '이야';}
			else {return verbstam + '야';}
			}
		
		verbstam = verb.slice(0, verblength-1);
		verblength = verbstam.length;
		let lastsylable = verbstam.slice(verblength-1);
		let lastsylableletters = Hangul.disassemble(lastsylable);
		let verbstamexcludelast = verbstam.slice(0,verblength-1);
		
		// if a or o 
		if (Hangul.search(lastsylable,'ㅏ') >= 0 || Hangul.search(lastsylable,'ㅗ') >= 0) {
			console.log('a oder o');
			if (Hangul.endsWith(lastsylable, 'ㅏ') ==true) {return verbstam;}
			else if (Hangul.endsWith(lastsylable, 'ㅗ') ==true) {lastsylableletters.push ('ㅏ'); lastsylableletters = Hangul.assemble(lastsylableletters); return verbstamexcludelast+lastsylableletters}
			else {return verbstamexcludelast+lastsylable+'아'}
		}
		else {
			//if consonant
			if (Hangul.endsWithConsonant(lastsylable) == true){
				return verbstam + '어';
			}
			else {
				//ausnahmen ae, eo und yeo 
				if (Hangul.endsWith(lastsylable, 'ㅐ') == true || Hangul.endsWith(lastsylable, 'ㅓ') == true || Hangul.endsWith(lastsylable, 'ㅕ') == true) {
					return verbstam;
				}
				// ausnahme u
				if (Hangul.endsWith(lastsylable, 'ㅜ') == true) {
					lastsylableletters.push('ㅓ');
					lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast + lastsylableletters;
				}
				//ausnahme i
				if (Hangul.endsWith(lastsylable, 'ㅣ') == true) {
					lastsylableletters [lastsylableletters.length-1] = 'ㅕ';
					lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast + lastsylableletters;
				}
			}
		}
		return 'ERROR';
}

function compareverbpresentyo() {
if (randomkeydic[3]==true) {
	let verbpresentyo = verbpresent.innerText;
	if (verbpresentyo[verbpresentyo.length-1] == '요') {
		verbpresentyo = verbpresentyo.slice(0, verbpresentyo.length-2);
	if (verbpresentyo == randomkeydic[4]) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML +=`Falsch, es wäre: ${randomkeydic[4]}요`;}
	}
}	
else {
	let presentform = presentconjunctionyo ();
	if (verbpresent.innerText == presentform) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML += `Falsch, es wäre: ${presentform}`}
	}
}

function presentconjunctionyo() {
	let verb = randomkeydic[1];
		let verblength = verb.length;
		let verbstam;
		
		//if ends in hada
		if (verb.endsWith('하다')===true) {
				verbstam = verb.slice(0, verblength-2);
				return verbstam + '해요';
			}
		
		//if ends in idda
			if (verb.endsWith('잇다')===true) {
			verbstam = verb.slice(0, verblength-2);
			verblength = verbstam.length;
			let lastsylable = verbstam.slice(verblength-1);
			if (Hangul.endsWithConsonant(lastsylable)===true){return verbstam + '이에요';}
			else {return verbstam + '예요';}
			}
		
		verbstam = verb.slice(0, verblength-1);
		verblength = verbstam.length;
		let lastsylable = verbstam.slice(verblength-1);
		let lastsylableletters = Hangul.disassemble(lastsylable);
		let verbstamexcludelast = verbstam.slice(0,verblength-1);
		
		// if a or o 
		if (Hangul.search(lastsylable,'ㅏ') >= 0 || Hangul.search(lastsylable,'ㅗ') >= 0) {
			console.log('a oder o');
			if (Hangul.endsWith(lastsylable, 'ㅏ') ==true) {return verbstam + '요';}
			else if (Hangul.endsWith(lastsylable, 'ㅗ') ==true) {lastsylableletters.push ('ㅏ'); lastsylableletters = Hangul.assemble(lastsylableletters); return verbstamexcludelast+lastsylableletters + '요'}
			else {return verbstamexcludelast+lastsylable+'아요'}
		}
		else {
			//if consonant
			if (Hangul.endsWithConsonant(lastsylable) == true){
				return verbstam + '어요';
			}
			else {
				//ausnahmen ae, eo und yeo 
				if (Hangul.endsWith(lastsylable, 'ㅐ') == true || Hangul.endsWith(lastsylable, 'ㅓ') == true || Hangul.endsWith(lastsylable, 'ㅕ') == true) {
					return verbstam + '요';
				}
				// ausnahme u
				if (Hangul.endsWith(lastsylable, 'ㅜ') == true) {
					lastsylableletters.push('ㅓ');
					lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast + lastsylableletters + '요';
				}
				//ausnahme i
				if (Hangul.endsWith(lastsylable, 'ㅣ') == true) {
					lastsylableletters [lastsylableletters.length-1] = 'ㅕ';
					lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast + lastsylableletters + '요';
				}
			}
		}
		return 'ERROR';
}

function compareverbpresentprog () {
	if (randomkeydic[3]==true) {
	let verbpresentproginput = verbpresent.innerText;
	let verbpresentprog = randomkeydic[4] + '고 있어'
	
	if (verbpresentprog == verbpresentproginput) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML +=`Falsch, es wäre: ${verbpresentprog}`;}
	}	
else {
	let presentform = presentconjunctionprog ();
	if (verbpresent.innerText == presentform) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML += `Falsch, es wäre: ${presentform}`}
	}
}

function compareverbpresentprogyo () {
	if (randomkeydic[3]==true) {
	let verbpresentproginput = verbpresent.innerText;
	let verbpresentprog = randomkeydic[4] + '고있어요'
	
	if (verbpresentprog == verbpresentproginput) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML +=`Falsch, es wäre: ${verbpresentprog}`;}
	}	
else {
	let presentform = presentconjunctionprog ();
	presentform = presentform +'요';
	if (verbpresent.innerText == presentform) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML += `Falsch, es wäre: ${presentform}`}
	}
}

function presentconjunctionprog () {
	let verb = randomkeydic[1];
		let verblength = verb.length;
		let verbstam = verb.slice(0, verblength-1);
		return verbstam + '고 있어요';
}

function presentconjunctionprogform () {
	let verb = randomkeydic[1];
		let verblength = verb.length;
		let verbstam = verb.slice(0, verblength-1);
		return verbstam + '고 있습니다';
}

function compareverbpast() {
	if (randomkeydic[3]==true) {
	if (verbpresent.innerText == randomkeydic[5]) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML +=`Falsch, es wäre: ${randomkeydic[5]}`;}
}	
else {
	let presentform = pastconjunction ();
	if (verbpresent.innerText == presentform) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML += `Falsch, es wäre: ${presentform}`}
	}
}

function compareverbpastyo() {
	if (randomkeydic[3]==true) {
		let verbcontrol = randomkeydic[5] + '요';
	if (verbpresent.innerText == verbcontrol) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML +=`Falsch, es wäre: ${verbcontrol}`;}
}	
else {
	let presentform = pastconjunction ();
	presentform + '요';
	if (verbpresent.innerText == presentform) {verbbasic.innerHTML =`<h2>Richtig!</h2>`;}
	else {verbbasic.innerHTML += `Falsch, es wäre: ${presentform}`}
	}
}

function pastconjunction () {
		let verb = randomkeydic[1];
		let verblength = verb.length;
		let verbstam;
		
		//if ends in hada
		if (verb.endsWith('하다')===true) {
				verbstam = verb.slice(0, verblength-2);
				return verbstam + '했어';
			}
		
		verbstam = verb.slice(0, verblength-1);
		verblength = verbstam.length;
		let lastsylable = verbstam.slice(verblength-1);
		let lastsylableletters = Hangul.disassemble(lastsylable);
		let verbstamexcludelast = verbstam.slice(0,verblength-1);
		
		// if a or o 
		if (Hangul.search(lastsylable,'ㅏ') >= 0 || Hangul.search(lastsylable,'ㅗ') >= 0) {
			console.log('a oder o');
			if (Hangul.endsWith(lastsylable, 'ㅏ') ==true) {
				lastsylableletters.push('ㅆ');lastsylableletters = Hangul.assemble(lastsylableletters);
				return verbstamexcludelast+lastsylableletters+'어';}
			else if (Hangul.endsWith(lastsylable, 'ㅗ') ==true) {lastsylableletters.push ('ㅏ');lastsylableletters.push ('ㅆ'); lastsylableletters = Hangul.assemble(lastsylableletters); return verbstamexcludelast+lastsylableletters+'어'}
			else {return verbstam+'았어'}
		}
		else {
			//if consonant
			if (Hangul.endsWithConsonant(lastsylable) == true){
				return verbstam + '었어';
			}
			else {
				//ausnahmen ae, eo und yeo 
				if (Hangul.endsWith(lastsylable, 'ㅐ') == true || Hangul.endsWith(lastsylable, 'ㅓ') == true || Hangul.endsWith(lastsylable, 'ㅕ') == true) {
					lastsylableletters.push('ㅆ');lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast+lastsylableletters+'어';
				}
				// ausnahme u
				if (Hangul.endsWith(lastsylable, 'ㅜ') == true) {
					lastsylableletters.push('ㅓ'); lastsylableletters.push('ㅆ');
					lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast + lastsylableletters+'어';
				}
				//ausnahme i
				if (Hangul.endsWith(lastsylable, 'ㅣ') == true) {
					lastsylableletters [lastsylableletters.length-1] = 'ㅕ'; lastsylableletters.push('ㅆ');
					lastsylableletters = Hangul.assemble(lastsylableletters);
					return verbstamexcludelast + lastsylableletters+'어';
				}
			}
		}
		return 'ERROR';
	}




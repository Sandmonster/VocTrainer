
function umformatierung() {
	for (key in dic) {
		if (dic[key][3] == undefined || dic[key][3] == null || dic[key][3] == 'false' || dic[key][3] =='no' || dic[key][3] =='n' || dic[key][3] =='nein'|| dic[key][3] =='' || dic[key][3] ==' ') {dic[key][3] = false;}
		else if (dic[key][3] === 'true' || dic[key][3] ==='yes' || dic[key][3] ==='y' || dic[key][3] ==='ja') {dic[key][3] = true;}
	console.log(dic);
	}
}

function fileread() {
	const input = document.getElementById("uploadfile");
	const file = input.files[0];
	  
    readXlsxFile(file).then((rows) => {
		console.log(rows.length);
		for (i=1; i < rows.length; i++) {
			dic.push (rows[i]);
			console.log ('reihe excel',rows[i]);
		}
		localStorage.setItem('dic', JSON.stringify(dic));
		umformatierung();
		localStorage.setItem('dic', JSON.stringify(dic));
		importanswer.innerHTML = 'Gratuliere, die Datei ist fertig importiert!';
  })
}


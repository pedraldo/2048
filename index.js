function deplacement(nbcase){
	return nbcase * 124;
}

function convertRight(n) {

	switch(n) {

		case 0 : return 3;
		break;

		case 1 : return 2;
		break;

		case 2 : return 1;
		break;

		case 3 : return 0;
		break;

		default: return (-9);

	}

}

function getGameStateInArray(){

	var tab = new Array();
	var td = document.getElementsByTagName("td");
	var j=0,k=0;

	for (var i=0; i<4; i++) tab[i] = new Array();

	for (var i=0;i<td.length;i++) {

		j=i%4;

		if(i<4) k=0;
		else if(i<8) k=1;
		else if(i<12) k=2;
		else k=3;

		if (td[i].hasChildNodes()) tab[k][j] = parseInt(td[i].firstChild.innerHTML);
		else tab[k][j] = -1;

	}

	return tab;

}

function calculateNewState(before_array,direction) {

	var after_array = before_array;
	var nb_carre_ligne = 0;
	var tabCalcul = new Array(-1,-1,-1,-1);
	var allQuarterDataTable = new Array(4,2);
	var allDataTable = new Array();

	switch(direction){
		case "gauche":

			for (var j=0;j<4;j++){

				for (var i=0; i<4; i++){

					tabCalcul[i]=before_array[i][j];

				}

				allQuarterDataTable = calculQuarterNewState(tabCalcul);
				allDataTable[j] = allQuarterDataTable;

			}

		break;


		case "haut":

			for (var j=0;j<4;j++){

				for (var i=0; i<4; i++){

					tabCalcul[i]=before_array[j][i];

				}

				allQuarterDataTable = calculQuarterNewState(tabCalcul);
				allDataTable[j] = allQuarterDataTable;

			}

		break;


		case "droite":

			for (var j=0;j<4;j++){

				for (var i=0; i<4; i++){

					tabCalcul[3-i]=before_array[i][j];

				}

				allQuarterDataTable = calculQuarterNewState(tabCalcul);
				allDataTable[j] = allQuarterDataTable;

			}

		break;


		case "bas":

			for (var j=0;j<4;j++){

				for (var i=0; i<4; i++){

					tabCalcul[3-i]=before_array[j][i];

				}

				allQuarterDataTable = calculQuarterNewState(tabCalcul);
				allDataTable[j] = allQuarterDataTable;

			}

		break;
	}

	return allDataTable;

}

function clearTPosFin(tabInit, tPosFin) {

	for (var i=0; i<4; i++) {

		if (tabInit[i] == -1 && tPosFin[i] != -1) {

			for (var j=i+1; j<4; j++) {

				if (tPosFin[j] > 0) tPosFin[j] -= 1;

			}

			tPosFin[i] = -1;

		}

	}

	return tPosFin;

}

function buildAllQuarterDataTable(tabFin, tabPosFin) {

	var allQuarterDataTable = new Array();

	for (var i=0; i<4; i++) allQuarterDataTable[i] = new Array();

	for (var j=0; j<2; j++) {

		for (var i=0; i<4; i++) {

			if (j==0) allQuarterDataTable[i][j] = tabFin[i];
			else if (j==1) allQuarterDataTable[i][j] = tabPosFin[i];

		}

	}

	return allQuarterDataTable;

}

function calculQuarterNewState(tab) {

	var i,j,k;
	var decalage = 0;
	var tPosFin = [0,1,2,3];
	var tabInit = new Array();
	var allQuarterDataTable = new Array();

	for (var i=0; i<4; i++) allQuarterDataTable[i] = new Array();

	for (i=0; i<4; i++) tabInit[i] = tab[i];

	for (i=3; i>=0; i--) {
	
		if (tab[i] != -1) {

			i -= decalage;
			decalage = 0;


			while (i-1-decalage >= 0 && tab[i-1-decalage] == -1) {

				for (k=i-decalage; k <= 3; k++) {

					tab[(k-1)] = tab[k];
					tab[k] = -1;

				}

				decalage++;

			}

			j = i-decalage;
			if (j > 0) {

				if (tab[j] == tab[j-1]) {

					if (j-2 >= 0) {

						if (tab[j] == tab[j-2]) {

							if (j-3 >= 0) {

								if (tab[j] == tab[j-3]) {

									tab = [2*tab[j],2*tab[j],-1,-1];
									tPosFin = [0,0,1,1];
									tPosFin = clearTPosFin(tabInit,tPosFin);
									allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

									return allQuarterDataTable;

								}

								tab = [tab[0],2*tab[j],tab[j],-1];
								tPosFin = [0,1,1,2];
								tPosFin = clearTPosFin(tabInit,tPosFin);
								allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

								return allQuarterDataTable;

							}

							tab = [2*tab[j],tab[j],tab[j+1],-1];
							tPosFin = [0,0,1,2];
							tPosFin = clearTPosFin(tabInit,tPosFin);
							allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

							return allQuarterDataTable;

						}

						if (j-3 >= 0 && tab[j-2] == -1 && tab[j] == tab[j-3]) {

							tab = [2*tab[j],tab[j],-1,-1];
							tPosFin = [0,-1,0,1];
							tPosFin = clearTPosFin(tabInit,tPosFin);
							allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

							return allQuarterDataTable;

						}

						if (j == 2) {

							tab = [tab[0],2*tab[j],tab[j+1],-1];
							tPosFin = [0,1,1,2];

							if (tab[0] == -1) {

								tab = [tab[1],tab[2],tab[3],-1];
								tPosFin = [-1,0,0,1];

							}

							tPosFin = clearTPosFin(tabInit,tPosFin);
							allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

							return allQuarterDataTable;

						}

						else tab = [tab[0],tab[1],2*tab[j],-1];
						tPosFin = [0,1,2,2];
						decalage = 1;

					}

					else {

						tab = [2*tab[j],tab[j+1],tab[j+2],-1];
						tPosFin = [0,0,1,2];
						tPosFin = clearTPosFin(tabInit,tPosFin);
						allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

						return allQuarterDataTable;
						
					}


				}

				else if (tab[j-1] == -1 && j-2 >= 0) {

					if (tab[j-2] == tab[j]) {

						if (j-3 >= 0) {

							if (tab[j-3] == tab[j]) {

								tab = [2*tab[j],tab[j],-1,-1];
								tPosFin = [0,0,-1,1];
								tPosFin = clearTPosFin(tabInit,tPosFin);
								allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

								return allQuarterDataTable;

							}

							tab = [tab[0],2*tab[j],-1,-1];
							tPosFin = [0,1,-1,1];
							tPosFin = clearTPosFin(tabInit,tPosFin);
							allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

							return allQuarterDataTable;

						}

						tab = [2*tab[j],tab[j+1],-1,-1];
						tPosFin = [0,-1,0,1];
						tPosFin = clearTPosFin(tabInit,tPosFin);
						allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

						return allQuarterDataTable;

					}

				}


			}

		}

	}

	tPosFin = clearTPosFin(tabInit,tPosFin);
	allQuarterDataTable = buildAllQuarterDataTable(tab,tPosFin);

	return allQuarterDataTable;


}


function after_animation(elements_table, id_dep_table, id_arr_table, index_carre) {
	
	var i = index_carre;
	var tabInit;
	var tabEmpty = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
	var futureNewSquare;
	var indexOfValue;
	var noMotion = true;
	var superimposed = false;
	var element = document.getElementById(id_dep_table[i]);
	var value = parseInt(element.firstChild.innerHTML);
	element.removeChild(element.firstChild);

	for (var j=0; j<i; j++) {

		if (id_arr_table[j] == id_arr_table[i]) {

			document.getElementById(id_arr_table[j].toString()).firstChild.innerHTML = 2*value;
			superimposed = true;

		}

	}

	if (!superimposed) {

		var new_div = document.createElement("div");
		new_div.className = "carre_1";
		new_div.innerHTML = value;

		document.getElementById(id_arr_table[i]).appendChild(new_div);

	}

	if (id_dep_table.length == id_arr_table.length) {

		for (var iterator=0; iterator<id_dep_table.length; iterator++) {

			if (id_dep_table[iterator] != id_arr_table[iterator]) {
				noMotion = false;
				break;
			}

		}

	}

	if (i == id_dep_table.length-1 && noMotion == false) {

		tabInit = getGameStateInArray();
		
		for (var i=0; i<4; i++) {

			for (var j=0; j<4; j++) {

				if (tabInit[i][j] != -1) {
					indexOfValue = tabEmpty.indexOf(4*i+j);
					tabEmpty.splice(indexOfValue,1);
				}

			}

		}

		futureNewSquare = Math.floor((Math.random() * (tabEmpty.length-1)) + 0);

		var new_div = document.createElement("div");
		new_div.className = "carre_1";
		new_div.innerHTML = "2";

		document.getElementById(tabEmpty[futureNewSquare]+1).appendChild(new_div);

	}

};

var main = function(){

	$(document).keydown(function(event){
		var keyCode = event.which;
		var place_trouve = 0;
		var recherche_finie = false;
		var nb_child = -1;

		var elements_table = new Array();
		var id_dep_table = new Array();
		var id_arr_table = new Array();
		var index_carre = 0;

		var elements = $(".carre_1");
	
		var tabInit = getGameStateInArray();
		console.log(tabInit);

		switch (keyCode){
			/*Gauche*/
			case 37:
				var idDernCase = 4;
				var tabDepQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabInitQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabsString;
				var tabFinAll = new Array();
				var tabPosFinAll = new Array();
				var indexTabsFin = 0;
				var tabEmpty = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
				var futureNewSquare;

				for (var j=0; j<4; j++) {

					for (var i=0; i<4; i++) {

						
						//tableau initiale d'une ligne
						tabInitQuarter[i] = tabInit[j][i]; 

					}
					// calcul tableau initiale d'une ligne et des postions de fin de chaque case
					tabsString = calculQuarterNewState(tabInitQuarter);

					for (var l=0; l<2; l++) {

						for (var k=0; k<4; k++) {

							if (l==0) tabFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);
							else if (l==1) {
								
								tabPosFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);

							}

						}

					}

					indexTabsFin += 4;

				}

				for (var j=0; j<elements.length;j++){
					console.log("Gauche");

					var id_s = $(elements[j]).parent().attr("id");
					var idHTML = parseInt(id_s);
					var idTab = idHTML - 1;


					var posDeb = idTab % 4;
					var posFin = tabPosFinAll[idTab];
					var decalage = Math.abs(posDeb - posFin);


					var id = parseInt(id_s);
					var value = $(elements[j]).html();


					elements_table.push(elements[j]);
					id_dep_table.push(idHTML);
					id_arr_table.push(idHTML-decalage);
					decalage = deplacement(decalage);
					decalage = '-='+decalage+'px';


					(function(j) {
						$(elements[j]).animate({left: decalage},200,function(){
							after_animation(elements_table, id_dep_table, id_arr_table, j);
						});
					})(j);

				}


				// tabInit = getGameStateInArray();
				
				// for (var i=0; i<4; i++) {

				// 	for (var j=0; j<4; j++) {

				// 		if (tabInit[i][j] != -1) tabEmpty.splice(i*4+j,1);

				// 	}

				// }

				// futureNewSquare = Math.floor((Math.random() * tabEmpty.length-1) + 0);

				// var new_div = document.createElement("div");
				// new_div.className = "carre_1";
				// new_div.innerHTML = "2";
				// debugger;

				// document.getElementById(tabEmpty[futureNewSquare]+1).appendChild(new_div);

			break;

			/*Haut*/
			case 38:
				var idDernCase = 4;
				var tabDepQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabInitQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabsString;
				var tabFinAll = new Array();
				var tabPosFinAll = new Array();
				var indexTabsFin = 0;
				var tabEmpty = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
				var futureNewSquare;

				for (var j=0; j<4; j++) {

					for (var i=0; i<4; i++) {
						
						//tableau initiale d'une ligne
						tabInitQuarter[i] = tabInit[i][j]; 

					}
					// calcul tableau initiale d'une ligne et des postions de fin de chaque case
					tabsString = calculQuarterNewState(tabInitQuarter);

					for (var l=0; l<2; l++) {

						for (var k=0; k<4; k++) {

							if (l==0) tabFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);
							else if (l==1) {
								
								tabPosFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);

							}

						}

					}

					indexTabsFin += 4;

				}

				for (var j=0; j<elements.length;j++){
					console.log("Haut");

					var id_s = $(elements[j]).parent().attr("id");
					var idHTML = parseInt(id_s);
					var idTab = idHTML - 1;

					var posDeb = Math.floor(idTab/4);
					var posFin = tabPosFinAll[(idTab*4)%16+posDeb];
					var decalage = Math.abs(posDeb - posFin);


					var id = parseInt(id_s);
					var value = $(elements[j]).html();


					elements_table.push(elements[j]);
					id_dep_table.push(idHTML);
					id_arr_table.push(idHTML-(decalage*4));
					decalage = deplacement(decalage);
					decalage = '-='+decalage+'px';


					(function(j) {
						$(elements[j]).animate({top: decalage},200,function(){
							after_animation(elements_table, id_dep_table, id_arr_table, j);
						});
					})(j);

				}


				// tabInit = getGameStateInArray();
				
				// for (var i=0; i<4; i++) {

				// 	for (var j=0; j<4; j++) {

				// 		if (tabInit[i][j] != -1) tabEmpty.splice(i*4+j,1);

				// 	}

				// }

				// futureNewSquare = Math.floor((Math.random() * tabEmpty.length-1) + 0);

				// var new_div = document.createElement("div");
				// new_div.className = "carre_1";
				// new_div.innerHTML = "2";
				// debugger;

				// document.getElementById(tabEmpty[futureNewSquare]+1).appendChild(new_div);

			break;

			/*Droite*/
			case 39:

				var idDernCase = 4;
				var tabDepQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabInitQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabsString;
				var tabFinAll = new Array();
				var tabPosFinAll = new Array();
				var indexTabsFin = 0;
				var tabEmpty = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
				var futureNewSquare;


				for (var j=0; j<4; j++) {

					for (var i=0; i<4; i++) {
						
						//tableau initiale d'une ligne
						tabInitQuarter[3-i] = tabInit[j][i]; 

					}
					// calcul tableau initiale d'une ligne et des postions de fin de chaque case
					tabsString = calculQuarterNewState(tabInitQuarter);

					for (var l=0; l<2; l++) {

						for (var k=0; k<4; k++) {

							if (l==0) tabFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);
							else if (l==1) {
								
								tabPosFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);

							}

						}

					}

					indexTabsFin += 4;

				}

				for (var j=0; j<elements.length;j++){
					console.log("Droite");

					var id_s = $(elements[j]).parent().attr("id");
					var idHTML = parseInt(id_s);
					var idTab = idHTML - 1;

					
					var posDeb = idTab % 4;
					var posFin = convertRight(tabPosFinAll[idTab-posDeb+convertRight(posDeb)]);
					var decalage = Math.abs(posDeb - posFin);


					var id = parseInt(id_s);
					var value = $(elements[j]).html();


					elements_table.push(elements[j]);
					id_dep_table.push(idHTML);
					id_arr_table.push(idHTML+decalage);
					decalage = deplacement(decalage);
					decalage = '+='+decalage+'px';


					(function(j) {
						$(elements[j]).animate({left: decalage},200,function(){
							after_animation(elements_table, id_dep_table, id_arr_table, j);
						});
					})(j);

				}

				// tabInit = getGameStateInArray();
				
				// for (var i=0; i<4; i++) {

				// 	for (var j=0; j<4; j++) {

				// 		if (tabInit[i][j] != -1) tabEmpty.splice(i*4+j,1);

				// 	}

				// }

				// futureNewSquare = Math.floor((Math.random() * tabEmpty.length-1) + 0);

				// var new_div = document.createElement("div");
				// new_div.className = "carre_1";
				// new_div.innerHTML = "2";
				// debugger;

				// document.getElementById(tabEmpty[futureNewSquare]+1).appendChild(new_div);
				
			break;

			/*Bas*/
			case 40:
				var idDernCase = 4;
				var tabDepQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabInitQuarter = new Array();
				var tabFinQuarter = new Array();
				var tabPosFinQuarter = new Array();
				var tabsString;
				var tabFinAll = new Array();
				var tabPosFinAll = new Array();
				var indexTabsFin = 0;
				var tabEmpty = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
				var futureNewSquare;

				for (var j=0; j<4; j++) {

					for (var i=0; i<4; i++) {

						
						//tableau initiale d'une ligne
						tabInitQuarter[3-i] = tabInit[i][j]; 

					}
					// calcul tableau initiale d'une ligne et des postions de fin de chaque case
					tabsString = calculQuarterNewState(tabInitQuarter);

					for (var l=0; l<2; l++) {

						for (var k=0; k<4; k++) {

							if (l==0) tabFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);
							else if (l==1) {
								
								tabPosFinAll[k+indexTabsFin] = parseInt(tabsString[k][l]);

							}

						}

					}

					indexTabsFin += 4;

				}

				for (var j=0; j<elements.length;j++){
					console.log("Bas");

					var id_s = $(elements[j]).parent().attr("id");
					var idHTML = parseInt(id_s);
					var idTab = idHTML - 1;

					
					var posDeb = convertRight(Math.floor(idTab/4));
					var posFin = tabPosFinAll[posDeb+(idTab%4)*4];
					var decalage = Math.abs(posDeb - posFin);


					var id = parseInt(id_s);
					var value = $(elements[j]).html();


					elements_table.push(elements[j]);
					id_dep_table.push(idHTML);
					id_arr_table.push(idHTML+(decalage*4));
					decalage = deplacement(decalage);
					decalage = '+='+decalage+'px';


					(function(j) {
						$(elements[j]).animate({top: decalage},200,function(){
							after_animation(elements_table, id_dep_table, id_arr_table, j);
						});
					})(j);

				}

				// tabInit = getGameStateInArray();
				
				// for (var i=0; i<4; i++) {

				// 	for (var j=0; j<4; j++) {

				// 		if (tabInit[i][j] != -1) tabEmpty.splice(i*4+j,1);

				// 	}

				// }

				// futureNewSquare = Math.floor((Math.random() * tabEmpty.length-1) + 0);

				// var new_div = document.createElement("div");
				// new_div.className = "carre_1";
				// new_div.innerHTML = "2";
				// debugger;

				// document.getElementById(tabEmpty[futureNewSquare]+1).appendChild(new_div);

			break;
		}
	});
};

$(document).ready(main);


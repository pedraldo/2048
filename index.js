function deplacement(nbcase){
	return nbcase * 124;
};

function after_animation(elements_table, id_dep_table, id_arr_table, index_carre){
	var i=index_carre;
	document.getElementById(id_dep_table[i]).removeChild(elements_table[i]);
	var new_div = document.createElement("div");
	new_div.className = "carre_1";
	document.getElementById(id_arr_table[i]).appendChild(new_div);
};

var main = function(){

	/*
	$(document).keydown(function(event){
		var keyCode = event.which;
		if(event.which == 39){
			$("#carre_1").css("z-index","99");
			$("#carre_1").animate({left:'+=247px'},200,function(){
				$("#carre_1").remove();
				$("#4").append("<div id='carre_1'></div>");	
			});
		}
		else if(event.which == 37){
			$("#carre_2").animate({left:'-=300px'},200);
			$("#carre_1").remove();
			$("#carre_2").css("background-color","green");
		}
	});
	*/

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
		var elements_objets = $(".carre_1").get();


		for(var j=0; j<$(".carre_1").length;j++)
		{

			var id_s = $(elements[j]).parent().attr("id");
			var id = parseInt(id_s);
		
			var nb_voisins=0;

			switch(keyCode){
				/*Gauche*/
				case 37:

					if(id > 4 && id < 9) place_trouve = 5;

					else if(id > 8 && id < 13) place_trouve = 9;

					else if(id > 12) place_trouve = 13;

					else place_trouve = 1;

					for(k=place_trouve;k<id;k++){
						var case_voisine = document.getElementById(k);
						if(case_voisine.hasChildNodes()){
							nb_voisins++;
						}
					}

					place_trouve = place_trouve + nb_voisins;

					// for(var i=place_trouve;i<=id;i++){
					// 	if(document.getElementById(""+i).hasChildNodes()){
					// 		if(i==id && !recherche_finie){
					// 			place_trouve = id;
					// 			recherche_finie = true;
					// 		}
					// 	}
					// 	else if(!recherche_finie){
					// 		place_trouve = i;
					// 		recherche_finie = true;
					// 	}
					// }

					var difference = Math.abs(id - place_trouve);
					var decalage = deplacement(difference);
					var id_place_trouve = "#"+place_trouve;
					decalage = '-='+decalage+'px';

					elements_table.push(elements[j]);
					id_dep_table.push(id);
					id_arr_table.push(place_trouve);

					var animation = function(){	
						after_animation.call(this, elements_table, id_dep_table, id_arr_table, index_carre++);
					};


					$(elements[j]).animate({left: decalage},200,animation);

				break;

				/*Haut*/
				case 38:

					if(id == 1 || id == 5 || id == 9 || id == 13) place_trouve = 1;

					else if(id == 2 || id == 6 || id == 10 || id == 14) place_trouve = 2;

					else if(id == 3 || id == 7 || id == 11 || id == 15) place_trouve = 3;

					else place_trouve = 4;

					for(k=place_trouve;k<id;k+=4){
						var case_voisine = document.getElementById(k);
						if(case_voisine.hasChildNodes()){
							nb_voisins++;
						}
					}

					place_trouve = place_trouve + 4*nb_voisins;


					// for(var i=place_trouve;i<=id;i+=4){
					// 	if(document.getElementById(""+i).hasChildNodes()){
					// 		if(i==id && !recherche_finie){
					// 			place_trouve = id;
					// 			recherche_finie = true;
					// 		}
					// 	}
					// 	else if(!recherche_finie){
					// 		place_trouve = i;
					// 		recherche_finie = true;
					// 	}
					// }

					var difference = Math.abs(id - place_trouve)/4;
					var decalage = deplacement(difference);
					var id_place_trouve = "#"+place_trouve;
					decalage = '-='+decalage+'px';

					elements_table.push(elements[j]);
					id_dep_table.push(id);
					id_arr_table.push(place_trouve);

					var animation = function(){	
						after_animation.call(this, elements_table, id_dep_table, id_arr_table, index_carre++);
					};

					$(elements[j]).animate({top: decalage},200,animation);

				break;

				/*Droite*/
				case 39: 

					if(id > 4 && id < 9) place_trouve = 8;

					else if(id > 8 && id < 13) place_trouve = 12;

					else if(id > 12) place_trouve = 16;

					else place_trouve = 4;

					for(k=place_trouve;k>id;k--){
						var case_voisine = document.getElementById(k);
						if(case_voisine.hasChildNodes()){
							nb_voisins++;
						}
					}

					place_trouve = place_trouve - nb_voisins;
					
				
					// for(var i=place_trouve;i>=id;i--){
					// 	if(document.getElementById(""+i).hasChildNodes()){
					// 		if(i==id && !recherche_finie){
					// 			place_trouve = id;
					// 			recherche_finie = true;
					// 		}
					// 	}
					// 	else if(!recherche_finie){
					// 		place_trouve = i;
					// 		recherche_finie = true;
					// 	}
					// }

					var difference = Math.abs(id - place_trouve);
					var decalage = deplacement(difference);
					var id_place_trouve = "#"+place_trouve;
					decalage = '+='+decalage+'px';


					elements_table.push(elements[j]);
					id_dep_table.push(id);
					id_arr_table.push(place_trouve);

					var animation = function(){	
						after_animation.call(this, elements_table, id_dep_table, id_arr_table, index_carre++);
					};


					$(elements[j]).animate({left: decalage},200,animation);
					
				break;

				/*Bas*/
				case 40:

					if(id == 1 || id == 5 || id == 9 || id == 13) place_trouve = 13;

					else if(id == 2 || id == 6 || id == 10 || id == 14) place_trouve = 14;

					else if(id == 3 || id == 7 || id == 11 || id == 15) place_trouve = 15;

					else place_trouve = 16;

					for(k=place_trouve;k>id;k-=4){
						var case_voisine = document.getElementById(k);
						if(case_voisine.hasChildNodes()){
							nb_voisins++;
						}
					}

					place_trouve = place_trouve - 4*nb_voisins;

					// for(var i=place_trouve;i>=id;i-=4){
					// 	if(document.getElementById(""+i).hasChildNodes()){
					// 		if(i==id && !recherche_finie){
					// 			place_trouve = id;
					// 			recherche_finie = true;
					// 		}
					// 	}
					// 	else if(!recherche_finie){
					// 		place_trouve = i;
					// 		recherche_finie = true;
					// 	}
					// }

					var difference = Math.abs(id - place_trouve)/4;
					var decalage = deplacement(difference);
					var id_place_trouve = "#"+place_trouve;
					decalage = '+='+decalage+'px';

					elements_table.push(elements[j]);
					id_dep_table.push(id);
					id_arr_table.push(place_trouve);

					var animation = function(){	
						after_animation.call(this, elements_table, id_dep_table, id_arr_table, index_carre++);
					};

					$(elements[j]).animate({top: decalage},200,animation);
					
				break;
			}
		}
	});
};

$(document).ready(main);


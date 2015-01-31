function deplacement(nbcase){
	return nbcase * 124;
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
		switch(keyCode){
			/*Gauche*/
			case 37:
				var id_s = $(".carre_1").parent().attr("id");
				var id = parseInt(id_s);

				if(id > 4 && id < 9) place_trouve = 5;

				else if(id > 8 && id < 13) place_trouve = 9;

				else if(id > 12) place_trouve = 13;

				else place_trouve = 1;


				for(var i=place_trouve;i<=id;i++){
					if(document.getElementById(""+i).hasChildNodes()){
						if(i==id && !recherche_finie){
							place_trouve = id;
							recherche_finie = true;
						}
					}
					else if(!recherche_finie){
						place_trouve = i;
						recherche_finie = true;
					}
				}

				var difference = Math.abs(id - place_trouve);
				var decalage = deplacement(difference);
				var id_place_trouve = "#"+place_trouve;
				decalage = '-='+decalage+'px';

				$(".carre_1").animate({left: decalage},200,function(){
					$(".carre_1").remove();
					$(id_place_trouve).append("<div class='carre_1'></div>");	
				});

			break;

			/*Haut*/
			case 38:
				var id_s = $(".carre_1").parent().attr("id");
				var id = parseInt(id_s);

				if(id == 1 || id == 5 || id == 9 || id == 13) place_trouve = 1;

				else if(id == 2 || id == 6 || id == 10 || id == 14) place_trouve = 2;

				else if(id == 3 || id == 7 || id == 11 || id == 15) place_trouve = 3;

				else place_trouve = 4;


				for(var i=place_trouve;i<=id;i+=4){
					if(document.getElementById(""+i).hasChildNodes()){
						if(i==id && !recherche_finie){
							place_trouve = id;
							recherche_finie = true;
						}
					}
					else if(!recherche_finie){
						place_trouve = i;
						recherche_finie = true;
					}
				}

				var difference = Math.abs(id - place_trouve)/4;
				var decalage = deplacement(difference);
				var id_place_trouve = "#"+place_trouve;
				decalage = '-='+decalage+'px';

				$(".carre_1").animate({top: decalage},200,function(){
					$(".carre_1").remove();
					$(id_place_trouve).append("<div class='carre_1'></div>");
				});
			break;

			/*Droite*/
			case 39:
				var id_s = $(".carre_1").parent().attr("id");
				var id = parseInt(id_s);

				if(id > 4 && id < 9) place_trouve = 8;

				else if(id > 8 && id < 13) place_trouve = 12;

				else if(id > 12) place_trouve = 16;

				else place_trouve = 4;
				
				for(var i=place_trouve;i>=id;i--){
					if(document.getElementById(""+i).hasChildNodes()){
						if(i==id && !recherche_finie){
							place_trouve = id;
							recherche_finie = true;
						}
					}
					else if(!recherche_finie){
						place_trouve = i;
						recherche_finie = true;
					}
				}

				var difference = Math.abs(id - place_trouve);
				var decalage = deplacement(difference);
				var id_place_trouve = "#"+place_trouve;
				decalage = '+='+decalage+'px';

				$(".carre_1").animate({left: decalage},200,function(){
					$(".carre_1").remove();
					$(id_place_trouve).append("<div class='carre_1'></div>");
				});
				
			break;

			/*Bas*/
			case 40:
				var id_s = $(".carre_1").parent().attr("id");
				var id = parseInt(id_s);

				if(id == 1 || id == 5 || id == 9 || id == 13) place_trouve = 13;

				else if(id == 2 || id == 6 || id == 10 || id == 14) place_trouve = 14;

				else if(id == 3 || id == 7 || id == 11 || id == 15) place_trouve = 15;

				else place_trouve = 16;


				for(var i=place_trouve;i>=id;i-=4){
					if(document.getElementById(""+i).hasChildNodes()){
						if(i==id && !recherche_finie){
							place_trouve = id;
							recherche_finie = true;
						}
					}
					else if(!recherche_finie){
						place_trouve = i;
						recherche_finie = true;
					}
				}

				var difference = Math.abs(id - place_trouve)/4;
				var decalage = deplacement(difference);
				var id_place_trouve = "#"+place_trouve;
				decalage = '+='+decalage+'px';

				$(".carre_1").animate({top: decalage},200,function(){
					$(".carre_1").remove();
					$(id_place_trouve).append("<div class='carre_1'></div>");
				});
			break;
		}
	});
};

$(document).ready(main);


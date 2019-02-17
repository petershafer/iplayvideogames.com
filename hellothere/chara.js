
var screenwidth;
var screenheight;
var mousex;
var mousey;

function update(e){
	screenwidth = window.innerWidth;
	screenheight = window.innerHeight;
	mousex = e.clientX;
	mousey = e.clientY;
}

function centerit(){
	var contentheight = document.getElementById("pagewrapper").offsetHeight/2;
	var pageheight = window.innerHeight/2;
	document.getElementById("pagewrapper").style.top = (pageheight-contentheight)+"px";
}

function changegraphic(chara,path){
	if(chara.src.indexOf(path) == -1){
		chara.src = path;
	}
}

var sleepto;
var sleeptoRunning = false;
var sleeping = false;
function moveChara(){
	var chara = document.getElementById("chara");
	if((chara.offsetLeft + (chara.width) < mousex) && !sleeping){
		chara.style.left = (chara.offsetLeft + 3) + "px";
		changegraphic(chara,"walkr.gif");
		clearTimeout(myto);
		clearTimeout(sleepto);
		mytoRunning = false;
		sleeptoRunning = false;
		sleeping = false;
	}else if((chara.offsetLeft > mousex) && !sleeping){
		chara.style.left = (chara.offsetLeft - 3) + "px";
		changegraphic(chara,"walkl.gif");
		clearTimeout(myto);
		clearTimeout(sleepto);
		mytoRunning = false;
		sleeptoRunning = false;
		sleeping = false;
	}else if(!mytoRunning && chara.src.indexOf("snore.gif") == -1){
		changegraphic(chara,"front.gif");
		if(!sleeptoRunning){
			sleepto = setTimeout("changegraphic(document.getElementById(\"chara\"),\"snore.gif\"); sleeptoRunning=false;sleeping=true;",10000);
			sleeptoRunning = true;
		}
	}
}

var listenMove = false;
function initChara(){
	var chara = document.getElementById("chara");
	chara.style.position="absolute";
	chara.style.left="-50px";
	chara.style.bottom="0px";
	chara.style.display="block";
	document.getElementById("machine").style.display="block";
	listenMove = setInterval("moveChara()",25);
}

var myto;
var mytoRunning;
var runLink;
var runInt = 0;
function act(){
	var chara = document.getElementById("chara");
	var machine = document.getElementById("machine");
	changegraphic(document.getElementById("chara"),"shock.gif");
	myto = setTimeout("changegraphic(document.getElementById(\"chara\"),\"front.gif\");mytoRunning = false;",500);
	mytoRunning = true;
	sleeping = false;
	
	if(chara.offsetLeft > machine.offsetLeft + 46 && chara.offsetLeft < machine.offsetLeft + (160 - chara.width)){
		clearInterval(listenMove);
		clearTimeout(myto);
		runLink = setInterval("whoa()",25);
	}
}

function whoa(){
	var chara = document.getElementById("chara");
	chara.style.top = (chara.offsetTop - 5) + "px";
	runInt++;
	if(runInt > 12){
		clearInterval(runLink);
		setTimeout("document.getElementById(\"chara\").style.display=\"none\";",500);
		setTimeout("window.location.href=\"teleport.html\";",1000);
	}
}
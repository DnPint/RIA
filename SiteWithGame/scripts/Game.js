document.addEventListener('DOMContentLoaded', function() {

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

let MacronImgage = new Image();
let McCanvas = document.getElementById("Macron");
let McCtx = McCanvas.getContext("2d");
MacronImgage.src ="ressources/HeroImages/Macron1.png";
McCanvas.ondragstart=drag;

let BidenImage = new Image();
let BdCanvas = document.getElementById("Biden");
let BdCtx = BdCanvas.getContext("2d");
BidenImage.src ="ressources/HeroImages/Biden1.png";
BdCanvas.ondragstart=drag;

let PopeImage = new Image();
let PPCanvas = document.getElementById("Pope");
let PPCtx = PPCanvas.getContext("2d");
PopeImage.src ="ressources/HeroImages/Pope1.png";
PPCanvas.ondragstart=drag;

let PoliceImage = new Image();
let PlCanvas = document.getElementById("Police");
let PlCtx = PlCanvas.getContext("2d");
PoliceImage.src ="ressources/HeroImages/Police1.png";
PlCanvas.ondragstart=drag;

let DocImage = new Image();
let DcCanvas = document.getElementById("Doctor");
let DcCtx = DcCanvas.getContext("2d");
DocImage.src ="ressources/HeroImages/doctor1.png";
DcCanvas.ondragstart=drag;

let Zone4Canvas = document.getElementById("zone4");
Zone4Canvas.ondragover=allowDrop;
Zone4Canvas.ondrop=drop;

let Zone3Canvas = document.getElementById("zone3");
Zone3Canvas.ondragover=allowDrop;
Zone3Canvas.ondrop=drop;

let Zone2Canvas = document.getElementById("zone2");
Zone2Canvas.ondragover=allowDrop;
Zone2Canvas.ondrop=drop;

let Zone1Canvas = document.getElementById("zone1");
Zone1Canvas.ondragover=allowDrop;
Zone1Canvas.ondrop=drop;

let started = false;
let start = document.getElementById("startBtn");
start.onclick= function(){

    let nb1 =Zone1Canvas.childNodes;
    let nb2 =Zone2Canvas.childNodes;
    let nb3 =Zone3Canvas.childNodes;
    let nb4 =Zone4Canvas.childNodes;

    if(started==false){
        Game(nb1[1].id, nb2[1].id, nb3[1].id,nb4[1].id);  
    }
    started = true;
    console.log(started);

}

let renderFirst = function(){

    McCtx.drawImage(MacronImgage,0,0);
    BdCtx.drawImage(BidenImage,0,0);
    PPCtx.drawImage(PopeImage,0,0);
    PlCtx.drawImage(PoliceImage,0,0);
    DcCtx.drawImage(DocImage,0,0);
    
}


let selectionMenu = function(){

    renderFirst();

    if(started==false){
        requestAnimationFrame(selectionMenu);
    }
}

selectionMenu();

//---------------------------
//Game starts

let Game = function(hero1, hero2, hero3, hero4){

    let score=0;

    console.log(hero1);
    console.log(hero2);
    console.log(hero3);
    console.log(hero4);

    //Combattant class

    //Heroes classes

    //Mob classes

    //Boss classes

    //MovePool

    //load hero images

    //load mob images

    //load boss images

    //load BG images 

    //load other images

    //Construction of called heroes

    //Create the canvas
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 1000;
    document.body.appendChild(canvas);

    //Load a BackGround Image
    let bgImage = new Image();
    bgImage.src = "ressources/BgImages/Background_hopital.png";
    bgImage.onload=function(){
        ctx.drawImage(bgImage,0,0);
    }

    //USER Inputs
        /* eventlistner("keydown")
            checker le unicode pour savroir si 1 ou 2

            boucler sur le groupe de héros
                appeler la fonction correspondante sur le héro activé
                
        */



    //FightEvent loop

        //place heros

        //create and place mobs

        //Combat loop

            //Heroes turn

            //mobs turn

    //when all heroes are defeated, score is saved

}
})
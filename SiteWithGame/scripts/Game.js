document.addEventListener('DOMContentLoaded', function() {

let Username;
document.getElementById("myButton").onclick = function(){
    Username = document.getElementById("myText").value;
    console.log("Hello",Username);
    Player.username = Username;
}

function json(url) {
    return fetch(url).then(res => res.json());
}

let Player ={
    country : "default",
    username :"default",
    points :"default", 
}

let apiKey = '901b2b899ca090cfb7ec2fec948dd18c0a81526f436b55a8607044b1';
json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    console.log(data.ip);
    console.log(data.city);
    console.log(data.country_code);
    Player.country=data.country_code;
});

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

    if(started===false&&Username!==undefined){
        Game(nb1[0].id, nb2[0].id, nb3[0].id,nb4[0].id);  
        started = true;
        return;
    }
    alert("Please write your name before starting");
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

    console.log("bite",Username);
    let score=0;

    let gameStarted=false;
    let gameOver=false;
    let teamAssebled=false;
    let ctx;
    let canvas;
    let textCanvas;
    let txtCtx
    let TxtCvsImage;
    let bgLoaded = false;

    let bgImage = new Image();

    console.log(hero1);
    console.log(hero2);
    console.log(hero3);
    console.log(hero4);

    let Heroes = [];
    let Mobs=[];

    let audio = new Audio();
    audio.src="ressources/Music/Music.mp3";

    //create Bg images
    let BgImages=[];
    BgImages[0]="ressources/BgImages/Background_bureau_ovale.png";
    BgImages[1]="ressources/BgImages/Background_chine.png";
    BgImages[2]="ressources/BgImages/CSGO-Asia4.png";
    BgImages[3]="ressources/BgImages/CSGO-Asia5.png";
    BgImages[4]="ressources/BgImages/CSGO-Hospital3.png";
    BgImages[5]="ressources/BgImages/CSGO-Hospital4.png";
    BgImages[6]="ressources/BgImages/pd2-Asia1.png";
    BgImages[7]="ressources/BgImages/pd2-Asia2.png";
    BgImages[8]="ressources/BgImages/pd2-Asia3.png";
    BgImages[9]="ressources/BgImages/pd2-Hospital2.png";
    BgImages[10]="ressources/BgImages/pd2-Hostpital1.png";
    BgImages[14]="ressources/BgImages/pd2-WhiteHouse1.png";
    BgImages[15]="ressources/BgImages/pd2-WhiteHouse4.png";
    BgImages[16]="ressources/BgImages/pd2-WhiteHouse7.png";

    //load other images
    let DeathSymbol = new Image();
    DeathSymbol.src="/ressources/OtherImages/redCross1.png";
    let StunSymbol =new Image();
    StunSymbol.src="/ressources/OtherImages/stun1.png";
    let GameOvrImage= new Image();
    GameOvrImage.src="/ressources/OtherImages/gameover.png";


    //load hero images
    let PortraitMacron = new Image();
    let loadMacron=false;
    PortraitMacron.src = "ressources/HeroImages/Macron1.png";
    PortraitMacron.onload=function(){
        loadMacron=true;
    }

    let PortraitBiden = new Image();
    let loadBiden= false;
    PortraitBiden.src = "ressources/HeroImages/Biden1.png";
    PortraitBiden.onload=function(){
        loadBiden = true;
    }

    let PortraitPope = new Image();
    let loadPope = false;
    PortraitPope.src = "ressources/HeroImages/Pope1.png";
    PortraitPope.onload=function(){
        loadPope=true;
    }

    let PortraitPolice = new Image();
    let loadPolice = false;
    PortraitPolice.src = "ressources/HeroImages/Police1.png";
    PortraitPolice.onload=function(){
        loadPolice = true;
    }

    let PortraitDoctor = new Image();
    let loadDoctor = false;
    PortraitDoctor.src = "ressources/HeroImages/Doctor1.png";
    PortraitDoctor.onload=function(){
        loadDoctor = true;
    }

    //load mob images
    let PortraitBodyGuard = new Image();
    let loadBodyGuard = false;
    PortraitBodyGuard.src = "ressources/MobImages/bodyGuard1.png";
    PortraitBodyGuard.onload=function(){
        loadBodyGuard=true;
    }

    let PortraitKaren = new Image();
    let loadKaren = false;
    PortraitKaren.src = "ressources/MobImages/Karen1.png";
    PortraitKaren.onload=function(){
        loadKaren=true;
    }

    let PortraitRioter = new Image();
    let loadRioter = false;
    PortraitRioter.src = "ressources/MobImages/Rioter1.png";
    PortraitRioter.onload=function(){
        loadRioter=true;
    }

    let PortraitTinFoil = new Image();
    let loadTinFoil = false;
    PortraitTinFoil.src = "ressources/MobImages/TinFoil1.png";
    PortraitTinFoil.onload=function(){
        loadTinFoil=true;
    }

    let PortraitSoldier = new Image();
    let loadSoldier = false;
    PortraitSoldier.src = "ressources/MobImages/soldier1.png";
    PortraitSoldier.onload=function(){
        loadSoldier=true;
    }
    //load boss images


    //Make game graphics

    let renderGame = function(){

    //draw canvas
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = 1400;
        canvas.height = 1000;
        document.getElementById("selection").appendChild(canvas);

        textCanvas = document.createElement("canvas");
        txtCtx = textCanvas.getContext("2d");
        textCanvas.width = 1400;
        textCanvas.height = 200;
        document.body.appendChild(textCanvas);

        TxtCvsImage = new Image();
        TxtCvsImage.src = "ressources/BgImages/textBox.jpg";
        TxtCvsImage.onload=function(){
            txtCtx.drawImage(TxtCvsImage,0,0);
            txtCtx.fillStyle = "rgb(250, 250, 250)";
            txtCtx.font = "24px Helvetica";
            txtCtx.textAlign = "left";
            txtCtx.textBaseline = "top";
        }
        audio.loop=true;
        audio.play();

    }

    //Combattant class
    class Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            this.name=Name;
            this.sonTour = false;
            this.stun = false;
            this.mort = false;
            this.pvMax =PvMax;
            this.pvActuels=PvMax;
            this.portrait= new Image();
            this.coordVert=CoordVert;
            this.coordHoriz=CoordHoriz;

        }

        checkEtat(){
            if(this.mort===true){
                ctx.drawImage(DeathSymbol,this.coordHoriz+25,this.coordVert+100);
            }
            if(this.stun===true){
                ctx.drawImage(StunSymbol,this.coordHoriz,this.coordVert);
            }
        }

        subirSoins(soins){
            if(this.pvActuels+soins>= this.pvMax){
                this.pvActuels=this.pvMax;
            }else{
                this.pvActuels+=soins;
            }
        }

        subirDegats(degats){
            console.log(this.name+" a subit des dégâts");
            this.pvActuels-=degats;
            if(this.pvActuels<=0){
                console.log(this.name+" est mort");
                this.pvActuels=0;
                this.mort=true;
                ctx.drawImage(DeathSymbol,this.coordHoriz+25,this.coordVert+100);
                score+=this.points;
            }
        }

        subirStun(){
            this.stun=true;
            ctx.drawImage(StunSymbol,this.coordHoriz,this.coordVert);
        }

    }

    //Heroes classes

    class Macron extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name);
            this.portrait=PortraitMacron;
            this.points=0;
        }

        
        getAbilities(){
            return this.name +" :  1. Attestation de sortie  2. Pas besoin de masques";
        }

        attack1(cible){
            for(let i=0;i<4;i++){
                Mobs[i].subirDegats(20);
            }
        }

        attack2(cible){
            for(let i=0;i<4;i++){
                if(Math.random()*(1-0)+0<=0.25){
                    Mobs[i].subirStun();

                }
            console.log(Mobs[i].stun);
            }
        }
    }

    class Biden extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name);
            this.portrait=PortraitBiden;
            this.points=0;
        }

        
        getAbilities(){
            return this.name +" :  1. 1400$  2. US MARINES";
        }


        attack1(cible){
            for(let i=0;i<4;i++){
                Mobs[i].subirDegats(15);
            }
        }

        attack2(cible){
            Mobs[cible].subirDegats(70);
        }
    }

    class Pope extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name);
            this.Portrait=PortraitPope;
            this.points=0;
        }

                
        getAbilities(){
            return this.name +" :  1. prière  2. Bénédiction";
        }
 
        attack1(cible){
            for(let i=0;i<4;i++){
                if(Heroes[i].mort===false){
                    Heroes[i].subirSoins(5);
                }
            }
        }

        attack2(cible){
            if(Heroes[cible].mort===false){
                Heroes[cible].subirSoins(15);    
            }
        }
    }

    class Police extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name);
            this.portrait=PortraitPolice;
            this.points=0;
        }

                
        getAbilities(){
            return this.name +" :  1. Violence Policère 2. Tir de LBD";
        }

        attack1(cible){
            Mobs[cible].subirDegats(50);
        }

        attack2(cible){
            if(Math.random()<=0.6){
                Mobs[cible].subirDegats(Mobs[cible].pvMax);
            }
        }
    }

    class Doctor extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name);
            this.portrait=PortraitDoctor;
            this.points=0;
        }

                
        getAbilities(){
            return this.name +" :  1. Quarantaine  2. Soins";
        }


        attack1(cible){
            Mobs[cible].subirStun();
        }

        attack2(cible){
            if(Heroes[cible].mort===true){
                rewriteextBox();
                txtCtx.fillText("Pas la peine d'essayer de réanimer les morts !",100,100);
            }else{
                Heroes[cible].subirSoins(20);          
            }
        }
    }


    //Mob classes

    class Karen extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name)
            this.Portrait=PortraitKaren;
            this.points=this.pvMax;
        }

        //portrait

        attack1(){
            let cible = Math.floor(Math.random()*(3.99-0)+0);
            Heroes[cible].subirDegats(15);
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Tir sur " +Heroes[cible].name,100,100);
        }

        attack2(){
            for(let i=0;i<4;i++){
                Heroes[i].subirDegats(10);
            }
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Appel au Manager sur les Héros",100,100);
        }
    }

    class BodyGrard extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name)
            this.Portrait=PortraitBodyGuard;
            this.points=this.pvMax;
        }

        //portrait

        attack1(){
            let cible = Math.floor(Math.random()*(3.99-0)+0);
            if(Math.random()<=0.8){
                Heroes[cible].subirStun();
                rewriteextBox();
                txtCtx.fillText(this.name+" a utilisé Taser sur " +Heroes[cible].name,100,100);
            }else{
                rewriteextBox();
                txtCtx.fillText(this.name+" a raté son taser",100,100);
            }

        }

        attack2(){
            let cible = Math.floor(Math.random()*(3.99-0)+0);
            Heroes[cible].subirDegats(25);
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Tir sur " +Heroes[cible].name,100,100);
        }
    }

    class Rioter extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name)
            this.portrait=PortraitRioter;
            this.points=this.pvMax;
        }

        //portrait
        subirStun(){
            this.stun=true;
            ctx.drawImage(StunSymbol,this.coordHoriz+70,this.coordVert+50);
        }

        attack1(){
            let cible = Math.floor(Math.random()*(3.99-0)+0);
            Heroes[cible].subirDegats(20);
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Casse sur " +Heroes[cible].name,100,100);
        }

        attack2(){
            let cible = Math.floor(Math.random()*(3.99-0)+0);
            if(Math.random()<=0.4){
                Heroes[cible].subirDegats(50);
                rewriteextBox();
                txtCtx.fillText(this.name+" a utilisé Accusation de racisme sur " +Heroes[cible].name,100,100);
            }else{
                rewriteextBox();
                txtCtx.fillText(this.name+" a raté son Accusation de racisme",100,100);
            }
        }
    }

    class Soldier extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name)
            this.portrait=PortraitSoldier;
            this.points=this.pvMax;
        }

        //portrait
        subirStun(){
            this.stun=true;
            ctx.drawImage(StunSymbol,this.coordHoriz+100,this.coordVert)
        }

        attack1(){
            let cible = Math.floor(Math.random()*(3.99-0)+0);
            Heroes[cible].subirDegats(40);
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Tir sur " +Heroes[cible].name,100,100);
        }

        attack2(){
            for(let i=0;i<4;i++){
                Heroes[i].subirDegats(10);
                if(Math.random()<=0.15){
                    Heroes[i].subirStun();
                }
            }
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Mitraillage sur les Héros",100,100);
        }
    }

    class TinFoil extends Combattant{
        constructor(PvMax,CoordHoriz,CoordVert,Name){
            super(PvMax,CoordHoriz,CoordVert,Name)
            this.portrait=PortraitTinFoil;
            this.points=this.pvMax;
        }

        //portrait

        attack1(){
            for(let i=0;i<4;i++){
                if(Mobs[i].mort===true){
                    continue;
                }
                Mobs[i].subirSoins(15);
            }
            rewriteextBox();
            txtCtx.fillText(this.name+" a utilisé Conspirations sur nos ennemis",100,100);
        }

        attack2(){
            for(let i=0;i<4;i++){
                Mobs[i].stun=false;
                console.log(Mobs[i].name+" strun "+Mobs[i].stun);
            }
            visualUpdate(drawFighters);
            rewriteextBox();
            txtCtx.fillText(this.name+" dit que la terre est plate !",100,100);
        }
    }

    
    //Construction of called heroes
    let makeHeroes=function(){

        switch(hero1){
            case "Pope":
                Heroes[0]= new Pope(90,550,500,"Pope");
                Heroes[0].Portrait=PortraitPope;
                break;
            case "Macron":
                Heroes[0]= new Macron(100,550,500,"Macron");
                Heroes[0].Portrait=PortraitMacron;
                break;
            case "Biden":
                Heroes[0]= new Biden(90,550,500,"Biden");
                Heroes[0].Portrait=PortraitBiden;
                break;
            case "Police":
                Heroes[0]= new Police(120,550,500,"Police");
                Heroes[0].Portrait=PortraitPolice;
                break;
            case "Doctor":
                Heroes[0]= new Doctor(100,550,500,"Doctor");
                Heroes[0].Portrait=PortraitDoctor;
                break;
        }

        switch(hero2){
            case "Pope":
                Heroes[1]= new Pope(90,400,500,"Pope");
                Heroes[1].Portrait=PortraitPope;
                break;
            case "Macron":
                Heroes[1]= new Macron(100,400,500,"Macron");
                Heroes[1].Portrait=PortraitMacron;                
                break;
            case "Biden":
                Heroes[1]= new Biden(90,400,500,"Biden");
                Heroes[1].Portrait=PortraitBiden;
                break;
            case "Police":
                Heroes[1]= new Police(120,400,500,"Police");
                Heroes[1].Portrait=PortraitPolice;
                break;
            case "Doctor":
                Heroes[1]= new Doctor(100,400,500,"Doctor");
                Heroes[1].Portrait=PortraitDoctor;
                break;
        }

        switch(hero3){
            case "Pope":
                Heroes[2]= new Pope(90,250,500,"Pope");
                Heroes[2].Portrait=PortraitPope;
                break;
            case "Macron":
                Heroes[2]= new Macron(100,250,500,"Macron");
                Heroes[2].Portrait=PortraitMacron;
                break;
            case "Biden":
                Heroes[2]= new Biden(90,250,500,"Biden");
                Heroes[2].Portrait=PortraitBiden;
                break;
            case "Police":
                Heroes[2]= new Police(120,250,500,"Police");
                Heroes[2].Portrait=PortraitPolice;
                break;
            case "Doctor":
                Heroes[2]= new Doctor(100,250,500,"Doctor");
                Heroes[2].Portrait=PortraitDoctor;
                break;
        }

        switch(hero4){
            case "Pope":
                Heroes[3]= new Pope(90,100,500,"Pope");
                Heroes[3].Portrait=PortraitPope;
                break;
            case "Macron":
                Heroes[3]= new Macron(100,100,500,"Macron");
                Heroes[3].Portrait=PortraitMacron;
                break;
            case "Biden":
                Heroes[3]= new Biden(90,100,500,"Biden");
                Heroes[3].Portrait=PortraitBiden;
                break;
            case "Police":
                Heroes[3]= new Police(120,100,500,"Police");
                Heroes[3].Portrait=PortraitPolice;
                break;
            case "Doctor":
                Heroes[3]= new Doctor(100,100,500,"Doctor");
                Heroes[3].Portrait=PortraitDoctor;
                break;
        }

        teamAssebled=true;
    }

    let makeMobs= function(){
        //create mobs
        for(let i =0; i<4;i++){
            let mobToSpawn = Math.floor(Math.random()*(4.99-0)+0);
            switch(mobToSpawn){
                case 0:
                    Mobs[i]=new TinFoil(70,700+i*150,500,"Chapeau en alu");
                    Mobs[i].Portrait = PortraitTinFoil;
                break;
                case 1:
                    Mobs[i]=new Karen(80,700+i*150,500,"Karen");
                    Mobs[i].Portrait = PortraitKaren;
                break;
                case 2:
                    Mobs[i]=new Rioter(90,700+i*150,500,"Emeutier");
                    Mobs[i].Portrait = PortraitRioter;
                break;
                case 3:
                    Mobs[i] = new BodyGrard(100,700+i*150,500,"Guarde du corps");
                    Mobs[i].Portrait = PortraitBodyGuard;
                break;
                case 4:
                    Mobs[i] = new Soldier(125,700+i*150,500,"Soldat")
                    Mobs[i].Portrait = PortraitSoldier;
                break;
            }
        }
    }

    let newFight=function(){

        // reset le canvas avec
        //Load a new BackGround Image
        bgImage.src = BgImages[Math.floor(Math.random()*(17-0)+0)];
        bgImage.onload=function(){
            bgLoaded=true;
            ctx.drawImage(bgImage,0,0);
        }
        bgImage.onerror=function(){
            bgImage.src = BgImages[Math.floor(Math.random()*(17-0)+0)];
            ctx.drawImage(bgImage,0,0);
        }

    }

    function drawFighters(){
        for(let i = 0;i<4;i++){  
            ctx.drawImage(Heroes[i].Portrait,Heroes[i].coordHoriz, Heroes[i].coordVert);           
            Heroes[i].checkEtat();              
        }
        for(let i =0;i<4;i++){
            ctx.drawImage(Mobs[i].Portrait,Mobs[i].coordHoriz, Mobs[i].coordVert);
            Mobs[i].checkEtat();
        }
    }


    let heroToPlay = 0;
    let heroTurn = function(){
        console.log("tour du héros "+heroToPlay);
        if(heroToPlay<4){
            for(let j =0; j<4 ;j++){
                Heroes[j].sonTour=false;
                Heroes[heroToPlay].sonTour=true;
            }
        }else{
            mobToPlay=0;
            mobTurn();
        }
    }

    let mobToPlay=0;
    let mobTurn = function(){
        console.log("tour du mob "+mobToPlay);
            if(mobToPlay<4){
                for(let j =0; j<4; j++){
                    Mobs[j].sonTour=false;
                    Mobs[mobToPlay].sonTour=true;
                }
            mobToPlay++;  
            }else{
                heroToPlay=0;
                heroTurn();
            }
    }


    function visualUpdate(callback){
        ctx.drawImage(bgImage,0,0);
        callback();

        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "50px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Score : " + score, 600,50);
    }

    let writePossibleActions=function(){
        for(let i =0;i<4;i++){
            if(Heroes[i].sonTour===true){
                txtCtx.fillText(Heroes[i].getAbilities(),100,100)
            }
        }
    }

    let rewriteextBox=function(){
        txtCtx.drawImage(TxtCvsImage,0,0);
        for(let i = 0; i<4;i++){
            txtCtx.fillText(i+1 +". "+Heroes[i].pvActuels+"/"+Heroes[i].pvMax,
                550-i*150,50);
            txtCtx.fillText(i+1 +". "+Mobs[i].pvActuels+"/"+Mobs[i].pvMax,
                750+i*150,50);
        }

    }



    let targeting = false;
    let selectedAction=1;
    addEventListener("keydown",function (e){
        if(gameOver===true){
            console.log("GAME OOOOOOOOOOOOOOOOOOOOVER");
            return;
        }
        let key=e.key;

        for(let i = 0; i<4;i++){
            if(targeting===false){
                if(Heroes[i].sonTour===true){
                    if(Heroes[i].stun===true||Heroes[i].mort===true){
                        Heroes[i].stun=false;
                        visualUpdate(drawFighters);
                        rewriteextBox();
                        //txtCtx.fillText(Heroes[i].name+ " a dû passer son tour !",100,150);
                        Heroes[heroToPlay].sonTour=false;
                        targeting=false;
                        heroToPlay++;
                        heroTurn();
                        writePossibleActions();
                        return;
                    }
                        switch(key){
                            case "1":
                                selectedAction=1;
                                rewriteextBox();
                                targeting=true;
                                txtCtx.fillText("Selectionnez une cible (1-4)",100,150);
                                break;
                            case "2":
                                selectedAction=2;
                                rewriteextBox();
                                targeting=true;
                                txtCtx.fillText("Selectionnez une cible (1-4)",100,150);
                                break;
                            default:
                                rewriteextBox();
                                writePossibleActions();
                                txtCtx.fillText("Appuyez sur 1 ou 2 pour choisir votre action",100,150);                              
                        }
                    console.log("selected action :" +selectedAction);
                return;
                }
            }else{
                rewriteextBox();
                switch(key){
                    case "1":

                        if(selectedAction==1){
                            Heroes[heroToPlay].attack1(0);
                        }else{
                            Heroes[heroToPlay].attack2(0);
                        }
                        break;

                    case "2":
                        if(selectedAction==1){
                            Heroes[heroToPlay].attack1(1);
                        }else{
                            Heroes[heroToPlay].attack2(1);
                        }                        
                        break;

                    case "3":
                        if(selectedAction==1){
                            Heroes[heroToPlay].attack1(2);
                        }else{
                            Heroes[heroToPlay].attack2(2);
                        }                        
                        break;
                    case "4":
                        if(selectedAction==1){
                            Heroes[heroToPlay].attack1(3);
                        }else{
                            Heroes[heroToPlay].attack2(3);
                        }                        
                        break;
                    default:
                        rewriteextBox();
                        txtCtx.fillText("Selectionnez une cible (1-4)",100,100);
                        txtCtx.fillText("Cible non valide",100,150); 
                    return;                             
                }
                Heroes[heroToPlay].sonTour=false;
                targeting=false;
                heroToPlay++;
                heroTurn();
                rewriteextBox();

                if(Mobs[0].mort===true&&Mobs[1].mort===true&&Mobs[2].mort===true&&Mobs[3].mort===true){
                    heroToPlay=0;
                    endOfFight();
                }else{
                    visualUpdate(drawFighters);
                }
                if(Heroes[i+1].stun===true){
                    if(i!==3){
                        txtCtx.fillText(Heroes[i+1].name+" est étourdi",100,150);
                    }
                }else{
                    writePossibleActions();
                }
                return;
            }
        }

        //test si les mobs sont activés
        for(let i =0;i<4;i++){
            if(Mobs[i].sonTour===true){
                if(Mobs[i].mort===true||Mobs[i].stun===true){
                    rewriteextBox();
                    txtCtx.fillText(Mobs[i].name+" est mort ou étrourdi !",100,150);
                    Mobs[i].stun=false;
                }else{
                    if(Math.random()*(1-0)+0<=0.5){
                        Mobs[i].attack1();
                    }else{
                        Mobs[i].attack2();
                    }

                }
                if(Heroes[0].mort===true&&Heroes[1].mort===true&&Heroes[2].mort===true&&Heroes[3].mort===true){
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                    endOfGame();
                    return;
                }
                score-=20;
                visualUpdate(drawFighters);
            }
        }
        mobTurn();


        //sert à faire jouer un tour à un mob et passer au mob suivant
        
     

        //placer ici un callback avec la capacité héros
    },false);


    let endOfFight = function(){
        newFight();
    }

    renderGame();
    newFight();

    let main = function(){
        if(bgLoaded&&loadBiden&&loadDoctor&&loadMacron&&loadPolice&&loadPope&&
            loadBodyGuard&&loadKaren&&loadRioter&&loadSoldier&&loadTinFoil){
            console.log("nouveau combat");
            bgLoaded=false;
            gameStarted=true;
            if(teamAssebled==false){
                makeHeroes(); 
            }
            makeMobs();
            //drawFighters();
            rewriteextBox();
            heroTurn();
            writePossibleActions();
            visualUpdate(drawFighters);
        }

         requestAnimationFrame(main);
        
    }

    main();
    
    let endOfGame=function(){

        ctx.drawImage(GameOvrImage,0,0);

        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "50px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Score : " + score, 600,50);

        audio.pause();
        gameOver=true;

        txtCtx.drawImage(TxtCvsImage,0,0);

        Player.points=score;

        localStorage.setItem(Player.username,JSON.stringify(Player));
        console.log(localStorage);

        

    }

}
})

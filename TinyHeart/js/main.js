document.body.onload = game;

var can1;
var can2;
var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;

var bgPic;

var ane;
var fruit;

var mom;

var mx; //mousex mousey
var my;

var baby;

var data;
var wave;
var helo;
var dust;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();

};

function init() {
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    ctx1 = can1.getContext("2d");
    ctx2 = can2.getContext("2d");

    can1.addEventListener("mousemove", onMouseMove, false);

    bgPic = new Image();
    bgPic.src = "src/background.jpg"

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();
    mx = canWidth * 0.5;
    my = canHeight * 0.5;

    baby = new babyObj();
    baby.init();

    data = new dataObj();

    wave = new waveObj();
    wave.init();
    halo = new haloObj();
    halo.init();


    ctx1.font = "25px Verdana"
    ctx1.textAlign = "center";


    dust = new dustObj();

    dust.init();

};

function gameloop() {
    window.requestAnimFrame(gameloop);
    
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    if (deltaTime > 40) deltaTime = 40;

    drawBackground();
    ane.draw();

    fruitCount();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();

    eatFruit();
    feedBaby();

    data.draw();


    wave.draw();
    halo.draw();
    dust.draw();

}

function onMouseMove(e) {
    if (!data.gameOver) {
        if (e.offsetX || e.layerX) {
            mx = e.offsetX == undefined ? e.layerX : e.offsetX
            my = e.offsetY == undefined ? e.layerY : e.offsetY

        }
    }
}

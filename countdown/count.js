var can = document.getElementById("canvas1");
var ctx = can.getContext("2d");

var WIDTH = document.documentElement.clientWidth - 20;
var HEIGHT = document.documentElement.clientHeight - 20;
var RADIUS = Math.round(WIDTH * 4 / 5 / 115) - 1;
var ML = Math.round(WIDTH / 5 / 2);
var MT = Math.round(HEIGHT / 5);


//第一次载入时获得当前时间，后续用于记录时间变化
var curdate = new Date();
var curhour = curdate.getHours();
var curminute = curdate.getMinutes();
var cursecond = curdate.getSeconds();

var balls = [];
const colors = ["#eeb5e6",
    "#09c",
    "#a6c",
    "#93c",
    "#9c0",
    "#690",
    "#fb3",
    "#f80",
    "#f44",
    "#c00"
]

can.width = WIDTH;
can.height = HEIGHT;

function draw() {
    //每一帧刷新时间，用于进行时间变化的判断
    var nextdate = new Date();
    var nexthour = nextdate.getHours();
    var nextminute = nextdate.getMinutes();
    var nextsecond = nextdate.getSeconds();

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    //绘制数字开始的位置   (间隔数+4*冒号数+7*数字的数量)*(半径+1)*2
    //小时 
    drawDigit((0 + 4 * 0 + 7 * 0) * (1 + RADIUS) * 2 + ML, MT, parseInt(nexthour / 10)); //十位
    drawDigit((1 + 4 * 0 + 7 * 1) * (1 + RADIUS) * 2 + ML, MT, parseInt(nexthour % 10)); //个位
    //冒号
    drawDigit((2 + 4 * 0 + 7 * 2) * (1 + RADIUS) * 2 + ML, MT, 10);
    //分钟
    drawDigit((3 + 4 * 1 + 7 * 2) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextminute / 10));
    drawDigit((4 + 4 * 1 + 7 * 3) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextminute % 10));
    //冒号
    drawDigit((5 + 4 * 1 + 7 * 4) * (1 + RADIUS) * 2 + ML, MT, 10);
    //秒钟
    drawDigit((6 + 4 * 2 + 7 * 4) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextsecond / 10));
    drawDigit((7 + 4 * 2 + 7 * 5) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextsecond % 10));

    //判断时间的变化，进行小球的添加
    if (parseInt(nextsecond % 10) != parseInt(cursecond % 10)) {
        addBalls((7 + 4 * 2 + 7 * 5) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextsecond % 10));
        if (parseInt(nextsecond / 10) != parseInt(cursecond / 10)) {
            addBalls((6 + 4 * 2 + 7 * 4) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextsecond / 10));
        }
        cursecond = nextsecond;
    }

    if (parseInt(nextminute % 10) != parseInt(curminute % 10)) {
        addBalls((4 + 4 * 1 + 7 * 3) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextminute % 10));
        if (parseInt(nextminute / 10) != parseInt(curminute / 10)) {
            addBalls((3 + 4 * 1 + 7 * 2) * (1 + RADIUS) * 2 + ML, MT, parseInt(nextminute / 10));
        }
        curminute = nextminute;
    }

    if (parseInt(nexthour % 10) != parseInt(curhour % 10)) {
        addBalls((1 + 4 * 0 + 7 * 1) * (1 + RADIUS) * 2 + ML, MT, parseInt(nexthour % 10));
        if (parseInt(nexthour / 10) != parseInt(curhour / 10)) {
            addBalls((0 + 4 * 0 + 7 * 0) * (1 + RADIUS) * 2 + ML, MT, parseInt(nexthour / 10));
        }
        curhour = nexthour;
    }


    //绘制balls中落下的小球
    for (var i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = balls[i].color;
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI)
        ctx.fill();
    }

    //更新小球位置
    updateBall();

}


//添加特效小球的方法
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + (1 + RADIUS) * j * 2 + (1 + RADIUS),
                    y: y + (1 + RADIUS) * i * 2 + (1 + RADIUS),
                    g: 0.5 + Math.random(),
                    vx: 3.2 * Math.pow(-1, Math.ceil(Math.random() * 10)),
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)] // [0,10) floor => [0,9] 整数
                        // 'rgb('+parseInt(Math.random()*255)+', '+parseInt(Math.random()*255)+', '+parseInt(Math.random()*255)+')'
                }
                balls.push(aBall);
            }

        }
    }
}

//小球下落位置更新,删除画面外小球
function updateBall() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y > HEIGHT - RADIUS) {
            balls[i].y = HEIGHT - RADIUS;

            if (Math.abs(balls[i].vy) > 2) {
                balls[i].vy = -balls[i].vy * 0.5;
                balls[i].g = balls[i].g * 0.8;
            } else {
                balls[i].vy = 0;
                balls[i].g = 0;
            }
        }
    }
    //性能，删除画布外的小球
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x > -RADIUS && balls[i].x < WIDTH + RADIUS) {
            balls[cnt++] = balls[i]; //i始终大于等于cnt
        }
    }

    while (balls.length > cnt) {
        balls.pop();
    }


}


//绘制数字的function x，y表示绘制开始位置
function drawDigit(x, y, num) {
    ctx.fillStyle = "rgb(0,102,153)"
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + (1 + RADIUS) * j * 2 + (1 + RADIUS), y + (1 + RADIUS) * i * 2 + (1 + RADIUS), RADIUS, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}


//
setInterval(function() {
    draw();
}, 16);



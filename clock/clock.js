var can = document.getElementById("mycanvas");
var ctx = can.getContext("2d");
var height = can.height;
var width = can.width;
var r = 0.5 * width;
var rem = width / 200; //比例



function drawBackground() {
    ctx.save();
    //绘制外圈圆
    ctx.beginPath();
    ctx.translate(r, r);
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth * 0.5, 0, 2 * Math.PI, false)
    ctx.stroke();

    //绘制数字
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"
    ctx.font = 18 * rem + "px Arial";
    var clockNum = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
    clockNum.forEach(function(num, i) {
        var rad = 2 * Math.PI / 12 * i;
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(num, x, y);
    })

    //绘制60个小圆点
    for (var i = 0; i < 60; i++) {
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
        ctx.beginPath();
        if (i % 5 === 0) {
            ctx.fillStyle = "#000"
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = "#ccc"
            ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

function drawHour(hour, minute) {
    var hourRad = 2 * Math.PI / 12 * hour;
    var minRad = 2 * Math.PI / 12 * minute / 60;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(hourRad + minRad);
    ctx.lineCap = "round";
    ctx.lineWidth = 6 * rem;
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}


function drawMinute(minute) {
    var minRad = 2 * Math.PI / 60 * minute;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(minRad);
    ctx.lineCap = "round";
    ctx.lineWidth = 3 * rem;
    ctx.moveTo(0, 10 * rem);
    ctx.lineTo(0, -r + 30 * rem);
    ctx.stroke();
    ctx.restore();
}


function drawSecond(second) {
    var secRad = 2 * Math.PI / 60 * second;
    ctx.save();
    ctx.fillStyle = "#c14543"
    ctx.beginPath();
    ctx.rotate(secRad);
    ctx.moveTo(2 * rem, 20 * rem);
    ctx.lineTo(1, -r + 18* rem);
    ctx.lineTo(-1, -r + 18* rem);
    ctx.lineTo(-2 * rem, 20 * rem);
    ctx.fill();
    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.fillStyle = "white"
    ctx.arc(0, 0, 3* rem, 0, 2 * Math.PI, false);
    ctx.fill();
}

function draw() {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds()
    ctx.clearRect(0, 0, width, height);
    drawBackground();
  
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore(); //还原drawBackground()中改变的原点
}

draw();

setInterval(draw, 1000)

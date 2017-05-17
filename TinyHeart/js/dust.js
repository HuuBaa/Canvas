var dustPic = [];

for (var i = 0; i < 7; i++) {
    dustPic[i] = new Image();
    dustPic[i].src = "src/dust" + i + ".png";
}


var dustObj = function() {
    this.x = [];
    this.y = [];
    this.amp = [];
    this.NO = []; //选择用第几张图片
    this.alpha; //正弦函数使用的弧度
}

dustObj.prototype.num = 30;
dustObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.x[i] = Math.random() * canWidth;
        this.y[i] = Math.random() * canHeight;
        this.NO[i] = Math.floor(Math.random() * 7); //[0,7)
        this.amp[i] = 20 + Math.random() * 25;
    }
    this.alpha = 0;
}

dustObj.prototype.draw = function() {

    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    for (var i = 0; i < this.num; i++) {
        ctx1.drawImage(dustPic[this.NO[i]], this.x[i] + l * this.amp[i], this.y[i])
    }


}

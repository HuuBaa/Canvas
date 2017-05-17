var waveObj = function() {
    this.x = [];
    this.y = [];
    this.r = [];
    this.alive = [];
}
waveObj.prototype.num = 15;

waveObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.r[i] = 0;
    }
}

waveObj.prototype.draw = function() {
    ctx1.save();
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "white";
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.r[i] += deltaTime * 0.03;
            if (this.r[i] > 40) {
                this.alive[i] = false;
                continue;
            }
            ctx1.beginPath();
            var alpha = 1 - this.r[i] / 40;
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, 2 * Math.PI)
            ctx1.closePath(); 
            ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")"
            ctx1.stroke();

        }
    }
    ctx1.restore();
}

waveObj.prototype.born = function(x, y) { //遍历寻找可用的物体
    for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
            this.alive[i] = true;
            this.x[i] = x;
            this.y[i] = y;
            this.r[i] = 10;
            return;
        }
    }

}

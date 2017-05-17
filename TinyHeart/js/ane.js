var aneObj = function() {
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];//摆动幅度
    this.alpha = 0;
}

aneObj.prototype.num = 50;

aneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.rootx[i] = i * 16 + 20 * Math.random();
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - (200 + 50*Math.random()) 
        this.amp[i] = 40+50*Math.random()
        }

};

aneObj.prototype.draw = function() {
    this.alpha += deltaTime*0.0008;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.strokeStyle = "#3b154e";
    ctx2.lineWidth = "20";
    ctx2.lineCap = "round";
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l*this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-80,this.headx[i] , this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};

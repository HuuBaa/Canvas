var fruitObj = function() {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.aneNum = [];
    this.l = [];
    this.spd = [];
    this.fruitType = [];
    this.blueFruit = new Image();
    this.orangeFruit = new Image();
}
fruitObj.prototype.num = 30;

fruitObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.aneNum[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003;
        this.fruitType[i] = "";

    }

    this.blueFruit.src = "src/blue.png";
    this.orangeFruit.src = "src/orange.png";
}
fruitObj.prototype.draw = function() {
        for (var i = 0; i < this.num; i++) {

            if (this.alive[i]) {
                if (this.fruitType[i] == "blue") {
                    var pic = this.blueFruit;
                } else {
                    var pic = this.orangeFruit;

                }

                if (this.l[i] <= 14) {
                    var No = this.aneNum[i]
                    this.l[i] += deltaTime * this.spd[i];
                    this.x[i] = ane.headx[No];
                    this.y[i] = ane.heady[No];
                } else {
                    this.y[i] -= deltaTime * this.spd[i] * 7;
                }
                ctx2.drawImage(pic, this.x[i] - 0.5 * this.l[i], this.y[i] - 0.5 * this.l[i], this.l[i], this.l[i])
                if (this.y[i] < -10) {
                    this.alive[i] = false;
                }
            }
        }
    }
    //寻找出生位置,设置成长速度
fruitObj.prototype.born = function(i) {
    this.aneNum[i] = Math.floor(50 * Math.random());
    this.l[i] = 0;
    fruit.alive[i] = true;
    var ranType = Math.random();
    if (ranType < 0.2) {
        this.fruitType[i] = "blue";

    } else {
        this.fruitType[i] = "orange";

    }

}

fruitObj.prototype.dead = function(i) {
    this.alive[i] = false;
}

function fruitCount() {
    var count = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) count++;
    }
    if (count < 15) {
        sendFruit();
        return; //寻找一个未激活的fruit
    }

}

function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);
            return;
        }
    }
}

 var momTail = [];
 var momEye = [];

 var momBodyblue = [];
 var momBodyorange = [];

 for (var i = 0; i < 8; i++) {
     momTail[i] = new Image();
     momTail[i].src = "src/bigTail" + i + ".png";
 }

 for (var i = 0; i < 2; i++) {
     momEye[i] = new Image();
     momEye[i].src = "src/bigEye" + i + ".png";
 }

 for (var i = 0; i < 8; i++) {
     momBodyblue[i] = new Image();
     momBodyorange[i] = new Image();
     momBodyblue[i].src = "src/bigSwimBlue" + i + ".png";
     momBodyorange[i].src = "src/bigSwim" + i + ".png";
 }



 var momObj = function() {
     this.x;
     this.y;
     this.angle;

     this.tailCount = 0;
     this.tailTimer = 0;

     this.eyeCount = 0;
     this.eyeTimer = 0;
     this.eyeInterval = 1000; //眨眼间隔时间不同

     this.bodyCount = 0;
     this.bodyTimer = 0;

 }

 momObj.prototype.init = function() {
     this.x = canWidth * 0.5;
     this.y = canHeight * 0.5;
     this.angle = 0;

 }

 momObj.prototype.draw = function() {

     this.x = lerpDistance(mx, this.x, 0.97);
     this.y = lerpDistance(my, this.y, 0.97);

     var deltaY = my - this.y;
     var deltaX = mx - this.x;
     var beat = Math.atan2(deltaY, deltaX) + Math.PI;

     this.angle = lerpAngle(beat, this.angle, 0.6);


     this.tailTimer += deltaTime;
     if (this.tailTimer > 50) {
         this.tailCount = (this.tailCount + 1) % 7;
         this.tailTimer %= 50;
     }

     this.eyeTimer += deltaTime;
     if (this.eyeTimer > this.eyeInterval) {
         this.eyeCount = (this.eyeCount + 1) % 2;
         this.eyeTimer %= this.eyeInterval;
         if (this.eyeCount == 0) {
             this.eyeInterval = Math.random() * 1500 + 2000;
         } else {
             this.eyeInterval = 200;
         }
     }

     ctx1.save();
     ctx1.translate(this.x, this.y)
     ctx1.rotate(this.angle);
     ctx1.drawImage(momTail[this.tailCount], -0.5 * momTail[this.tailCount].width + 30, -0.5 * momTail[this.tailCount].height);

     if (data._double == 1) {
         ctx1.drawImage(momBodyorange[this.bodyCount], -0.5 * momBodyorange[this.bodyCount].width, -0.5 * momBodyorange[this.bodyCount].height);
     } else {
         ctx1.drawImage(momBodyblue[this.bodyCount], -0.5 * momBodyblue[this.bodyCount].width, -0.5 * momBodyblue[this.bodyCount].height);
     }



     ctx1.drawImage(momEye[this.eyeCount], -0.5 * momEye[this.eyeCount].width, -0.5 * momEye[this.eyeCount].height);


     ctx1.restore();
 }

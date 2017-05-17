 var babyTail = [];
 var babyEye = [];
 var babyBody = [];

 for (var i = 0; i < 8; i++) {
     babyTail[i] = new Image();
     babyTail[i].src = "src/babyTail" + i + ".png";
 }

 for (var i = 0; i < 2; i++) {
     babyEye[i] = new Image();
     babyEye[i].src = "src/babyEye" + i + ".png";
 }

 for (var i = 0; i < 20; i++) {
     babyBody[i] = new Image();
     babyBody[i].src = "src/babyFade" + i + ".png";
 }

 var babyObj = function() {
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

 babyObj.prototype.init = function() {
     this.x = canWidth * 0.5 - 50;
     this.y = canHeight * 0.5 + 50;
     this.angle = 0;
 }

 babyObj.prototype.draw = function() {

     this.x = lerpDistance(mom.x, this.x, 0.97);
     this.y = lerpDistance(mom.y, this.y, 0.97);

     var deltaY = mom.y - this.y;
     var deltaX = mom.x - this.x;
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



     this.bodyTimer += deltaTime;
     if (this.bodyTimer > 300) {
         this.bodyCount += 1;
         if (this.bodyCount > 19) {
             this.bodyCount = 19;  //game over
             data.gameOver = true;
         }

         this.bodyTimer %= 300;
     }



     ctx1.save();
     ctx1.translate(this.x, this.y)
     ctx1.rotate(this.angle);
     ctx1.drawImage(babyTail[this.tailCount], -0.5 * babyTail[this.tailCount].width + 20, -0.5 * babyTail[this.tailCount].height);
     ctx1.drawImage(babyBody[this.bodyCount], -0.5 * babyBody[this.bodyCount].width, -0.5 * babyBody[this.bodyCount].height);
     ctx1.drawImage(babyEye[this.eyeCount], -0.5 * babyEye[this.eyeCount].width, -0.5 * babyEye[this.eyeCount].height);

     ctx1.restore();
 }

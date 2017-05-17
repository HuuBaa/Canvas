function eatFruit() {

    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                if (calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y) < 900) {
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.bodyCount++;
                    if (mom.bodyCount > 7) {
                        mom.bodyCount = 7;
                    }
                    if (fruit.fruitType[i] == "blue") {
                        data._double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }

}


function feedBaby() {
    if (data.fruitNum > 0 && !data.gameOver) {
        if (calLength2(baby.x, baby.y, mom.x, mom.y) < 900) {
            //大鱼有吃水果才能救小鱼
            baby.bodyCount = 0;
            mom.bodyCount = 0;
            halo.born(baby.x, baby.y);
            data.addScore();

        }
    }
}

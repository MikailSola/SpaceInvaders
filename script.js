var [px, py, pvx] = [410, 675, 0];
var bullets = [];
var fire

function setup() {
    createCanvas(920, 720);
}

function draw() {
    background(0);

    fill(0, 255, 0);
    rect(px, py, 50, 10);
    if (px > 850) {
        px = 850
    } else if (px < 20) {
        px = 20;
    } else {
        px = px - pvx
    }



    for (var i = 0; i < bullets.length; i++) {
        bullets[i].show();
        bullets[i].move();
        for (var j = 0; j < invaders.length; j++) {
            if (bullets[i].hits(invaders[j])) {
                invaders[j].grow();
                bullets[i].evaporate();
            }
        }
    }
}

function keyPressed() {
    switch(keyCode) {
        case 37:
            pvx = 8;
            break;
        case 39:
            pvx = -8;
            break;
        case 32:
            var bullet = new Bullet(px, py, 3, false);
            bullets.push(bullet);
            console.log(bullets)
            break;
    }
}

function keyReleased() {
    switch(keyCode) {
        case 37:
            pvx = 0;
            break;
        case 39:
            pvx = 0;
            break;
    }
}


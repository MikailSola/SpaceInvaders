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


    for (var i = bullets.length-1; i >= 0; i--) {
        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
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
            var bullet = new Bullet(px, height);
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


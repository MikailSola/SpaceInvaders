var [px, py, pvx] = [410, 675, 0];
var bullets = [];
var fire;

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

    console.log(bullets);

    bullets.forEach((b) =>{
        b.move();
        b.draw();
    });   
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


var [px, py, pvx] = [410, 675, 0];

class Player {
        constructor(name, x, y, vx, height, width) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.height = height;
        this.width = width;
    }
}

// class Enemy {
//     constructor(height, width, )
// }

// class Bullet {
//  confirm
// }

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
}

function keyPressed() {
    switch(keyCode) {
        case 37:
            pvx = 8;
            break;
        case 39:
            pvx = -8;
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


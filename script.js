var ship
var aliens = [];
var bullets = [];

function preload() {
    invader1a = loadImage('images/invader1a.png');
    invader1b = loadImage('images/invader1b.png');
}

function setup() {
    createCanvas(920, 720);
    ship = new Ship();
    for (var i = 0; i < 9; i++) {
        var alien
        alien = new Alien((i*70)+80, 60, invader1b);
        aliens.push(alien);
    } for (var i = 0; i < 9; i++) {
        var alien
        alien = new Alien((i*70)+80, 120, invader1a);
        aliens.push(alien);
    } 
}

function draw() {
    background(0);
    ship.draw();

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].draw();
        bullets[i].move();
        for (var j = 0; j < aliens.length; j++) {
            if (bullets[i].collision(aliens[j])) {
                aliens[j].destroy();
                bullets[i].destroy();
            }
        }
    }

    for (var i = 0; i < aliens.length; i++) {
        aliens[i].draw();
        aliens[i].move();
    }

    for (var i = bullets.length-1; i >= 0; i--) {
        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
        }
    }

    for (var i = aliens.length-1; i >= 0; i--) {
        if (aliens[i].toDelete) {
            aliens.splice(i, 1);
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        var bullet = new Bullet(ship.x, 690);
        bullets.push(bullet);
    }

    if (keyCode === LEFT_ARROW) {
        ship.move(-1);
    } else if (keyCode === RIGHT_ARROW) {
        ship.move(1);
    }
}
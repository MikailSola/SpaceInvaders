var ship
var shipv
var menu
var gamestate = 0; // 0 = start, 1 = game, 2 = win, 3 = gameover
var aliens = [];
var alienBullets = [];
var bullets = [];
var walls = [];
var randomDelay;

function preload() {
    imgInvader1a = loadImage('images/invader1a.png');
    imgInvader1b = loadImage('images/invader1b.png');
    imgPlay = loadImage('images/play.png');
    imgWall = loadImage('images/wall.png');
    imgLose = loadImage('images/youlose.png');
    imgWin = loadImage('images/youwin.png');
}

function setup() {
    createCanvas(920, 720);
    ship = new Ship();
    for (var i = 0; i < 9; i++) {
        var alien;
        alien = new Alien((i * 70) + 80, 60, imgInvader1b);
        aliens.push(alien);
    } for (var i = 0; i < 9; i++) {
        var alien;
        alien = new Alien((i * 70) + 80, 120, imgInvader1a);
        aliens.push(alien);
    } for (var i = 0; i < 4; i++) {
        var wall;
        wall = new Wall((i * 200) + 160, 600);
        walls.push(wall);
    }
}

function draw() {
    background(0);
    if (gamestate == 0) {
        menu();
    } else if (gamestate == 1) {
        game();
    } else if (gamestate == 2) {
        win();
    } else if (gamestate == 3) {
        gameover();
    }
}

function randomAlien() {
    var random = aliens[Math.floor(Math.random() * aliens.length)];
    alienBullet = new AlienBullet(random.x, random.y);
    alienBullets.push(alienBullet);
}



function menu() {
    imageMode(CENTER);
    image(imgPlay, 460, 340, 400, 100);
}

function win() {
    imageMode(CENTER);
    image(imgWin, 460, 340, 416, 416);
}

function gameover() {
    imageMode(CENTER);
    image(imgLose, 460, 340, 500, 500);
}

function game() {
    ship.draw();

    if (aliens != []) {
        if (frameCount % 20 == 0) {
            randomAlien();
        }
    }


    if (keyIsDown(LEFT_ARROW)) {
        ship.move(-5);
    }

    if (keyIsDown(RIGHT_ARROW)) {
        ship.move(5);
    }

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].draw();
        bullets[i].move();
        for (var j = 0; j < aliens.length; j++) {
            if (bullets[i].collision(aliens[j])) {
                aliens[j].destroy();
                bullets[i].destroy();
            }
        } for (var j = 0; j < walls.length; j++) {
            if (bullets[i].collision(walls[j])) {
                walls[j].destroy();
                bullets[i].destroy();
            }
        }
    }

    for (var i = 0; i < aliens.length; i++) {
        aliens[i].draw();
        aliens[i].move();
    }

    for (var i = 0; i < walls.length; i++) {
        walls[i].draw();
    }

    for (var i = 0; i < alienBullets.length; i++) {
        alienBullets[i].draw();
        alienBullets[i].move();
        for (var j = 0; j < walls.length; j++) {
            if (alienBullets[i].collision(walls[j])) {
                walls[j].destroy();
                alienBullets[i].destroy();
            }
        } if (alienBullet.collision(ship)) {
            gamestate = 3;
        }
    }

    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
        }
    }

    for (var i = alienBullets.length - 1; i >= 0; i--) {
        if (alienBullets[i].toDelete) {
            alienBullets.splice(i, 1);
        }
    }

    for (var i = aliens.length - 1; i >= 0; i--) {
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

    if (keyCode === 13) {
        gamestate = 1;
    }
}
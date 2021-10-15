var ship
var shipv
var song;
var currentSong;
var songplay = 0;
var gamestate = 0; // 0 = start, 1 = game, 2 = win, 3 = gameover, 4 = menu
var aliens = [];
var alienBullets = [];
var bullets = [];
var walls = [];

function preload() {
    // IMAGES
    imgInvader1a = loadImage('images/invader1a.png');
    imgInvader1b = loadImage('images/invader1b.png');
    imgPlay = loadImage('images/play.png');
    imgMenu = loadImage('images/menu.png');
    imgBG = loadImage('images/bg.png');
    imgWall = loadImage('images/wall.png');
    imgLose = loadImage('images/youlose.png');
    imgWin = loadImage('images/youwin.png');
    imgShip = loadImage('images/ship.png');

    // SOUNDS
    gameSong = loadSound('sounds/song.mp3');
    menuSong = loadSound('sounds/menusong.mp3');
    startupSong = loadSound('sounds/startup.mp3');
    victorySong = loadSound('sounds/victory.mp3');
    gameoverSong = loadSound('sounds/gameover.mp3');
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
    if (gamestate === 0) {
        start();
    } else if (gamestate === 1) {
        game();
    } else if (gamestate === 2) {
        win();
    } else if (gamestate === 3) {
        gameover();
    } else if (gamestate === 4) {
        menu();
    }
}

function randomAlien() {
    var random = aliens[Math.floor(Math.random() * aliens.length)];
    alienBullet = new AlienBullet(random.x, random.y);
    alienBullets.push(alienBullet);
}

function start() {
    imageMode(CENTER);
    image(imgPlay, 460, 340, 400, 100);
    if (songplay != 1) {
        startupSong.play();
        currentSong = startupSong
        songplay = 1;
    }
}

function win() {
    imageMode(CENTER);
    image(imgWin, 460, 340, 416, 416);
    if (songplay === 3) {
        currentSong.stop();
        victorySong.play();
        currentSong = victorySong;
        currentSong.setVolume(0.3);
        songplay = 1;
    }
}

function gameover() {
    imageMode(CENTER);
    image(imgLose, 460, 340, 500, 500);
    if (songplay === 3) {
        currentSong.stop();
        gameoverSong.play();
        currentSong = gameoverSong;
        currentSong.setVolume(0.5);
        songplay = 1;
    }
}

function menu() {
    imageMode(CENTER);
    image(imgMenu, width / 2, height / 2, width, height + 2);
    if (songplay === 1) {
        currentSong.stop();
        menuSong.play();
        currentSong = menuSong;
        currentSong.setVolume(1);
        songplay = 2;
    }
}

function game() {
    image(imgBG, width / 2, height / 2, width, height + 2);
    ship.draw();
    if (songplay === 2) {
        currentSong.stop();
        gameSong.play();
        currentSong = gameSong;
        currentSong.setVolume(0.6);
        songplay = 3;
    }

    try {
        if (aliens != []) {
            if (frameCount % 20 == 0) {
                randomAlien();
            }
        }
    } catch (error) {
        gamestate = 2;
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
        for (var j = 0; j < walls.length; j++) {
            if (aliens[i].collision(walls[j])) {
                gamestate = 3;
            }
        }
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
        } if (alienBullets[i].collision(ship)) {
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
        if (bullets.length != 3) {
            var bullet = new Bullet(ship.x, 690);
            bullets.push(bullet);
        }
    }

    if (keyCode === 13) {
        if (gamestate === 0) {
            gamestate = 4;
        } else if (gamestate === 4) {
            gamestate = 1;
        } else if (gamestate === 2 || gamestate === 3) {
            gamestate = 4;
            aliens = [];
            alienBullets = [];
            bullets = [];
            walls = [];
            setup();
        }

    }
}
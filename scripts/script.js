var ship
var shipv
var song;
var currentSong;
var currentscore = 0;
var highscore = 0;
var time = 50;
var finaltime;
var timebonus = 0;
var songplay = 0;
var gamestate = 0; // 0 = start, 1 = game, 2 = win, 3 = gameover, 4 = menu
var aliens = [];
var alienBullets = [];
var bullets = [];
var walls = [];

function preload() {
    // IMAGES
    imgInvader1a = loadImage('media/images/invader1a.png');
    imgInvader1b = loadImage('media/images/invader1b.png');
    imgPlay = loadImage('media/images/play.png');
    imgMenu = loadImage('media/images/menu.png');
    imgBG = loadImage('media/images/bg.png');
    imgWall = loadImage('media/images/wall.png');
    imgLose = loadImage('media/images/youlose.png');
    imgWin = loadImage('media/images/youwin.png');
    imgShip = loadImage('media/images/ship.png');

    // SOUNDS
    gameSong = loadSound('media/sounds/song.mp3');
    menuSong = loadSound('media/sounds/menusong.mp3');
    startupSong = loadSound('media/sounds/startup.mp3');
    victorySong = loadSound('media/sounds/victory.mp3');
    gameoverSong = loadSound('media/sounds/gameover.mp3');
    shootSFX = loadSound('media/sounds/shoot.mp3');
    alienSFX = loadSound('media/sounds/aliendead.mp3')

    // FONT 
    customFont = loadFont('media/pressstart.otf');
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
    if (timebonus === 0) {
        finaltime = time;
        timebonus = 1;
    }
    textFont(customFont);
    fill(255, 255, 255);
    textAlign(CENTER);
    textSize(20);
    let c = currentscore.toString();
    let h = highscore.toString();
    let t = finaltime.toString();
    text("Timebonus: " + (t) + " x 10 = " + (t * 10), width / 2, (height / 2) + 100);
    if (timebonus === 1) {
        currentscore = currentscore + (finaltime * 10);
        timebonus = 2;
    }
    if (currentscore > highscore) {
        highscore = currentscore;
    }
    text("Score: " + (c), width / 2, (height / 2) + 140);
    text("Highscore: " + (h), width / 2, (height / 2) + 180);
    textSize(12);
    text("Press enter to continue!", width / 2, height - 50);
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

    textAlign(CENTER);
    textFont(customFont);
    fill(255, 255, 255);
    textSize(20);
    let c = currentscore.toString();
    let h = highscore.toString();
    let t = time.toString();
    text("Score: " + (c), width / 2, (height / 2) + 100);
    text("Highscore: " + (h), width / 2, (height / 2) + 140);
    textSize(12);
    text("Press enter to return to menu!", width / 2, height - 50);
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

function score() {
    textAlign(LEFT);
    textFont(customFont);
    fill(255, 255, 255);
    textSize(12);
    let c = currentscore.toString();
    let h = highscore.toString();
    let t = time.toString();
    text("Score: " + (c), 20, 25);
    text("Highscore: " + (h), 20, 45);
    text("Time: " + (t), 20, 75)
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

    if (frameCount % 60 == 0) {
        time = time - 1;
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
            alienSFX.setVolume(0.3);
            alienSFX.play();
            currentscore = currentscore + 100;
            if (currentscore > highscore) {
                highscore = currentscore;
            }
        }
    }

    score();
}

function keyPressed() {
    if (key === ' ') {
        if (bullets.length != 3) {
            var bullet = new Bullet(ship.x, 690);
            bullets.push(bullet);
            shootSFX.setVolume(0.3);
            shootSFX.play();
        }
    }

    if (keyCode === 13) {
        if (gamestate === 0) {
            gamestate = 4;
        } else if (gamestate === 4) {
            gamestate = 1;
        } else if (gamestate === 2 || gamestate === 3) {
            if (gamestate === 3) {
                currentscore = 0;
                gamestate = 4;
            } else {
                gamestate = 1;
                songplay = 2;
            }

            aliens = [];
            alienBullets = [];
            bullets = [];
            walls = [];
            time = 50;
            timebonus = 0;

            setup();
        }

    }
}
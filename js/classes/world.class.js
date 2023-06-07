class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    statusbarEndboss = new StatusbarEndboss();
    statusBottles = new StatusBottles();
    statusCoins = new StatusCoins();
    throwableObject = [];
    endbossAlreadySeen = false;
    indexOfLastThrownBottle = 0;
    bottleHit = false;
    bottles = 5;
    coins = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawWorld();
        this.setWorld();
        this.run();
        this.checkCharacterLocation();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkIfJumpedOnEnemy();
            if (world.throwableObject.length > 0) {
                this.checkBottleCollision();
            }
            this.checkThrowObject();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
        }, 1000 / 60);

        setInterval(() => {
            this.checkCollision();
        }, 200);
    }

    checkCharacterLocation() {
        const indexOfEndboss = this.level.enemies.length - 1;
        const endboss = this.level.enemies[indexOfEndboss];
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (enemy !== endboss) {
                    this.enemyFollowChar(enemy);
                }
            });
            this.endbossFollowChar(endboss);
        }, 50);
    }

    enemyFollowChar(enemy) {
        if (this.character.x > enemy.x) {
            enemy.speed = -0.5 + Math.random() * 0.25;
            enemy.otherDirection = true;
        } else {
            enemy.otherDirection = false;
            enemy.speed = 0.5 + Math.random() * 0.25;
        }
    }

    endbossFollowChar(endboss) {
        if (this.character.x > endboss.x) {
            endboss.speed = -0.025;
            endboss.otherDirection = true;
        } else {
            endboss.otherDirection = false;
        }
    }

    checkThrowObject() {
        if (this.keyboard.throwing && this.bottles > 0 && this.throwableObject.length < 1) {
            let bottle = new ThrowableObject(this.character.hitX, this.character.hitY);
            this.throwableObject.push(bottle);
            this.bottles--;
        }

        if (this.keyboard.throwing && this.bottles > 0 && this.throwableObject[this.indexOfLastThrownBottle].speedY < -30) {
            let bottle = new ThrowableObject(this.character.hitX, this.character.hitY);
            this.throwableObject.push(bottle);
            this.bottles--;
            this.indexOfLastThrownBottle++;
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy, indexOfChicken) => {
            if (this.character.isColliding(enemy) && this.character.energy > 0 && indexOfChicken < this.level.enemies.length - 1 && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
                console.log(this.character.energy);
            }
            if (this.character.isColliding(enemy) && this.character.energy > 0 && enemy instanceof Endboss) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
                console.log(this.character.energy);
            }
        });
    }

    checkIfJumpedOnEnemy() {
        this.level.enemies.forEach((enemy, indexOfChicken) => {
            if (indexOfChicken < this.level.enemies.length - 1) {
                if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                    this.level.enemies.splice(indexOfChicken, 1);
                    this.character.jump();
                }
            }
        });
    }

    checkBottleCollision() {
        this.level.enemies.forEach((enemy, indexOfChicken) => {
            let lastBottle = world.throwableObject.length - 1;
            let indexOfEndboss = world.level.enemies.length - 1;
            let endboss = world.level.enemies[indexOfEndboss];
            if (world.throwableObject[lastBottle].bottleIsColliding(enemy) && indexOfChicken < indexOfEndboss) {
                this.bottleHit = true;
                this.level.enemies.splice(indexOfChicken, 1);
                console.log("bottleHit", lastBottle);
            }
            if (world.throwableObject[lastBottle].bottleIsColliding(enemy) && enemy instanceof Endboss) {
                if (enemy.energy > 0 && !endboss.isHurt()) {
                    enemy.hit();
                    this.bottleHit = true;
                    console.log(enemy.energy);
                    this.statusbarEndboss.setPercentage(enemy.energy);
                }
                else {
                    enemy.isDead();
                }
            }
        });

    }

    checkCollectingBottles() {
        this.level.collactableBottles.forEach((cB, indexOfBottle) => {
            if (this.character.isColliding(cB)) {
                this.level.collactableBottles.splice(indexOfBottle, 1);
                this.bottles++;
            }
        });
    }

    checkCollectingCoins() {
        this.level.collactableCoins.forEach((cC, indexOfCoin) => {
            if (this.character.isColliding(cC)) {
                this.level.collactableCoins.splice(indexOfCoin, 1);
                this.coins++;
            }
        });
    }

    /**
         * drawWorld() always repeating
         * requestAnimationFrame = FPS of computing power
         */
    drawWorld() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);

        this.addObjectsToMap(this.level.collactableBottles);

        this.addObjectsToMap(this.level.collactableCoins);

        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.throwableObject);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusbar);

        if (this.character.x > 1700 || this.endbossAlreadySeen) {
            this.endbossAlreadySeen = true;
            this.addToMap(this.statusbarEndboss);
        }

        this.addToMap(this.statusBottles);

        this.addToMap(this.statusCoins);

        this.ctx.font = "40px zabars";

        this.ctx.fillStyle = "white";

        this.ctx.fillText(`${this.bottles}`, 70, 120);

        this.ctx.fillText(`${this.coins}`, 185, 120);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
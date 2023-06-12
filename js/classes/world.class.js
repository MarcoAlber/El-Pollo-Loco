/** Class representing the world of the game */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    sounds;
    camera_x = 0;
    statusbar = new Statusbar();
    statusbarEndboss = new StatusbarEndboss();
    statusBottles = new StatusBottles();
    statusCoins = new StatusCoins();
    throwableObject = [];
    endbossAlreadySeen = false;
    endbossIsDead = false;
    indexOfLastThrownBottle = 0;
    bottleHit = false;
    bottles = 5;
    coins = 0;
    dead_chicken_sound = sounds[0];
    collecting_coin_sound = sounds[8];
    chicken_song_sound = sounds[10];

    /**
     * loads the world into the canvas and draws the world constantly new
     * @param {container} canvas = canvas which project the game
     * @param {Class} keyboard = sets the pressable keys
     * @param {Array} sounds = [audio, audio, ...]
     */
    constructor(canvas, keyboard, sounds) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.sounds = sounds;
        this.drawWorld();
        this.setWorld();
        this.run();
        this.checkCharacterLocation();
        this.chicken_song_sound.play();
    }

    /** sets the world around the character */
    setWorld() {
        this.character.world = this;
    }

    /** runs the game and checks for collisions */
    run() {
        setInterval(() => {
            if (world.throwableObject.length > 0) {
                this.checkBottleCollision();
            }
            this.checkIfJumpedOnEnemy();
            this.checkThrowObject();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
            this.checkCollision();
        }, 1000 / 60);
    }

    /** checks if character is infront or behind an enemy */
    checkCharacterLocation() {
        let indexOfEndboss = this.level.enemies.length - 1;
        let endboss = this.level.enemies[indexOfEndboss];
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (enemy !== endboss) {
                    this.enemyFollowCharacter(enemy);
                }
            });
            this.endbossFollowCharacter(endboss);
        }, 50);
    }

    /**
     * enemy follows the character if character is infront or behind enemy
     * @param {Object} enemy = small chicken or chicken
     */
    enemyFollowCharacter(enemy) {
        if (this.character.x > enemy.x && !enemy.chickenIsDead) {
            this.characterInfrontEnemy(enemy);
        }
        else if (this.character.x + 10 > enemy.x &&
            this.character.x - 10 < enemy.x && !enemy.chickenIsDead) {
            this.characterIsCollidingWithEnemy(enemy);
        }
        else if (enemy.chickenIsDead) {
            enemy.speed = 0;
        }
        else {
            this.enemyInfrontCharacter(enemy);
        }
    }

    /**
     * enemy follows the character if character is infront enemy
     * @param {Object} enemy = small chicken or chicken
     */
    characterInfrontEnemy(enemy) {
        enemy.speed = -0.5 + Math.random() * 0.25;
        enemy.otherDirection = true;
    }

    /**
     * enemy stops walking if it is colliding with character
     * @param {Object} enemy = small chicken or chicken
     */
    characterIsCollidingWithEnemy(enemy) {
        enemy.speed = 0;
        enemy.otherDirection = true;
        enemy.loadImage(enemy.images_walking[2]);
    }

    /**
     * enemy turns if character is behind enemy and walks in opposite direction
     * @param {Object} enemy = small chicken or chicken
     */
    enemyInfrontCharacter(enemy) {
        enemy.otherDirection = false;
        enemy.speed = 0.5 + Math.random() * 0.25;
    }

    /**
     * endboss walks in direction of character if he is infront or behind endboss
     * @param {Object} endboss = endboss
     */
    endbossFollowCharacter(endboss) {
        if (this.character.x > endboss.x) {
            endboss.speed = -0.025;
            endboss.otherDirection = true;
        }
        else {
            endboss.otherDirection = false;
        }
    }

    /** throws bottle only if character or endboss is alive and last bottle hitted already the ground */
    checkThrowObject() {
        if (!this.character.isDead() && !world.endbossIsDead) {
            if (this.keyboard.throwing && this.bottles > 0 && this.throwableObject.length < 1) {
                this.throwFirstBottle();
            }
            if (this.keyboard.throwing && this.bottles > 0 &&
                this.throwableObject[this.indexOfLastThrownBottle].speedY < -30) {
                this.throwBottleAfterLastHitGround();
            }
        }
    }

    /** throws the first bottle */
    throwFirstBottle() {
        let bottle = new ThrowableObject(this.character.hitX, this.character.hitY);
        this.throwableObject.push(bottle);
        this.bottles--;
    }

    /** throws bottle after last bottle hitted already the ground */
    throwBottleAfterLastHitGround() {
        let bottle = new ThrowableObject(this.character.hitX, this.character.hitY);
        this.throwableObject.splice(this.indexOfLastThrownBottle, 1);
        this.throwableObject.push(bottle);
        this.bottles--;
    }

    /** checks if character collides with chickens or endboss */
    checkCollision() {
        this.level.enemies.forEach((enemy, indexOfChicken) => {
            if (this.characterCollidingWithChicken(enemy, indexOfChicken)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
            if (this.characterCollidingWithEndboss(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * if statement of character colliding with chicken
     * @param {Object} enemy = = small chicken or chicken
     * @param {number} indexOfChicken = index of collided chicken
     * @returns if character collided with chicken
     */
    characterCollidingWithChicken(enemy, indexOfChicken) {
        return this.character.isColliding(enemy) && this.character.energy > 0 &&
            indexOfChicken < this.level.enemies.length - 1 &&
            !this.character.isAboveGround() && !enemy.chickenIsDead && !this.character.isHurt();
    }

    /**
     * if statement of character colliding with endboss
     * @param {Object} enemy = endboss
     * @returns if character collided with endboss
     */
    characterCollidingWithEndboss(enemy) {
        return this.character.isColliding(enemy) &&
            this.character.energy > 0 && enemy instanceof Endboss && !this.character.isHurt();
    }

    /** checks if character jumped on chicken or small chicken */
    checkIfJumpedOnEnemy() {
        this.level.enemies.forEach((enemy, indexOfChicken) => {
            if (indexOfChicken < this.level.enemies.length - 1) {
                if (this.character.isColliding(enemy) && this.character.isAboveGround() &&
                    this.character.speedY < 0 && !enemy.chickenIsDead) {
                    this.dead_chicken_sound.play();
                    this.killChicken(enemy);
                    this.character.jump();
                }
            }
        });
    }

    /** checks if bottle hitted small chicken || chicken || endboss */
    checkBottleCollision() {
        this.level.enemies.forEach((enemy, indexOfChicken) => {
            let lastBottle = this.throwableObject.length - 1;
            let indexOfEndboss = world.level.enemies.length - 1;
            let endboss = world.level.enemies[indexOfEndboss];
            if (this.bottleIsCollidingWithChicken(lastBottle, enemy, indexOfChicken, indexOfEndboss)) {
                this.bottleKilledChicken(enemy);
            }
            if (this.bottleIsCollidingWithEndboss(lastBottle, enemy)) {
                this.bottleHittedEndboss(enemy, endboss);
            }
        });
    }

    /**
     * if statement of bottle colliding with chickens
     * @param {number} lastBottle = index of last thrown bottle
     * @param {Object} enemy = small chicken or chicken
     * @param {number} indexOfChicken = index of chicken which got hitted by a bottle
     * @param {number} indexOfEndboss = index of enboss
     * @returns if bottle collided with small chicken or chicken
     */
    bottleIsCollidingWithChicken(lastBottle, enemy, indexOfChicken, indexOfEndboss) {
        return this.throwableObject[lastBottle].bottleIsColliding(enemy) &&
            indexOfChicken < indexOfEndboss;
    }

    /**
     * if statement of bottle colliding with endboss
     * @param {number} lastBottle = index of last thrown bottle
     * @param {Object} enemy = endboss
     * @returns if bottle collided with endboss
     */
    bottleIsCollidingWithEndboss(lastBottle, enemy) {
        return this.throwableObject[lastBottle].bottleIsColliding(enemy) &&
            enemy instanceof Endboss;
    }

    /**
     * kills chicken after it got hitted by a bottle
     * @param {Object} enemy = small chicken or chicken
     */
    bottleKilledChicken(enemy) {
        this.dead_chicken_sound.play();
        this.killChicken(enemy);
        this.bottleHit = true;
    }

    /**
     * hurts or kills endboss after it got hitted by a bottle
     * @param {Object} enemy = all enemies
     * @param {Object} endboss = endboss
     */
    bottleHittedEndboss(enemy, endboss) {
        if (enemy.energy > 0 && !endboss.isHurt()) {
            this.bottleHurtedEndboss(enemy);
        }
        if (enemy.energy <= 0) {
            this.bottleKilledEndboss(enemy);
        }
    }

    /**
     * hurts endboss after it got hitted by a bottle
     * @param {Object} enemy = endboss
     */
    bottleHurtedEndboss(enemy) {
        enemy.hit();
        this.bottleHit = true;
        this.statusbarEndboss.setPercentage(enemy.energy);
    }

    /**
     * kills endboss after it got hitted by a bottle
     * @param {Object} enemy = endboss
     */
    bottleKilledEndboss(enemy) {
        enemy.isDead();
        this.endbossIsDead = true;
    }

    /**
     * loads dead small chicken or chicken image
     * @param {Object} enemy = = small chicken or chicken
     */
    killChicken(enemy) {
        clearInterval(enemy.intervalID);
        enemy.chickenIsDead = true;
        enemy.loadImage(enemy.image_dead);
        setTimeout(() => {
            enemy.height = 0;
        }, 4000);
    }

    /** checks if character is colliding with collectable bottle */
    checkCollectingBottles() {
        this.level.collactableBottles.forEach((cB, indexOfBottle) => {
            if (this.character.isColliding(cB)) {
                this.level.collactableBottles.splice(indexOfBottle, 1);
                this.bottles++;
            }
        });
    }

    /** checks if character is colliding with collectable coin */
    checkCollectingCoins() {
        this.level.collactableCoins.forEach((cC, indexOfCoin) => {
            if (this.character.isColliding(cC)) {
                this.level.collactableCoins.splice(indexOfCoin, 1);
                this.coins++;
                this.collecting_coin_sound.play();
            }
        });
    }

    /** draws the world into the canvas */
    drawWorld() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addAllObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusbarsToMap();
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.renderWorld();
    }

    /** adds all objects into the world */
    addAllObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collactableBottles);
        this.addObjectsToMap(this.level.collactableCoins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
    }

    /** adds all statusbars into the world */
    addStatusbarsToMap() {
        this.addToMap(this.statusbar);
        if (this.character.x > 1700 || this.endbossAlreadySeen) {
            this.endbossAlreadySeen = true;
            this.addToMap(this.statusbarEndboss);
        }
        this.addToMap(this.statusBottles);
        this.addToMap(this.statusCoins);
        this.styleStatusbarText();
    }

    /** styles the statusbartext of the bottles and coins */
    styleStatusbarText() {
        this.ctx.font = "40px zabars";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`${this.bottles}`, 70, 120);
        this.ctx.fillText(`${this.coins}`, 185, 120);
    }

    /** renders the world and sets the FPS of computing power */
    renderWorld() {
        let self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    /**
     * adds all objects of the level to the world
     * @param {Object} objects = all objects of the level
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * loads the character and the statusbars into the world
     * @param {Object} mo = character and statusbars
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * flips character to left direction
     * @param {Object} mo = character
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * flips character to right direction
     * @param {Object} mo = character
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
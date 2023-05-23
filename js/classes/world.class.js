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
    bottles = 0;
    coins = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.drawWorld();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkCollectingBottles();
            this.checkCollectingCoins();
            this.checkThrowObject();
        }, 200);
    }

    checkThrowObject() {
        if (this.keyboard.throwing && this.bottles > 0) {
            let bottle = new ThrowableObject(this.character.hitX, this.character.hitY);
            this.throwableObject.push(bottle);
            this.bottles--;
        }
    }

    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.energy > 0) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
                this.statusbarEndboss.setPercentage(this.character.energy);
                console.log(this.character.energy);
            }
        });
    }

    checkCollectingBottles() {
        this.level.collactableBottles.forEach((cB) => {
            let indexOf = this.level.collactableBottles.indexOf(cB);
            if (this.character.isColliding(cB)) {
                this.level.collactableBottles.splice(indexOf, 1);
                this.bottles++;
                console.log(this.bottles);
            }
        });
    }

    checkCollectingCoins() {
        this.level.collactableCoins.forEach((cC) => {
            let indexOf = this.level.collactableCoins.indexOf(cC);
            if (this.character.isColliding(cC)) {
                this.level.collactableCoins.splice(indexOf, 1);
                this.coins++;
                console.log(this.coins);
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

        this.addObjectsToMap(this.throwableObject);

        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusbar);

        this.addToMap(this.statusbarEndboss);

        this.addToMap(this.statusBottles);

        this.addToMap(this.statusCoins);

        this.ctx.font = "40px zabars";

        this.ctx.fillStyle = "white";

        this.ctx.fillText("=", 60, 120);

        this.ctx.fillText(`${this.bottles}`, 80, 120);

        this.ctx.fillText("=", 180, 120);

        this.ctx.fillText(`${this.coins}`, 200, 120);

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
        mo.drawFrame(this.ctx);

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
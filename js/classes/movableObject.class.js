class MovableObject extends DrawableObject {
    speed = 0.125;
    otherDirection = false;
    chickenIsDead = false;
    speedY = 0;
    acceleration = 0.5;
    lastHit = 0;
    alreadySlept = false;
    lastMove = new Date().getTime();
    snoring_sound = sounds[9];

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.hitY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 43);
    }

    hit() {
        if (!world.endbossIsDead) {
            this.energy -= 10;
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    standingStill() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 2;
    }

    isDead() {
        return this.energy <= 0;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 125;
        }
    }

    moveLeftObjects() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    walkLeft() {
        this.alreadySlept = true;
        this.stopSound(this.snoring_sound);
        this.x -= this.speed;
        this.hitX -= this.speed;
        this.otherDirection = true;
        this.lastMove = new Date().getTime() + 500;
    }

    walkRight() {
        this.alreadySlept = true;
        this.stopSound(this.snoring_sound);
        this.x += this.speed;
        this.hitX += this.speed;
        this.otherDirection = false;
        this.lastMove = new Date().getTime() + 500;
    }


    jump() {
        this.alreadySlept = true;
        this.stopSound(this.snoring_sound);
        this.speedY = 14.5;
        this.currentImage = 0;
        this.lastMove = new Date().getTime() + 1500;
    }

    throw(throwDirection) {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            throwDirection;
        }, 25);

        setInterval(() => {
            if (world.bottleHit) {
                this.playAnimation(this.images_splash);
            }
            else {
                this.playAnimation(this.images_rotation);
            }
        }, 120);
    }

    throwBottleFront() {
        return setInterval(() => {
            this.x += 10;
        }, 25);
    }

    throwBottleBack() {
        return setInterval(() => {
            this.x -= 10;
        }, 25);
    }

    playAnimation(image) {
        this.alreadySlept = true;
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    sleepAnimation(image) {
        if (this.alreadySlept) {
            this.currentImage = 0;
            this.alreadySlept = false;
        }
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        if (i < 8) {
            this.currentImage++;
        }
        if (i >= 8) {
            this.currentImage++;
            this.snoring_sound.play();
        }
        if (i == image.length - 1) {
            this.currentImage = 8;
            this.currentImage % image.length;
        }
    }

    isColliding(mo) {
        return this.hitX + this.hitWidth > mo.x + mo.offset.left &&
            this.hitY + this.hitHeight > mo.y + mo.offset.top &&
            this.hitX < mo.x + mo.width - mo.offset.right &&
            this.hitY < mo.y + mo.height - mo.offset.bottom;
    }

    bottleIsColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}
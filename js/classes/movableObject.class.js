/** Class of an extension of DrawableObject representing a movable object */
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

    /** let the character jump */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.hitY -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    /** reduce the energy by 10 after a hit */
    hit() {
        if (!world.endbossIsDead) {
            this.energy -= 10;
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * checks if time of last hit is shorter than 1 sec ago
     * @returns if time is shorter than 1 sec ago
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * checks if time of last endboss hit is longer than 1.5 sec ago
     * @returns if time is longer than 1.5 sec ago
     */
    enbossLastHit() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed > 1.5;
    }

    /**
     * checks if time of last hit is longer than 2 sec ago
     * @returns if time is longer than 2 sec ago
     */
    standingStill() {
        let timepassed = new Date().getTime() - this.lastMove;
        timepassed = timepassed / 1000;
        return timepassed > 1;
    }

    /**
     * checks if character or endboss is dead
     * @returns if energy is 0 or lower
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
     * checks if all objects are above ground but not a throwable object
     * @returns if all objects y coordinate is smaller than 125 but not a throwable bottle
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 125;
        }
    }

    /** move object to the left side */
    moveLeftObjects() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /** move character to the left side */
    walkLeft() {
        this.alreadySlept = true;
        this.stopSound(this.snoring_sound);
        this.x -= this.speed;
        this.hitX -= this.speed;
        this.otherDirection = true;
        this.lastMove = new Date().getTime() + 500;
    }

    /** move character to the right side */
    walkRight() {
        this.alreadySlept = true;
        this.stopSound(this.snoring_sound);
        this.x += this.speed;
        this.hitX += this.speed;
        this.otherDirection = false;
        this.lastMove = new Date().getTime() + 500;
    }

    /** let character jump */
    jump() {
        this.alreadySlept = true;
        this.stopSound(this.snoring_sound);
        this.speedY = 14.5;
        this.currentImage = 0;
        this.lastMove = new Date().getTime() + 1500;
    }

    /**
     * throws bottle in current direction and checks for a hit
     * @param {interval} throwDirection = interval of x coordinate of bottle moving forward in current direction
     */
    throw(throwDirection) {
        this.speedY = 15;
        this.applyGravity();
        setInterval(() => {
            throwDirection;
        }, 25);
        setInterval(() => {
            this.checkBottleHit();
        }, 120);
    }

    /** change animation if bottle hits or not */
    checkBottleHit() {
        if (world.bottleHit) {
            this.playAnimation(this.images_splash);
        }
        else {
            this.playAnimation(this.images_rotation);
        }
    }

    /** throws bottle to right side */
    throwBottleFront() {
        return setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /** throws bottle to left side */
    throwBottleBack() {
        return setInterval(() => {
            this.x -= 10;
        }, 25);
    }

    /**
     * plays different animations
     * @param {array} image = array [img, img, ...]
     */
    playAnimation(image) {
        this.alreadySlept = true;
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * plays sleeping animations
     * @param {array} image = array [img, img, ...]
     */
    sleepAnimation(image) {
        if (this.alreadySlept) {
            this.setSleepToStartpoint();
        }
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.sleepingStartpoints(i, image);
    }

    /**
     * checks which sleeping image character currently is
     * @param {number} i = current image of sleeping animation
     * @param {array} image = array [img, img, ...]
     */
    sleepingStartpoints(i, image) {
        if (i < 8) {
            this.currentImage++;
        }
        if (i >= 8) {
            this.currentImage++;
            this.snoring_sound.play();
        }
        if (i == image.length - 1) {
            this.repeatSleeping(image);
        }
    }

    /** sets sleep image to first image */
    setSleepToStartpoint() {
        this.currentImage = 0;
        this.alreadySlept = false;
    }

    /**
     * after sleep animation finished starts again at image 8
     * @param {array} image = array [img, img, ...]
     */
    repeatSleeping(image) {
        this.currentImage = 8;
        this.currentImage % image.length;
    }

    /**
     * checks if character is colliding with a movable object
     * @param {Object} mo = enemies || collactable bottles || collactable coins
     * @returns true if character is colliding with a movable object
     */
    isColliding(mo) {
        return this.hitX + this.hitWidth > mo.x + mo.offset.left &&
            this.hitY + this.hitHeight > mo.y + mo.offset.top &&
            this.hitX < mo.x + mo.width - mo.offset.right &&
            this.hitY < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * checks if a bottle is colliding with a movable object
     * @param {Object} mo = enemies
     * @returns true if bottle is colliding with a movable object
     */
    bottleIsColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * stops a sound
     * @param {path} sound = path of audio
     */
    stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}
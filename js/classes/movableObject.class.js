class MovableObject extends DrawableObject {
    hitX = 80;
    hitY = 245;
    hitWidth = 86.41;
    hitHeight = 177.69;
    speed = 0.125;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.5;
    lastHit = 0;

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
        this.energy -= 10;
        this.lastHit = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
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
        this.x -= this.speed;
        this.hitX -= this.speed;
        this.otherDirection = true;
    }

    walkRight() {
        this.x += this.speed;
        this.hitX += this.speed;
        this.otherDirection = false;
    }

    jump() {
        this.speedY = 14.5;
        this.currentImage = 0;
    }

    playAnimation(image) {
        let i = this.currentImage % image.length;
        let path = image[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    isColliding(mo) {
        return this.hitX + this.hitWidth - mo.offset.right > mo.x + mo.offset.left &&
            this.hitY + this.hitHeight - mo.offset.bottom > mo.y + mo.offset.top &&
            this.hitX + mo.offset.left < mo.x + mo.width - mo.offset.right &&
            this.hitY + mo.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
}
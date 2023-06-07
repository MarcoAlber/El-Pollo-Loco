class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 50;
    y = 125;
    width = 610 / 3.9;
    height = 1200 / 3.9;
    hitX = this.x + 30;
    hitY = this.y + 120;
    hitWidth = this.width - 70;
    hitHeight = this.height - 130;
    energy = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr = [img, img,...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

   /* drawFrame(ctx) {
        if (this instanceof Character) {
            this.drawFramePath(ctx);
            ctx.rect(this.x + 30, this.y + 120, this.width - 70, this.height - 130);
            ctx.stroke();
        }
        else if (this instanceof Chicken || this instanceof BabyChicken || this instanceof CollactableBottles ||
            this instanceof ThrowableObject || this instanceof CollactableCoins || this instanceof Endboss) {
            this.drawFramePath(ctx);
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }*/

    /*drawFramePath(ctx) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
    }*/
}
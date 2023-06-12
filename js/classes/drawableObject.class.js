/** Class representing the drawable object/s which is loaded into the canvas */
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

    /**
     * loads a single image
     * @param {path} path = image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads an array of images
     * @param {array} arr = [img, img,...]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * draws the image/s into the canvas
     * @param {canvas} ctx = canvas.getContext('2d')
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
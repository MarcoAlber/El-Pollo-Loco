/** Class of an extension of MovableObject representing a background landscape */
class BackgroundObject extends MovableObject {
    width = 722;
    height = 482;
    y = 0;

    /**
     * loads the background into the canvas
     * @param {path} imagePath = path of the image
     * @param {number} x = x coordinate of the background
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
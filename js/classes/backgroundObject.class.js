class BackgroundObject extends MovableObject {
    width = 722;
    height = 482;
    y = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}
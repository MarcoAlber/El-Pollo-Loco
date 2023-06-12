/** Class of an extension of MovableObject representing a cloud */
class Cloud extends MovableObject {
    y = -20;
    height = 1080 / 3;
    width = 1920 / 3;

    /**
     * load the cloud into the canvas and let it slide to the left side
     * @param {number} cloud_x = x coordinate of a cloud
     */
    constructor(cloud_x) {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.x = cloud_x;
        this.animate();
    }

    /** animates a cloud slide to the left side */
    animate() {
        this.moveLeftObjects();
    }
}
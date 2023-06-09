class Cloud extends MovableObject {
    y = -20;
    height = 1080 / 3;
    width = 1920 / 3;

    constructor(cloud_x) {
        super().loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.x = cloud_x;
        this.animate();
    }

    animate() {
        this.moveLeftObjects();
    }
}
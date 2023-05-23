class Endboss extends MovableObject {
    images_walking = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    width = 1045 / 2.75;
    height = 1217 / 2.75;
    y = 25;
    offset = {
        top: 200,
        bottom: 0,
        left: 10,
        right: 50
    };

    constructor(positionX) {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.x = positionX;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 250);
    }
}
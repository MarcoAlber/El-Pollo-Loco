class Statusbar extends DrawableObject {

    images_health = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.images_health);
        this.x = 20;
        this.y = 20;
        this.width = 595 / 3;
        this.height = 158 / 3;
        this.setPercentage(this.energy);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.resolveImageIndex();
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return this.images_health[5];
        }
        else if (this.percentage > 80) {
            return this.images_health[4];
        }
        else if (this.percentage > 60) {
            return this.images_health[3];
        }
        else if (this.percentage > 40) {
            return this.images_health[2];
        }
        else if (this.percentage >= 20) {
            return this.images_health[1];
        }
        else if (this.percentage < 20) {
            return this.images_health[0];
        }
    }
}
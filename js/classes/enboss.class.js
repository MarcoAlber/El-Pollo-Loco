class Endboss extends MovableObject {
    images_walking = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    images_alert = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    images_attack = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    images_hurt = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    images_dead = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    width = 1045 / 2.75;
    height = 1217 / 2.75;
    y = 25;
    offset = {
        top: 100,
        bottom: 0,
        left: 40,
        right: 50
    };

    endboss_hurting_sound = sounds[6];
    endboss_dead_sound = sounds[7];

    constructor(positionX) {
        super().loadImage(this.images_alert[0]);
        this.loadImages(this.images_alert);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.x = positionX;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (world.endbossAlreadySeen) {
                this.playAnimation(this.images_walking);
                this.moveLeftObjects();
                this.speed = 0.025;
            }
            if (this.x + 300 > world.character.x && this.x - 50 < world.character.x) {
                this.playAnimation(this.images_attack);
                this.speed = 0;
            }
            else if (!world.endbossAlreadySeen) {
                this.playAnimation(this.images_alert);
            }
            if (this.isHurt()) {
                if (!world.endbossIsDead) {
                    this.endboss_hurting_sound.play();
                }
                this.playAnimation(this.images_hurt);
            }
            if (this.isDead()) {
                this.endboss_dead_sound.play();

                this.stopSound(world.chicken_song_sound);
                this.playAnimation(this.images_dead);
                this.speed = 0;
                setTimeout(() => {
                    clearAllIntervals();
                    document.getElementById('gameOverScreen').classList.remove('dp-none');
                    document.getElementById('startButton').innerHTML = '<span>Play again</span>';
                    document.getElementById('startButton').classList.remove('dp-none');
                }, 5000);
            }
        }, 250);
    }
}
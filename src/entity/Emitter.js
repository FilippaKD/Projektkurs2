class MyEmitter {
    constructor(stage, source, texture) {
        this.stage = stage;
        this.source = source;
        this.texture = texture;
        this.particles = [];
        this.timer = 0;
        this.delay = 50; 
    }

    update(step) {
        this.timer += step;

        if (this.timer >= this.delay) {
            this.timer = 0;
            this.emitParticle();
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;


            if (p.y > p.startY + 15) {
                this.stage.removeChild(p);
                this.particles.splice(i, 1);
            }
        }
    }

    emitParticle() {
        let startX = this.source.centerX - 4;
        let startY = this.source.y + this.source.height * 0.4;

        let p = new rune.display.Sprite(startX, startY, 2, 2, this.texture);

        p.alpha = 1;
        p.scaleX = 1;
        p.scaleY = 1;


        p.vx = (Math.random() - 0.5) * 0.4; 
        p.vy = Math.random() * 0.3 + 0.1;    
        p.vr = (Math.random() - 0.5) * 2;


        p.startY = startY;

        p.wobble = Math.random() * Math.PI * 2;

      
        this.stage.addChildAt(p, this.stage.getChildIndex(this.source));
        this.particles.push(p);
    }
}
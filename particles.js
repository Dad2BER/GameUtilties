class Particle {
    constructor(x, y, speedX, speedY, size, decay) {
        this.markedForDeletion = false;
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;
        this.decay = decay;
    }
    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= this.decay;
        if (this.size < 0.5){this.markedForDeletion=true;}
    }
}

export class Dust extends Particle {
    constructor(x, y) {
        super(x, y, Math.random(), Math.random(), Math.random() *10 + 10, 0.95);
        this.color = 'rgba(0,0,0,0.2)';
    }
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}

export class Splash extends Particle {
    constructor(x, y) {
        super(x, y, Math.random()*6 - 4, Math.random()*2 +1, Math.random() *100+100, 0.95)
        //Now that we are initialized, we are going to shift the initial x and y slightly
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.gravity = 0;
        this.image = document.getElementById('fire');
    }
    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(x, y) {
        super(x, y, 1, 1, Math.random()*100+50, 0.9);
        this.image = document.getElementById('fire');
        this.angle = 0;
        this.va = Math.random() * 0.2 - 0.1;
    }
    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }
    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size*0.5, -this.size*0.5, this.size, this.size);
        context.restore();
    }

}
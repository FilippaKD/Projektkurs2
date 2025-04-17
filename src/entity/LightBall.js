var LightBall = function (x, y, direction) {
    this.ball = new rune.display.Sprite(x, y, 8, 8, "sparkles");
    this.ball.velocity.x = direction.x * 4;
    this.ball.velocity.y = direction.y * 4;
    this.ball.hitbox.set(0, 0, 8, 8);
    this.isDead = false;
    
};

LightBall.prototype.update = function (step) {

    this.ball.x += this.ball.velocity.x;
    this.ball.y += this.ball.velocity.y;

    if (
        this.ball.x < -this.ball.width || this.ball.x > 400 + this.ball.width ||
        this.ball.y < -this.ball.height || this.ball.y > 225 + this.ball.height
    )  { 
        this.isDead = true;
    }

};

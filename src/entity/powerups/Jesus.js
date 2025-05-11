function Jesus() {

    this.screenWidth = this.application.screen.width;
    this.screenHeight = this.application.screen.height;


    var x = Math.floor(Math.random() * (this.screenWidth - 20));
    var y = Math.floor(Math.random() * (this.screenHeight - 20));


    Entity.call(this, "image_game_powerups_Jesus", x, y, 20, 20);
    this.makeAnimations();

    this.hitbox.set(5, 8, 8, 8);
    
}

Jesus.prototype = Object.create(Entity.prototype);
Jesus.prototype.constructor = Jesus;

Jesus.prototype.makeAnimations = function() {

   this.animation.create("idle", [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0], 6, true);
   this.animation.gotoAndPlay("idle");

};


Jesus.prototype.update = function(step) {
    Entity.prototype.update.call(this, step);
    var current = this.animation.current;

    if (current.name == "drop" && current.frameIndex == (current.frames.length - 1)) {
        this.parent.removeChild(this);
    }
};
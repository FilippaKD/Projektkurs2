
function Fairy(name, keyboard, x, y) {
    Entity.call(this, name, x, y, 32, 32);
    this.keyboard = keyboard;

    this.hitbox.set(8, 10, 15, 15);
    
    this.makeAnimations(); 
   
    
}

Fairy.prototype = Object.create(Entity.prototype);
Fairy.prototype.constructor = Fairy;

Fairy.prototype.makeAnimations = function() {
    this.animation.create("walk", [0, 1, 2, 3, 4, 3, 2, 1, 0], 6, true);
    this.animation.create("idle", [0, 1, 2, 3, 2, 1, 0], 6, true);
};





/*

function Fairy(name, keyboard, x, y) {
    Entity.call(this, name, x, y, 32, 32);
    this.keyboard = keyboard;
}

Fairy.prototype = Object.create(Entity.prototype);
Fairy.prototype.constructor = Fairy;

Fairy.prototype.makeAnimations = function() {
    this.animation.create("walk", [0, 1, 2, 3], 6, true);
    this.animation.create("idle", [0, 1, 0], 4, true);
};

function Fairy(name, keyboard, x, y) {
    this.keyboard = keyboard;
    this.player = new rune.display.Sprite(x, y, 32, 32, name);
    this.makeAnimations(); 
    
}

Fairy.prototype = Object.create(Entity.prototype);
Fairy.prototype.constructor = Fairy;

Fairy.prototype.makeAnimations = function() {
    this.player.animation.create("walk", [0, 1, 2, 3, 4, 3, 2, 1, 0], 6, true);
    this.player.animation.create("idle", [0, 1, 2, 3, 2, 1, 0], 6, true);
};
*/
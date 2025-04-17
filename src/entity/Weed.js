
function Weed(x, y) {
    Entity.call(this, "smallweed", x, y, 20, 20);
    
    this.hitbox.set(5, 5, 10, 10);

}

Weed.prototype = Object.create(Entity.prototype);
Weed.prototype.constructor = Weed;

Weed.prototype.update = function(step) {
    //går neråt
    this.y += 0.5;

    
};



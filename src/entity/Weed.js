
function Weed(direction, keyboard) {
    Entity.call(this, "smallweed", 20, 20);

    this.keyboard = keyboard;

    this.hitbox.set(5, 5, 10, 10);

    const canvasWidth = 400;  
    const canvasHeight = 225;
    
    if (direction === "north") {
        this.x = Math.random() * canvasWidth;
        this.y = 0;
    } else if (direction === "south") {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight;
    } else if (direction === "west") {
        this.x = 0;
        this.y = Math.random() * canvasHeight;
    } else if (direction === "east") {
        this.x = canvasWidth;
        this.y = Math.random() * canvasHeight;
    }

}

Weed.prototype = Object.create(Entity.prototype);
Weed.prototype.constructor = Weed;



Weed.prototype.update = function (step) {
   
    const centerX = 400 / 2;
    const centerY = 225 / 2;

    const dx = centerX - this.x;
    const dy = centerY - this.y;
    
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
        this.x += (dx / dist) * (step / 70);
        this.y += (dy / dist) * (step / 70);
    }

};





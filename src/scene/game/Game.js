//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
projektkurs2.scene.Game = function () {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
projektkurs2.scene.Game.prototype.constructor = projektkurs2.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);


    this.lightballs = [];
    // kolla om gamepads är connected
    console.log(this.gamepads.numGamepads)

    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    var bg = new rune.display.Graphic(0, 0, 400, 225, "bg");
    bg.autoSize = true;
    bgContainer.addChild(bg);


    this.sol = new Sol();
    this.filippa = new Filippa();

    this.fairies = []; // Alla älvor
    this.fairies.push(this.sol, this.filippa);

    this.stage.addChild(this.sol);
    this.stage.addChild(this.filippa);

    bgContainer.addChild(this.sol.emitter);
    bgContainer.addChild(this.filippa.emitter);

    /*
    this.flower = new Flower();
    this.stage.addChild(this.flower);
    */
    
    this.initFlower();

    this.initWaterdropplet();


    this.weeds = []; // Alla aktiva ogräs
    this.spawnTimer = 0;

    this.score = 0;

    console.log(this.groups)

    this.initThorns();

    

};


projektkurs2.scene.Game.prototype.initWaterdropplet = function () {

    this.waterdropplets = new rune.display.DisplayGroup(this.stage);

    this.timers.create({
        duration: 5000,
        repeat: Infinity,
        onTick: function () {
            this.waterdropplet = new Waterdropplet();
            this.stage.addChild(this.waterdropplet);
            this.waterdropplets.addMember(this.waterdropplet);
        }.bind(this)
    });


    this.timers.create({
        duration: 9000,
        repeat: Infinity,
        onTick: function () {
            var members = this.waterdropplets.getMembers();
            if (members.length > 0) {
                var randomI = Math.floor(Math.random() * members.length);
                var toBeRemoved = members[randomI];
                this.stage.removeChild(toBeRemoved);
                this.waterdropplets.removeMember(toBeRemoved);
            }
        
        }.bind(this)
    })


};



projektkurs2.scene.Game.prototype.spawnWeed = function () {
    const screenWidth = 400;
    const screenHeight = 225;

    const x = Math.random() * (screenWidth - 40);
    const y = Math.random() * 40;

    const weed = new Weed("Weed", this.keyboard, x, y);
    this.stage.addChild(weed);
    this.weeds.push(weed);
};


projektkurs2.scene.Game.prototype.initThorns = function () {

    this.allThorns = new rune.display.DisplayGroup(this.stage);
 
     this.timers.create({
         duration: 5000,
         repeat: Infinity,
         onTick: function () {
             this.thorn = new Thorn();
             this.allThorns.addMember(this.thorn);
             this.stage.addChild(this.thorn);
         }
     });
 
 
};

projektkurs2.scene.Game.prototype.initFlower = function () {

    this.flower = new Flower();
    this.stage.addChild(this.flower);
 
    
     this.timers.create({
         duration: 3000,
         repeat: Infinity,
         onTick: function () {
           this.flower.flowerDamage(1);
         }.bind(this)
     });
 
 
};


projektkurs2.scene.Game.prototype.handleThorns = function () {

    for (var i = 0; i < this.fairies.length; i++) {

        var fairy = this.fairies[i];

        if (fairy.hitTestGroup(this.allThorns)) {
            console.log("yas");
            fairy.isStuck = true;
        }      
    }

};

projektkurs2.scene.Game.prototype.handleWaterdropplets = function () {

    for (var i = 0; i < this.fairies.length; i++) {

        var fairy = this.fairies[i];

        this.waterdropplets.forEachMember(function(dropplet) {
            if (fairy.hitTestObject(dropplet)) {
                this.stage.removeChild(dropplet);
                this.waterdropplets.removeMember(dropplet);
                
                return false;
            }
        }.bind(this));
           
    }

};




/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Game.prototype.update = function (step) {

    rune.scene.Scene.prototype.update.call(this, step);
    this.sol.movement();
    this.filippa.movement();

    this.flower.update();


    rune.physics.Space.separate(this.sol, this.filippa);

    // Grästid
    this.spawnTimer += step;

    if (this.spawnTimer >= 5000) {
        this.spawnWeed();
        this.spawnTimer = 0;
    }

    for (let i = this.weeds.length - 1; i >= 0; i--) {
        this.weeds[i].update(step);
    }

    for (let i = this.lightballs.length - 1; i >= 0; i--) {

        const ball = this.lightballs[i];
        ball.update(step);


        // Såhär gör man om man använder display group för att at bort går inte med vanlig array
        this.allThorns.forEachMember(function(thorn) {
            if (ball.ball.hitTestObject(thorn)) {
                this.stage.removeChild(thorn);
                this.allThorns.removeMember(thorn);
                this.stage.removeChild(ball.ball);
                this.lightballs.splice(i, 1);
                return false;
            }
        }.bind(this));
    
    
       
        for (let j = this.weeds.length - 1; j >= 0; j--) {
            const weed = this.weeds[j];
            if (ball.ball.hitTestObject(weed)) {
          
                this.stage.removeChild(weed);
                this.weeds.splice(j, 1);

                this.stage.removeChild(ball.ball);
                this.lightballs.splice(i, 1);

                this.score++;
                console.log(this.score);
                break;
            }


        }
    }


    // Skottlogik (tilläggning på scen och borttagning från scen)
    if (this.keyboard.justPressed("W")) {
        const ball = this.filippa.shoot();
        this.stage.addChild(ball.ball);
        this.lightballs.push(ball);
    }

    this.handleThorns();
    this.handleWaterdropplets();

    /*
        for (let i = this.lightballs.length - 1; i >= 0; i--) {
            const ball = this.lightballs[i];
            ball.update(step);
            if (ball.isDead) {
                this.stage.removeChild(ball, true);
                this.lightballs.splice(i, 1);
            }
        }*/
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
projektkurs2.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};
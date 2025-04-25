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

    this.bg = new rune.display.Graphic(0, 0, 400, 225, "bg");
    this.bg.autoSize = true;
    bgContainer.addChild(this.bg);







    this.sol = new Sol();
    this.filippa = new Filippa();

    this.stage.addChild(this.sol);
    this.stage.addChild(this.filippa);

    bgContainer.addChild(this.sol.emitter);
    bgContainer.addChild(this.filippa.emitter);


    this.flower = new Flower();
    this.stage.addChild(this.flower);

    this.initWaterdropplet();


    this.weeds = []; // Alla aktiva ogräs
    this.spawnTimer = 0;

    this.score = 0;

    //var thorns = new Thorn();
    //this.stage.addChild(thorns);



};

/**
 * @inheritDoc
 */
projektkurs2.scene.Game.prototype.m_initCamera = function (step) {
    var camera = new Camera();
    this.cameras.addCamera(camera);


};


projektkurs2.scene.Game.prototype.initWaterdropplet = function () {

    var waterdropplets = [];

    this.timers.create({
        duration: 5000,
        repeat: Infinity,
        onTick: function () {
            var waterdropplet = new Waterdropplet();
            this.stage.addChild(waterdropplet);
            waterdropplets.push(waterdropplet);
        }
    });



};


projektkurs2.scene.Game.prototype.spawnWeed = function () {
   
    const directions = ["north", "south", "east", "west"];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    

    const weed = new Weed(direction, this.keyboard);
    this.stage.addChild(weed);
    this.weeds.push(weed);
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

   

    //Svampeffekt test
    if (this.keyboard.justPressed("T")) {
        var cam = this.cameras.getCameraAt(0);
        cam.wavy = !cam.wavy;

        cam.tint = new rune.camera.CameraTint();
        cam.tint.color = new rune.color.Color24();
        cam.tint.opacity = 0.25;

        let colors = [
            { r: 255, g: 105, b: 180 },
            { r: 255, g: 0, b: 0 },
            { r: 255, g: 128, b: 0 },
            { r: 255, g: 255, b: 0 },
            { r: 0, g: 255, b: 0 },
            { r: 128, g: 0, b: 255 }
        ];

        let index = 0;

        let fadeTimer = this.timers.create({
            duration: 250,
            repeat: 24,
            onTick: () => {
                let c = colors[index];
                cam.tint.color.setRGB(c.r, c.g, c.b);
                index++;
                if (index >= colors.length) {
                    index = 0;
                }
            }
        });


        this.timers.create({
            duration: 7000,
            onComplete: function () {
                this.timers.remove(fadeTimer);
                cam.tint.opacity = 0;
                cam.wavy = !cam.wavy;
            }
        });
    }



    //---------------------------------------------

    rune.physics.Space.separate(this.sol, this.filippa);

    // Grästid
    this.spawnTimer += step;

    if (this.spawnTimer >= 3000) {
        this.spawnWeed();
      
        this.spawnTimer = 0;
    }

    


    for (let i = this.weeds.length - 1; i >= 0; i--) {
        this.weeds[i].update(step);
        rune.physics.Space.separate(this.flower, this.weeds[i])
    }

    for (let i = this.lightballs.length - 1; i >= 0; i--) {
        const ball = this.lightballs[i];
        ball.update(step);
        if (ball.isDead) {
            this.stage.removeChild(ball, true);
            this.lightballs.splice(i, 1);
        }

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


    // Skottlogik (tilläggning på scen)
    if (this.gamepads.get(0).justPressed(2)) {
        const ball = this.filippa.shoot();
        this.stage.addChild(ball.ball);
        this.lightballs.push(ball);
    }

    if (this.gamepads.get(1).justPressed(2)) { // knapp 7 är RT
        const ball = this.sol.shoot();
        this.stage.addChild(ball.ball);
        this.lightballs.push(ball);
    }

    // Med tangentbord
    if (this.keyboard.justPressed("SPACE")) {
        const ball = this.filippa.shoot();
        this.stage.addChild(ball.ball);
        this.lightballs.push(ball);
    }

    if (this.keyboard.justPressed("SPACE")) {
        const ball = this.sol.shoot();
        this.stage.addChild(ball.ball);
        this.lightballs.push(ball);
    }


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
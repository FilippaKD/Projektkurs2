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


    var bgContainer = new rune.display.DisplayObjectContainer(0, 0, 400, 225);
    this.stage.addChild(bgContainer);

    var bg = new rune.display.Graphic(0, 0, 400, 225, "bg");
    bg.autoSize = true;
    bgContainer.addChild(bg);

    this.sol = new Sol(this.keyboard);
    this.filippa = new Filippa(this.keyboard);
    this.stage.addChild(this.sol);
    this.stage.addChild(this.filippa);

    bgContainer.addChild(this.sol.emitter);
    bgContainer.addChild(this.filippa.emitter);


    this.initWaterdropplet();

    

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
    })



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


    rune.physics.Space.separate(this.sol, this.filippa);

    

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
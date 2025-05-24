//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
projektkurs2.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "com.example",
        app: "projektkurs2",
        build: "1.0.0",
        scene: projektkurs2.scene.Game,
        resources: projektkurs2.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        debug: true
    });

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.system.Main.prototype = Object.create(rune.system.Application.prototype);
projektkurs2.system.Main.prototype.constructor = projektkurs2.system.Main;
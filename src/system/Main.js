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
pixiepower.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "com.example",
        app: "pixiepower",
        build: "1.0.0",
        scene: pixiepower.scene.Game,
        resources: pixiepower.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        debug: true
    });

};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

pixiepower.system.Main.prototype = Object.create(rune.system.Application.prototype);
pixiepower.system.Main.prototype.constructor = pixiepower.system.Main;
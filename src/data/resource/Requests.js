//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/** 
 * Creates a new Requests object.
 * 
 * @constructor
 * @extends rune.resource.Requests
 * 
 * @class
 * @classdesc
 * 
 * This class includes (bakes) resource files used by the application. A 
 * resource file is made available by reference (URI) or base64-encoded string. 
 * Tip: Use Rune-tools to easily bake resource files into this class.
 */
projektkurs2.data.Requests = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.resource.Requests
     */
    rune.resource.Requests.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

projektkurs2.data.Requests.prototype = Object.create(rune.resource.Requests.prototype);
projektkurs2.data.Requests.prototype.constructor = projektkurs2.data.Requests;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
projektkurs2.data.Requests.prototype.m_construct = function() {
    rune.resource.Requests.prototype.m_construct.call(this);
    this.add("background", "./../asset/background.png");
	this.add("bg", "./../asset/bg.png");
	this.add("Filippa", "./../asset/Filippa.png");
	this.add("pinkgubbe", "./../asset/pinkgubbe.png");
	this.add("Sol", "./../asset/Sol.png");
	this.add("SolSmall", "./../asset/SolSmall.png");
	this.add("sparkles", "./../asset/sparkles.png");
	this.add("waterdropplet", "./../asset/waterdropplet.png");
};
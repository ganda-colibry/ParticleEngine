var Vector = function(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.add = function(vector) {
	this.x += vector.x;
	this.y += vector.y;
}

Vector.prototype.sub = function(vector) {
	this.x -= vector.x;
	this.y -= vector.y;
}

Vector.prototype.mult = function(n) {
	this.x *= n;
	this.y *= n;
}

Vector.prototype.div = function(n) {
	this.x /= n;
	this.y /= n;
}

Vector.prototype.getMag = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}

Vector.prototype.setMag = function(m) {
	this.normalize();
	this.mult(m);
}

Vector.prototype.normalize = function() {
	var m = this.getMag();
	if (m) {
		this.div(m);
	}
}

Vector.prototype.limit = function(max) {
    if (this.getMag() > max) {
      	this.setMag(max);
    }
}

Vector.prototype.get = function() {
	var v = new Vector(this.x, this.y);
	return v;
}



var Repeller = function(x, y) {
	this.position = new Vector(x, y);
	this.cRepel = 10;
}

Repeller.prototype.repel = function(p) {
	var force = this.position.get();
	force.sub(p.position);
	console.log(force);
	var distance = force.getMag();
	distance = Math.max(distance, 5);
	force.normalize();
	var strength = (this.cRepel)/(distance*distance);
	force.mult(-strength); // Negative because the force repels
	return force;
}



var Particle = function() {


	this.width = this.defaultSettings.width;
	this.height = this.defaultSettings.height;

	this.mass = this.defaultSettings.mass;

	this.lifespan = this.defaultSettings.lifespan; //How long the particle may exist before being deleted
	
	this.cFric = this.defaultSettings.cFric;//Friction coefficient
	this.cDrag = this.defaultSettings.cDrag;//Drag (air resistance) coefficient
	this.normal = this.defaultSettings.normal;//Normal force coefficient

	this.position = this.defaultSettings.position;
	this.velocity = this.defaultSettings.velocity;
	this.acceleration = this.defaultSettings.acceleration;

	this.angle = this.defaultSettings.angle;
	this.angularVelocity = this.defaultSettings.angularVelocity;
	this.angularAcceleration = this.defaultSettings.angularAcceleration;
}

Particle.prototype.defaultSettings = {
	'width': 10,
	'height': 10,
	'mass': 1,
	'lifespan': 255, //How long the particle may exist before being deleted
	'cFric': 0,//Friction coefficient
	'cDrag': 0,//Drag (air resistance) coefficient
	'normal': 0,//Normal force coefficient
	'position': new Vector(0,0),
	'velocity': new Vector(0,0),
	'acceleration': new Vector(0,0),
	'angle': 0,
	'angularVelocity': 0,
	'angularAcceleration': 0
}

//Update particle
Particle.prototype.update = function() {

}

Particle.prototype.updateMovement = function() {
	//Update velocity
	this.velocity.add(this.acceleration);
	//Update position
	this.position.add(this.velocity);
	//Reset forces
	this.acceleration.mult(0);
}

Particle.prototype.updateRotation = function() {
	this.angularVelocity += this.angularAcceleration;
	this.angle += this.angularVelocity;
}

//Display (draw) the particle.
Particle.prototype.display = function() {
	
}

//Set acceleration based on forces acting on the particle. (a = F / m)
Particle.prototype.applyForce = function(force) {
	var f = force.get();

	f.div(this.mass);
	this.acceleration.add(f);
}

//Calculate object-on-object friction and return its force vector.
Particle.prototype.friction = function() {
	var fricMag = this.cFric * this.normal;//Friction magnitude
	var fric = this.velocity.get();
	fric.mult(-1);
	fric.normalize();
	fric.mult(fricMag);

	return fric;
}

//Calculate gas/liquid resistance and return its force vector.
Particle.prototype.drag = function() {
	var speed = this.velocity.getMag();
	var dragMag = this.cDrag*speed*speed;//Drag magnitude

	var drag = this.velocity.get();
	drag.mult(-1);
	drag.normalize();
	drag.mult(dragMag);
	return drag;
}

//Check if the particle's lifespan is over
Particle.prototype.isDead = function() {
	if (this.lifespan < 0) {
		return true;
	}
	else {
		return false;
	}
}

//Update and display the particle
Particle.prototype.run = function() {
	this.update();
	this.display();
}



var Confetti = function(position) {
	

	//Color
	var r = Math.random()*255>>0;
	var g = Math.random()*255>>0;
	var b = Math.random()*255>>0;
	this.color = "rgba("+r+","+g+","+b+","+ Math.random() +")";
	this.color = '#ffffff';
	this.originalColor = this.color;
	this.lifespan = 10000;
	this.mass = 1;
	this.cDrag = 0.005;
	this.position = position;

	this.velocity.y = -2;
	this.velocity.x = 0.8;

	this.width = 30;
	this.height  = 30;

}

Confetti.prototype.constructor = Confetti;
Confetti.prototype = new Particle();


Confetti.prototype.update = function() {
	//console.log(this);
	//Apply forces
	var gravity = new Vector(0, 0.01*this.mass);
	//var friction = this.friction();
	//var drag = this.drag();

	//this.applyForce(drag);
	//this.applyForce(friction);
	this.applyForce(gravity);

	this.angle = (Math.atan2(this.velocity.y, this.velocity.x)/(Math.PI/180));

	this.updateMovement();
	this.updateRotation();

	//Decrease lifespan
	this.lifespan -= 1;


	//Make particles sparkle
	if (Math.random()<0.1) {
		this.color = "rgba(255,255,255,"+ Math.random() +")";
	}
	else {
		this.color = this.originalColor;
	}
}

Confetti.prototype.display = function() {
	context.save();
	


	context.translate(this.position.x, this.position.y);
	context.rotate(this.angle*Math.PI/180);
	context.fillStyle = this.color;
	context.fillRect(-(this.width/2), 
					-(this.height/2), 
					this.width, this.height);
	
	context.restore();
}



var ParticleSystem = function(x, y) {
	this.pList = [];
	this.position = new Vector(x, y);
}

//Add particle to particle list.
ParticleSystem.prototype.spawnParticles = function() {
	for (var i = 0; i < 5; i++) {
		this.pList.push(new Confetti(this.position));
	}
}

//Run all particles. Remove "dead" particles.
ParticleSystem.prototype.run = function() {
	for (var i = 0, l = this.pList.length; i < l; i++) {
		p = this.pList[i];
		//p.run();
		p.update();
		p.display();
		if (p.isDead()) {
			this.pList.splice(i--, 1);
			l--;
		}
	}
}



//Particle System
var pSystems; 

//Other canvas-related variables
var canvas;
var context;



//Initial setup
function setup() {
	//Initialize a particle system
	pSystems = [];
	pSystems.push(new ParticleSystem(300, 400));
	pSystems[0].spawnParticles();

	//Setup canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	//Set canvas dimensions to window initial window dimensions
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

//The main loop
function draw() {

	//Draw background
	context.fillStyle = "rgba(0,0,0,1)";
	context.fillRect(0,0,canvas.width,canvas.height);
	
	//Run particle systems
	for (var i = 0, l = pSystems.length; i < l; i++) {
		ps = pSystems[i];
		ps.run();
	}

	//Repeat draw loop
	window.requestAnimationFrame(draw);
}

//First function
function main() {
	//Initial setup
	setup();


	//Begin draw loop
	window.requestAnimationFrame(draw);
}

$(main());

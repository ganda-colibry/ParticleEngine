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

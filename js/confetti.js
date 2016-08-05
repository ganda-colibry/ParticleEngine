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
console.log(Particle());
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

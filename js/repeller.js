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
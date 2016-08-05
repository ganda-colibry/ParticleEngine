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
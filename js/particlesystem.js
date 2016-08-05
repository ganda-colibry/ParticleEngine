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
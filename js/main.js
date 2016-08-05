
$(function() {
	main();
});

//Particle System
var pSystems; 

//Other canvas-related variables
var canvas;
var context;


//First function
function main() {
	//Initial setup
	setup();


	//Begin draw loop
	window.requestAnimationFrame(draw);
}

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

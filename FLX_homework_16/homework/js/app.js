function assign(obj, ...restArgs) {
	let newObj = obj;
	for (let i = 0; i < restArgs.length; i++) {
		if (typeof restArgs[i] === 'object') {
			for (let keys in restArgs[i]) {
				if (Object.prototype.hasOwnProperty.call(restArgs[i], keys)) {
					newObj[keys] = restArgs[i][keys];
				}
			}
		} else { 
			console.error(`${restArgs[i]} is not an object`);
		}
	}
	return newObj;
}
/* //Task 1
var defaults = { a: 123, b: 777 };
var options = { a: 456 };
var configs = assign({}, defaults, options); // {a: 456, b: 777} */

function Bot(info) {
	this.name = info.name;
	this.speed = info.speed;
	this.x = info.x;
	this.y = info.y;
	this.getDefaultSpeed = function() {
		return info.speed;
	};
}
Bot.prototype.setSpeed = function(newSpeed) {
	if (Number.isFinite(newSpeed)) {
		this.speed = newSpeed;
	} else { 
		console.error(`You cannot set such speed`);
	}
};
Bot.prototype.getSpeed = function() {
	return this.speed;
};
Bot.prototype.setCoordinates = function(setNewX, setNewY) {
	if (Number.isFinite(setNewX) && Number.isFinite(setNewY)) {
		this.x = setNewX;
		this.y = setNewY;
	} else {
		console.error(`You cannot set such coordinates`);
	}
};
Bot.prototype.getCoordinates = function() {
	let crdsObj = {};
	crdsObj['x'] = this.x;
	crdsObj['y'] = this.y;
	console.log(crdsObj);
};
Bot.prototype.move = function(...param) {
	for (let i = 0; i < param.length; i++) {
		if (param[i] === 'up'){
			this.y += this.speed;
		} else if (param[i] === 'right') {
			this.x += this.speed;
		} else if (param[i] === 'down') {
			this.y -= this.speed;
		} else if (param[i] === 'left') {
			this.x -= this.speed;
		} else {
			console.log('Wrong paramater passed');
		}
	}
};
Bot.prototype.showPosition = function() {
	console.log(`I am Bot '${this.name}'. I am located at ${this.x}:${this.y}`);
}
let Racebot = function(info) {
	Bot.call(this, info);
	this._movements = [];
}
Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;
Racebot.prototype.move = function(...param) {
	const one = 1;
		for (let i = 0; i < param.length; i++) {
			if (param[i] === 'up'){
				if (this._movements[this._movements.length-one] === 'up') {
					++this.speed;
					this.y += this.speed;
					this._movements.push('up');
				} else {
					this.speed = this.getDefaultSpeed();
					this.y += this.speed;
					this._movements.push('up');
				}
			} else if (param[i] === 'right') {
				if (this._movements[this._movements.length-one] === 'right') {
					++this.speed;
					this.x += this.speed;
					this._movements.push('right');
				} else {
					this.speed = this.getDefaultSpeed();
					this.x += this.speed;
					this._movements.push('right');
				}
			} else if (param[i] === 'down') {
				if (this._movements[this._movements.length-one] === 'down') {
					++this.speed;
					this.y -= this.speed;
					this._movements.push('down');
				} else {
					this.speed = this.getDefaultSpeed();
					this.y -= this.speed;
					this._movements.push('down');
				}
			} else if (param[i] === 'left') {
				if (this._movements[this._movements.length-one] === 'left') {
					++this.speed;
					this.x -= this.speed;
					this._movements.push('left');
				} else {
					this.speed = this.getDefaultSpeed();
					this.x -= this.speed;
					this._movements.push('left');
				}
			} else {
				console.log('Wrong paramater passed')
			}
		}
};
let Speedbot = function(info) {
	Bot.call(this, info);
	this.defaultSpeed = this.getDefaultSpeed();
}
Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;
Speedbot.prototype.prepareEngine = function() {
	const two = 2;
	this.speed += two;
}
Speedbot.prototype.move = function(...param) {
	for (let i = 0; i < param.length; i++) {
		if (param[i] === 'up'){
			if (this.speed !== this.defaultSpeed) {
				this.y += this.speed;
				this.speed--;
			} else {
				this.y += this.speed;
			}			
		} else if (param[i] === 'right') {
			if (this.speed !== this.defaultSpeed) {
				this.x += this.speed;
				this.speed--;
			} else {
				this.x += this.speed;
			}
		} else if (param[i] === 'down') {
			if (this.speed !== this.defaultSpeed) {
				this.y -= this.speed;
				this.speed--;
			} else {
				this.y -= this.speed;
			}
		} else if (param[i] === 'left') {
			if (this.speed !== this.defaultSpeed) {
				this.x -= this.speed;
				this.speed--;
			} else {
				this.x -= this.speed;
			}
		} else {
			console.log('Wrong paramater passed');
		}
	}
};
/* //Task 2
let Botty = new Bot({name: "Betty", speed: 2, x: 0, y: 1});
Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:1.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at 0:3.
Botty.move('left');
Botty.move('down');
Botty.move('up');
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:5.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:7.
Botty.move('up');
Botty.showPosition(); // I am Bot 'Betty'. I am located at -2:9.

let Zoom = new Racebot({name: "Lightning", speed: 2, x: 0, y: 1});
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:1.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at 0:3.
Zoom.move('left');
Zoom.move('down');
Zoom.move('up');
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:6.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:10.
Zoom.move('up');
Zoom.showPosition(); // I am Racebot 'Lightning'. I am located at -2:15.

let Broom = new Speedbot({name: "Thunder", speed: 2, x: 0, y: 1});
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:1.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at 0:3.
Broom.prepareEngine();
Broom.move('left');
Broom.move('down');
Broom.move('up');
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:4.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:6.
Broom.move('up');
Broom.showPosition(); // I am Speedbot 'Thunder'. I am located at -4:8. */
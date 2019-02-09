var val;
function pipe () {
	val = arguments[0];
	for (var i = 1; i < arguments.length-1; i++) {
		arguments[i]();
	}
	return val + arguments[0];
}
function addOne () {
	val += 1;
	return val;
}
pipe (1, addOne, addOne);
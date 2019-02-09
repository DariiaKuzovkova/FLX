function getMin () {
	for (var i = 0; i < arguments.length-1; i++) {
		for (var j = 0; j < arguments.length-i; j++) {
			if (arguments[j] > arguments[j + 1]) {
                var move = arguments[j];
                arguments[j] = arguments[j + 1];
                arguments[j + 1] = move;
            }
		}
	}
	return arguments[0];
}
getMin (3,0,-3);
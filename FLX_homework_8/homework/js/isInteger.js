function isInteger (val) {
	if ( (val % 1) === 0 ) {
		return true;
	} else {
		return false;
	}
}
isInteger (5.1);
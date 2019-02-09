function reverseNumber (val) {
	var reversedNum = 0;
	if (val < 0) {
	val *= -1;
	while (val > 0) {
		reversedNum = reversedNum*10 + val%10;
		val = Math.floor(val/10);
	}
	return "-"+reversedNum;
	} else {
	while (val > 0) {
		reversedNum = reversedNum*10 + val%10;
		val = Math.floor(val/10);
	}
	return reversedNum;
	}
}
reverseNumber (123);
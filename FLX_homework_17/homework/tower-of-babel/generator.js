const max = process.argv[2];
let FizzBuzz = function*() {
	let j = 1, val = '';
	while (j <= max) {
		(j%3 === 0 && j%5 === 0) ? val = 'FizzBuzz' :
		j%3 === 0 ? val = 'Fizz' :
		j%5 === 0 ? val = 'Buzz' : val = j;
		j++;
		yield val;
	}
}();
for (let i of FizzBuzz) {
	console.log(i);
}
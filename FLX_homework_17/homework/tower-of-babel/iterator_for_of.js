const max = process.argv[2];
let FizzBuzz = {
	[Symbol.iterator]() {
		let j = 1, val = '';
		return {
			next() {
				if (j <= max) {
					(j%3 === 0 && j%5 === 0) ? val = 'FizzBuzz' :
					j%3 === 0 ? val = 'Fizz' :
					j%5 === 0 ? val = 'Buzz' : val = j;
					j++;
					return {done: false, value: val};
				} else {
					return {done: true};
				}
			}
		}
	}
}
for (let i of FizzBuzz) {
	console.log(i);
}
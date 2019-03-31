var inputs = process.argv.slice(2);
var res = inputs.map((word) => word.slice(0, 1)).reduce((sum, letter) => sum+letter);
console.log(res);
import modulesMath from './modules_default_export_math';
let arg1 = process.argv[2];
let arg2 = process.argv[3];
console.log(modulesMath.PI);
console.log(modulesMath.sqrt(+arg1))
console.log(modulesMath.square(+arg2));
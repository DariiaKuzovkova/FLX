var a = prompt("Please enter a", ''),
 b = prompt("Please enter b", ''),
 c = prompt("Please enter c", ''),
 d = calcDiscriminant (a, b, c);
a = Number(a);
b = Number(b);
c = Number(c);

function calcQuadratic1 (a, b, c, d) {
 return (-b + Math.sqrt(d))/(2*a);
}
function calcQuadratic2 (a, b, c, d) {
 return (-b - Math.sqrt(d))/(2*a);
}
function calcQuadraticE (a, b) {
 return (-b)/(2*a);
}
function calcDiscriminant (a, b, c) {
 return b*b - 4*a*c;
}

if ( a === 0 || isNaN(a) || isNaN(b) || isNaN(c) ) {
 alert("Invalid input data");
} else {
if (d > 0) {
 var res1 = calcQuadratic1 (a, b, c, d);
 var res2 = calcQuadratic2 (a, b, c, d);
 alert ("x1 = " + res1 + " and x2 = " + res2);
} else if (d === 0) {
 var res = calcQuadraticE (a, b);
 alert ("x =" + res);
} else if (d < 0){
 alert ("No solution");
}
}
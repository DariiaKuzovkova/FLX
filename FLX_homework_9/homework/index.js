let peoplesData = [
  {
    "_id": "5b5e3168c6bf40f2c1235cd6",
    "index": 0,
    "age": 39,
    "eyeColor": "green",
    "name": "Stein",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e3168e328c0d72e4f27d8",
    "index": 1,
    "age": 38,
    "eyeColor": "blue",
    "name": "Cortez",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5b5e3168cc79132b631c666a",
    "index": 2,
    "age": 2,
    "eyeColor": "blue",
    "name": "Suzette",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5b5e31682093adcc6cd0dde5",
    "index": 3,
    "age": 19,
    "eyeColor": "green",
    "name": "George",
    "favoriteFruit": "banana"
  }
]

// Task 1
function findTypes() {
	let types = [];
	for (let i = 0; i < arguments.length; i++) {
		types.push(typeof arguments[i]);
	}
	return types;
}
findTypes (null, 5, "hello");

// Task 2
function executeforEach(data, func) {
	for (let i = 0; i < data.length; i++) {
		func(data[i]);
	}
}
executeforEach([1,2,3], function(el) {
  console.log(el);
});

// Task 3
function mapArray(data, func) {
	let modifiedArr = [];
	executeforEach(data, function(el){
		modifiedArr.push(func(el))
	})
	return modifiedArr;
}
mapArray([2, 5, 8], function(el) {
  return el + 3;
});

// Task 4
function filterArray(data, func) {
	let filteredArr = [];
	executeforEach(data, function(el){
		func(el) ? filteredArr.push(el) : "";
	})
	return filteredArr;
}
filterArray([2, 5, 8], function(el) {
  return el > 3;
});

// Task 5
function getAmountOfAdultPeople(data) {
	return filterArray(data, function(el){
		return el.age > 18;
	}).length;
}
getAmountOfAdultPeople(peoplesData);

// Task 6
function getGreenAdultBananaLovers(data) {
	let choose = filterArray(data, function(el){
		return el.age > 18 && el.favoriteFruit === "banana" && el.eyeColor === "green";
	});
	return mapArray(choose, function(el){
		return el.name;
	});
}
getGreenAdultBananaLovers(peoplesData);

// Task 7
function keys(obj) {
  let keyArr = [];
  for (let key in obj) {
    keyArr.push(key);
  }
  return keyArr;
}
keys({keyOne: 1, keyTwo: 2, keyThree: 3});

//Task 8
function values(obj) {
  let valueArr = [];
  for (let val in obj) {
    valueArr.push(obj[val]);
  }
  return valueArr;
}
values({keyOne: 1, keyTwo: 2, keyThree: 3});

//Task 9
function showFormattedDate(date) {
  let options = {
    month: 'short'
  }
  return "Date: " + date.getDate() + " of " + date.toLocaleString("en-US", options) + ", " + date.getFullYear(); 
}
showFormattedDate(new Date('2019-01-27T01:10:00'));

// Task 10
function isEvenYear(date) {
  if (date.getFullYear() % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
isEvenYear(new Date('2019-01-27T01:10:00'));

// Task 11
function isEvenMonth(date) {
  if ((date.getMonth()+1) % 2 === 0) {
    return true;
  } else {
    return false;
  }
}
isEvenMonth(new Date('2019-02-27T01:10:00'));
const infoAboutCompany = {
	name: 'Name',
	owner: 'Owner',
	maxCompanySize: 5
}
const infoAboutEmployee = {
	name: 'Name',
	age: 15,
	salary: 100500,
	primarySkill : 'primarySkill'
}


function Employee(empl) {
	let checkObj = empl;
	let _logs = [];
	let startDate = 0, endDate = 0;
	if (Object.getOwnPropertyNames(checkObj).toString() === Object.getOwnPropertyNames(infoAboutEmployee).toString() &&
		typeof empl.name === 'string' && typeof empl.age === 'number' && typeof empl.salary === 'number' && 
		typeof empl.primarySkill === 'string') {
		this.name = empl.name;
		this.age = empl.age;
		this.salary = empl.salary;
		this.primarySkill = empl.primarySkill;
	} else {
		console.log('Enter correct info please');
	}
	this.getSalary = function() {
		console.log(this.salary);
	}
	this.setSalary = function(newSalary) {
		if (Number.isFinite(newSalary) && newSalary > this.salary) {
			_logs.push(`change salary from ${this.salary} to ${newSalary} \n`);
			this.salary = newSalary;
		} else {
			console.log('You cannot set such salary');
			_logs.push(`try to change salary from ${this.salary} to ${newSalary} \n`);
		}
	}
	function getDate() {
		return new Date();
	}
	this.hire = function(nameOfComp) {
		if (nameOfComp !== null) {
			this['startDate'] = getDate();
			this['company'] = nameOfComp;
			_logs.push( `${this.name} is hired to ${this.company} in ${this.startDate} \n` );
		} else {
			console.log('You cannot set such company');
		}
	}
	this.fire = function(nameOfComp) {
		if (nameOfComp === this.company) {
			this['endDate'] = getDate();
			_logs.push( `${this.name} is fired from ${nameOfComp} in ${this.endDate} \n` );
			delete this.company;
		} else {
			console.log('Such company name doesn`t exist here');
		}
	}
	this.getWorkTimeInSeconds = function() {
		let toSec = 1000;
		let workTimeInComp = getDate().getTime() - this.startDate.getTime();
		console.log( Math.floor(workTimeInComp/toSec) );
	}
	this.getHistory = function() {
		console.log( _logs.join(''));
	}
}

function Company(comp) {
	this.employeesList = [];
	let _employees = [], _logs = [], companyStartDate = 0, index = 0, hundr = 100, one = 1;
	let checkObj = comp;
	let nameOfTheEmployee = '';
	function getDate() {
		return new Date();
	}
	if (Object.getOwnPropertyNames(checkObj).toString() === Object.getOwnPropertyNames(infoAboutCompany).toString() &&
		typeof comp.name === 'string' && typeof comp.owner === 'string' && typeof comp.maxCompanySize === 'number') {
		this.name = comp.name;
		this.owner = comp.owner;
		this.maxCompanySize = comp.maxCompanySize;
		this['companyStartDate'] = getDate();
		_logs.push( `${this.name} was created in ${this.companyStartDate} \n` );
	} else {
		console.log('Enter all info please');
	}
	this.addNewEmployee = function(nameOfEmployee) {
		nameOfTheEmployee = nameOfEmployee;
		if (nameOfEmployee instanceof Employee && this.employeesList.length < this.maxCompanySize && 
			nameOfEmployee !== null) {
			this.employeesList.push(nameOfEmployee);
			nameOfEmployee.hire(this.name);
			_logs.push( `${nameOfEmployee.name} starts working at ${this.name} in ${nameOfEmployee.startDate} \n` );
		} else if (this.employeesList.length >= this.maxCompanySize) {
			/*Find index of employee with the less salary and that one who works longer in the company */
			let minArr = [];
			for (let i = 0; i < this.employeesList.length; i++) {
				minArr.push(this.employeesList[i].salary);
			}
			let zero = 0;
			let min = minArr[zero];
			for (let i = 1; i < minArr.length; ++i) {
				if (minArr[i] < min) {
					min = minArr[i];
				}
			}
			let index = minArr.indexOf(min);
			this.removeEmployee(index);
			this.employeesList.splice(index, one, nameOfTheEmployee);
			nameOfTheEmployee.hire(this.name);
			_logs.push(`${nameOfTheEmployee.name} starts working at ${this.name} in ${nameOfTheEmployee.startDate}\n`);
		} else {
			console.log('Please try to add Employee instance');
		}
	}
	this.removeEmployee = function(id) {
		this.employeesList[id].fire(this.name);
		_logs.push(`${this.employeesList[id].name} ends working at ${this.name} in ${this.employeesList[id].endDate}
			\n`);
		this.employeesList.splice(id, one);
	}
	this.getAvarageSalary = function() {
		let _sum = 0;
		this.employeesList.forEach((el) => {
			_sum += el.salary;
			return _sum;
		});
		let _avarage = _sum/this.employeesList.length;
		console.log(`${Math.round(_avarage*hundr)/hundr}`);
	}
	this.getEmployees = function() {
		this.employeesList.forEach((el) => {
			return _employees.push(el.name);
		});
		console.log( _employees);
	}
	this.getFormattedListOfEmployees = function() {
		return this.employeesList.forEach((el) => {
			console.log( `${el.name} - works in ${this.name}` );
		});
	}
	this.getAvarageAge = function() {
		let _sum = 0;
		this.employeesList.forEach((el) => {
			_sum += el.age;
			return _sum;
		});
		let _avarage = _sum/this.employeesList.length;
		console.log(`${Math.round(_avarage*hundr)/hundr}`);
	}
	this.getHistory = function() {
		console.log( _logs.join(''));
	}
}
/*
let artem = new Employee({name: "Artem", age: 15, salary: 1000, primarySkill: "UX"});
let vova = new Employee({name: "Vova", age: 16, salary: 2000, primarySkill: "BE"});
let vasyl = new Employee({name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE"});
let ivan = new Employee({name: "Ivan", age: 35, salary: 5000, primarySkill: "FE"});
let orest = new Employee({name: "Orest", age: 29, salary: 300, primarySkill: "AT"});
let anton = new Employee({name: "Anton", age: 19, salary: 500, primarySkill: "Manager"});

let epam = new Company({name: "Epam", owner: "Arkadii", maxCompanySize: 5});
epam.addNewEmployee(artem);
epam.addNewEmployee(vova);
epam.addNewEmployee(vasyl);
epam.addNewEmployee(ivan);
epam.addNewEmployee(orest);
epam.addNewEmployee(anton);

epam.getHistory();

epam.removeEmployee(2);

vasyl.getHistory();
epam.getAvarageSalary(); // -> 2125
epam.getAvarageAge();  // -> 21.25

epam.addNewEmployee(5,6,9,5); // -> Please try to add Employee instance

setTimeout(() => {
   epam.removeEmployee(0);
   console.log(artem.getWorkTimeInSeconds());
}, 5000);

vova.setSalary(900);
vova.setSalary(2200);
vova.getHistory();
*/
const rootNode = document.getElementById('root');
const firstPage = document.querySelector('.main_page');
const secondPage = document.querySelector('.add_new_item');
const thirdPage = document.querySelector('.modify_item');
const input = document.querySelector('#input_field');
const add_box = document.querySelector('#save_btn');
const ZERO = 0;
let identif, description, item =[], todoItems = [];

function todo() {
	todoItems = getFromLocalStor();
}
function getFromLocalStor() {
	let localStorItems = localStorage.getItem('todoItems');
	if (localStorItems === null) {
		return [];
	}
	return JSON.parse(localStorItems);
}
function saveInLocalStor() {
	localStorage.setItem('todoItems', JSON.stringify(todoItems));
}
function hashNewItem() {
	location.hash = '/add_new_item';
}
function hashModifyItem(elem) {
	location.hash = '/modify_item/'+ identif;
}
function hashMainPage() {
	history.replaceState(null, null, ' ');
}
function cancelBtnPressed() {
	hashMainPage();
	firstPage.style.display = 'block';
	secondPage.style.display = 'none';
	thirdPage.style.display = 'none';
}
function addNewItem() {
	hashNewItem();
	firstPage.style.display = 'none';
	secondPage.style.display = 'block';
	thirdPage.style.display = 'none';
}
function createNewItem() {
	if (input.value === '') {
		alert('Task can`t be empty!');
	} else {
		firstPage.style.display = 'block';
		secondPage.style.display = 'none';
		thirdPage.style.display = 'none';
		
		const text_empt = document.querySelector('.text_empt');
		text_empt.style.display = 'none';
		
		newItem();
		
		let itemReady = document.querySelector('.items-wrapper');
		todoItems.push({
			id: identif,
			description: 'Todo ' + identif,
			item: itemReady
		});
		
		hashMainPage();
		saveInLocalStor();
		
		identif++;
	}
	input.value = '';
}
 function newItem() {
	const div = document.createElement('div');
	div.className = 'items-wrapper';
	const buttonCheck = document.createElement('button');
	buttonCheck.className = 'btn_check';
	buttonCheck.setAttribute('onclick', 'isDone(this)');
	const iCheck = document.createElement('IMG');
	iCheck.className = 'img_btn_check';
	iCheck.src = 'assets/img/todo-s.png';
	const p = document.createElement('p');
	p.className = 'text_list';
	p.innerHTML = input.value;
	p.setAttribute('onclick', 'modifyItem(this)');
	const buttonDel = document.createElement('button');
	buttonDel.className = 'btn_delete';
	buttonDel.setAttribute('onclick', 'removeItem(this)');
	const iDel = document.createElement('IMG');
	iDel.className = 'img_btn_delete';
	iDel.src = 'assets/img/remove-s.jpg';
	const parent_item = document.querySelector('#taskList');
	parent_item.appendChild(div);
	div.appendChild(buttonCheck);
	buttonCheck.appendChild(iCheck);
	div.appendChild(p);
	div.appendChild(buttonDel);
	buttonDel.appendChild(iDel);
 }
function isDone(done) {
	let child = done.children[ZERO];
	child.src = 'assets/img/done-s.png';
	done.parentNode.style.background = '#696969';
	let parent = document.querySelector('#doneList');
	parent = parent.appendChild(done.parentNode);
}
function removeItem(elem) {
	let parent = elem.parentNode.parentNode;
	parent = parent.removeChild(elem.parentNode);
	saveInLocalStor();
	emptyLists();
}
function emptyLists() {
	const parent_item_taskList = document.querySelector('#taskList');
	const parent_item_doneList = document.querySelector('#doneList');

	if (parent_item_taskList.childNodes.length === ZERO && 
		parent_item_doneList.childNodes.length === ZERO) {
		const text_empt = document.querySelector('.text_empt');
		text_empt.style.display = 'block';
	}
}
function modifyItem(elem) {
	const parent_item_taskList = document.querySelector('#taskList');
	let editInput = document.querySelector('#edit_input');
	if (elem.parentNode.parentNode === parent_item_taskList) {
		hashModifyItem(elem);
		firstPage.style.display = 'none';
		secondPage.style.display = 'none';
		thirdPage.style.display = 'block';
		editInput.value = elem.innerHTML;
		editInput.addEventListener('input', modif => {
			elem.innerHTML = editInput.value;
			saveInLocalStor();
			return elem;
		});
	}
}
function saveModify() {	
	let editInput = document.querySelector('#edit_input');
	if (editInput.value === '') {
		alert('Task can`t be empty!');
	} else {
		hashMainPage();
		firstPage.style.display = 'block';
		secondPage.style.display = 'none';
		thirdPage.style.display = 'none';
	}
}

todo();
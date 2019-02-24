let counter = 0;
const MAX = 10;

function itemCreator() {
	const add_box = document.querySelector('.btn-add_box');
	add_box.setAttribute('disabled', true);
	const input = document.querySelector('#input-add');
	input.addEventListener('input', empt => {
		if (!input.value) {
			add_box.disabled = true;
		} else {
			add_box.disabled = false;
		}
	});
	add_box.addEventListener('click', creator => {
		const div = document.createElement('div');
		div.className = 'items-wrapper';
		div.setAttribute('draggable', true);
		const buttonCheck = document.createElement('button');
		buttonCheck.className = 'btn-crop_din';
		const iCheck = document.createElement('i');
		iCheck.className = 'material-icons';
		iCheck.setAttribute('id', 'check_done');
		iCheck.innerHTML = 'crop_din';
		iCheck.setAttribute('onclick', 'checkbox(this)');
		const p = document.createElement('p');
		p.innerHTML = input.value;
		const buttonDel = document.createElement('button');
		buttonDel.className = 'btn-delete';
		buttonDel.setAttribute('onclick', 'removeItem(this)');
		const iDel = document.createElement('i');
		iDel.className = 'material-icons';
		iDel.innerHTML = 'delete';
		const parent_item = document.querySelector('.items');
		parent_item.appendChild(div);
		div.appendChild(buttonCheck);
		buttonCheck.appendChild(iCheck);
		div.appendChild(p);
		div.appendChild(buttonDel);
		buttonDel.appendChild(iDel);
		input.value = '';
		if (!input.value) {
			add_box.disabled = true;
		} else {
			add_box.disabled = false;
		}
		if (++counter < MAX) {
			input.disabled = false;
		} else {
			input.disabled = true;
			document.querySelector('.btn-add_box').disabled = true;
			showWarning();
		}
	});
}
function checkbox(checkDone) {
	checkDone.innerHTML = 'check_box';
}
function removeItem(delItem) {
	delItem.parentNode.parentNode.removeChild(delItem.parentNode);
	const input = document.querySelector('#input-add');
	if (--counter < MAX) {
		input.disabled = false;
	} else {
		input.disabled = true;
		document.querySelector('.btn-add_box').disabled = true;
	}
}
function showWarning() {
	const warning = document.createElement('p');
	warning.innerHTML = 'Maximum item per list are created';
	warning.className = 'warning';
	document.querySelector('p').appendChild(warning);

	let timeInMilisec = 2000;
	setTimeout(function() {
		warning.parentNode.removeChild(warning);
	}, timeInMilisec);
}

itemCreator();

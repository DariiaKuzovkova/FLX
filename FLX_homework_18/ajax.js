const URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS = 'https://jsonplaceholder.typicode.com/posts?userId=';
const COMMENTS = 'https://jsonplaceholder.typicode.com/comments?postId=';
let cardCounter = 1;
let xhr = new XMLHttpRequest();
function createCard (cardCounter) {
	xhr.open('GET', URL+`/${cardCounter}`, true);
	xhr.onload = function () {
		if ((xhr.readyState==4) && (xhr.status==200)) {
			dataOfCard = JSON.parse(xhr.responseText);
			renderHTML(dataOfCard);
			cardCounter++;
			createCard(cardCounter);
			spin(true);
		} else {
			console.log('Finished with an error ' + xhr.status + ': ' + xhr.readyState);
		}
	}
	xhr.send();
	if (cardCounter === 11) {
		xhr.abort();
		for (let i = 0; i < cardCounter; i++) {
			let avka = document.querySelectorAll('.ava')[i];
			getAvatar(avka);
			spin(false);
		}
	}
}
createCard(cardCounter);
function renderHTML(dataOfCard) {
	let container = document.getElementById('container');
	let div = document.createElement('div');
	div.className = 'card';
	div.id = `${dataOfCard.id}`;
	let cardPart1 = document.createElement('div');
	cardPart1.className = 'card-part1';
	let ava = document.createElement('img');
	ava.setAttribute('src', '');
	ava.className = 'ava';
	let username = document.createElement('span');
	username.className = 'username';
	username.setAttribute('onclick',`showPostAndComments(${dataOfCard.id});`);
	username.innerHTML = `${dataOfCard.username}`;
	let cardPart2 = document.createElement('div');
	cardPart2.className = 'card-part2';
	let adressList = document.createElement('ul');
	let adressItem = document.createElement('li');
	adressItem.className = 'address';
	adressItem.innerHTML = `Address: ${dataOfCard.address.street} street, ${dataOfCard.address.suite}
	${dataOfCard.address.city} city, zipcode is ${dataOfCard.address.zipcode}
	Geolocation: ${dataOfCard.address.geo.lat}, ${dataOfCard.address.geo.lng}`;
	let companyItem = document.createElement('li');
	companyItem.className = 'company';
	companyItem.innerHTML = `Company name is ${dataOfCard.company.name} and a catch phrase is "${dataOfCard.company.catchPhrase}"`;
	let cardPart3 = document.createElement('div');
	cardPart3.className = 'card-part3';
	let btnEdit = document.createElement('button');
	btnEdit.className = 'btn btn_edit';
	btnEdit.innerHTML = 'Edit';
	btnEdit.setAttribute('onclick',`editItem(${dataOfCard.id});`);
	let btnSave = document.createElement('button');
	btnSave.className = 'btn btn_save';
	btnSave.innerHTML = 'Save';
	let btnDelete = document.createElement('button');
	btnDelete.className = 'btn btn_delete';
	btnDelete.innerHTML = 'Delete';
	btnDelete.setAttribute('onclick',`deleteItem(${dataOfCard.id});`);

	container.appendChild(div);
	div.appendChild(cardPart1);
	cardPart1.appendChild(ava);
	cardPart1.appendChild(username);
	div.appendChild(cardPart2);
	cardPart2.appendChild(adressList);
	adressList.appendChild(adressItem);
	adressList.appendChild(companyItem);
	div.appendChild(cardPart3);
	cardPart3.appendChild(btnEdit);
	cardPart3.appendChild(btnSave);
	cardPart3.appendChild(btnDelete);
}

function deleteItem(id) {
	spin(true);
	xhr.open("DELETE", URL+`/${id}`, true);
	xhr.onload = function () {
		let user = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(`User with id ${id} deleted`);
		} else {
			console.error(`Fail to delete user with id ${id}`);
		}
	}
	xhr.send();
	let child = document.getElementById(id);
	child.remove();
}
function editItem(id) {
	let data = {};
	// edit username
	let userInfo = document.getElementById(id);
	let btnEdit = userInfo.querySelector('.card-part3 .btn_edit');
	btnEdit.style.display = 'none';
	let btnSave = userInfo.querySelector('.card-part3 .btn_save');
	btnSave.style.display = 'inline';
	let editUsername = userInfo.querySelector('.card-part1');
	let username = userInfo.querySelector('.card-part1 span');
	let setUsername = userInfo.querySelector('.card-part1 span.username');
	username.style.display = 'none';
	let input = document.createElement('input');
	input.type = 'text';
	input.className = 'input-username';
	input.setAttribute('value', `${username.innerHTML}`);
	editUsername.appendChild(input);

	// edit address
	let appChildPart2A = userInfo.querySelector('.card-part2');
	let editAddress = userInfo.querySelector('.card-part2 ul li.address');
	let adresAndComp = userInfo.querySelector('.card-part2 ul');
	adresAndComp.style.display = 'none';
	let inputAddr = document.createElement('input');
	inputAddr.type = 'textarea';
	inputAddr.className = 'input-address';
	inputAddr.setAttribute('value', `${editAddress.innerHTML}`);
	appChildPart2A.appendChild(inputAddr);

	//edit company
	let appChildPart2C = userInfo.querySelector('.card-part2');
	let editComp = userInfo.querySelector('.card-part2 ul li.company');
	let inputComp = document.createElement('input');
	inputComp.type = 'textarea';
	inputComp.className = 'input-company';
	inputComp.setAttribute('value', `${editComp.innerHTML}`);
	appChildPart2C.appendChild(inputComp);


	btnSave.addEventListener('click', function() {
		btnEdit.style.display = 'inline';
		btnSave.style.display = 'none';
		username.style.display = 'block';
		setUsername.innerHTML = input.value;
		input.remove();
		adresAndComp.style.display = 'block';
		editAddress.innerHTML = inputAddr.value;
		editComp.innerHTML = inputComp.value;
		inputAddr.remove();
		inputComp.remove();

		data['username'] = setUsername.innerHTML;
		data['address'] = editAddress.innerHTML;
		data['company'] = editComp.innerHTML;
		let json = JSON.stringify(data);
		xhr.open("PUT", URL+`/${id}`, true);
		xhr.onload = function () {
			let users = JSON.parse(xhr.responseText);
			if (xhr.readyState == 4 && xhr.status == "200") {
				console.log(`User with id ${id} is edited`);
			} else {
				console.error(`Fail to edit user with id ${id}`);
			}
		}
		xhr.send(json);
		spin(false);
	});
}
function getAvatar(ava) {
	spin(true);
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.thecatapi.com/v1/images/search', true);
	xhr.onload = function () {
		if ((xhr.readyState==4) && (xhr.status==200)) {
			ava.src = JSON.parse(xhr.responseText)[0].url;
		} else {
			console.log('Finished with an error ' + xhr.status + ': ' + xhr.readyState);
		}
	}
	xhr.send();
	spin(false);
}
function spin(bool) {
	if(bool) {
		let addiv = document.createElement('div');
		addiv.className = 'spinner';
		document.body.appendChild(addiv);
	} else if (document.querySelector('.spinner')){
		let removediv = document.querySelector('.spinner');
		removediv.remove();
	}
}
function showPostAndComments(id) {
	spin(true);
	let xhrPosts = new XMLHttpRequest();
	xhrPosts.open('GET', POSTS+`${id}`, true);
	xhrPosts.onload = function () {
		if ((xhrPosts.readyState==4) && (xhrPosts.status==200)) {
			let posts = JSON.parse(xhrPosts.responseText);
			postRenderHTML(posts);
		} else {
			console.log('Finished with an error ' + xhrPosts.status + ': ' + xhrPosts.readyState);
		}
	}
	xhrPosts.send();
	spin(false);
}
function postRenderHTML(post) {
	spin(true);
	location.hash = `/posts/${post[0].userId}`;
	let container = document.getElementById('container');
	container.style.display = 'none';
	let main = document.getElementById('posts');
	main.style.display = 'flex';
	let btnBack = document.createElement('button');
	btnBack.className = 'btn btn_back';
	btnBack.innerHTML = 'Back';
	btnBack.setAttribute('onclick',`histback();`);
	btnBack.style.display = 'block';
	main.appendChild(btnBack);

	for (let item of post) {
		let postData = document.createElement('div');
		postData.className = `post`;
		postData.id = `post${item.id}`;
		let title = document.createElement('h2');
		title.innerHTML = item.title;
		let body = document.createElement('p');
		body.innerHTML = item.body;
		let commentCont = document.createElement('div');
		commentCont.className = `comments_container`;
		main.appendChild(postData);
		postData.appendChild(title);
		postData.appendChild(body);
		postData.appendChild(commentCont);
		showComments(item.id);
	}
	spin(false);
}
function showComments(id) {
	spin(true);
	let xhrCom = new XMLHttpRequest();
	xhrCom.open('GET', COMMENTS+`${id}`, true);
	xhrCom.onload = function () {
		if ((xhrCom.readyState==4) && (xhrCom.status==200)) {
			let com = JSON.parse(xhrCom.responseText);
			comRenderHTML(com);
		} else {
			console.log('Finished with an error ' + xhrCom.status + ': ' + xhrCom.readyState);
		}
	}
	xhrCom.send();
	spin(false);
}
function comRenderHTML(com) {
	let commentCont = document.querySelector(`#post${com[0].postId} .comments_container`);
	for (let item of com) {
		let email = document.createElement('h3');
		email.innerHTML = item.email;
		let body = document.createElement('p');
		body.innerHTML = item.body;
		commentCont.appendChild(email);
		commentCont.appendChild(body);
	}
}
function histback() {
	spin(false);
	history.back();
	let container = document.getElementById('container');
	container.style.display = 'flex';
	let main = document.getElementById('posts');
	main.style.display = 'none';
	let btnBack = document.querySelector('.btn_back');
	btnBack.style.display = 'none';
	while (main.hasChildNodes()) {
	    main.removeChild(main.lastChild);
	}
}
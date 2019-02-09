let login = prompt ("Please enter your login", "User");
if (login === "" || login === null ) {
	alert ("Canceled");
} else if (login.length < 4) {
	alert ("I don't know any users having name length less than 4 symbols");
} else if (login === "User" || login === "Admin") {
	let password = prompt ("Please enter password", "");
	if (password === "" || password === null ) {
		alert ("Canceled");
	} else if (login === "User" && password === "UserPass") {
		alert (new Date().getHours() <= 19 ? "Good day, dear User!" : "Good evening, dear User!");
	} else if (login === "Admin" && password === "RootPass") {
		alert (new Date().getHours() <= 19 ? "Good day, dear Admin!" : "Good evening, dear Admin!");
	} else {
		alert ("Wrong password");
	}
} else {
	alert ("I don’t know you");
}
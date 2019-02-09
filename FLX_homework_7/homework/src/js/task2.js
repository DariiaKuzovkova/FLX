let checkAnsw = confirm("Do you want to play a game?");
let range = 5;
let prize = 0;
let mainPrize = 10;	
let totalPrize = 0;
let attempt = 3;
let counter = 0;

if (checkAnsw) {
	while (checkAnsw) {
		let randNum = Math.floor(Math.random() * range) + 1;
		for (counter = 1; counter <= 3; counter++ && attempt--) {
			switch (counter) {
				case 1: prize = mainPrize; break;
				case 2: prize = Math.floor(mainPrize/2); break;
				case 3: prize = Math.floor((mainPrize/2)/2); break;
				default: prize = 0; break; 
			}
			let guess = prompt ("Please enter a number from 0 to " + range + 
				"\nAttempts left: " + attempt + "\nTotal prize: " + totalPrize +
				"\nPossible prize on current attempt: " + prize, "0");
			let userGuess = parseFloat(guess);
			if (userGuess === randNum) {
				totalPrize += prize;
				checkAnsw = confirm ("Congratulation! Your prize is: " + totalPrize + 
					"$ \nDo you want to continue?");
				} else {
 continue;
}
			if (checkAnsw) {
				range *= 2;
				mainPrize *= 3;
				attempt = 3;
				prize = 0;
				break;
			} else {
 break; 
}
		} 
		if (counter === 4) {
			alert ("Thank you for a game. Your prize is: " + totalPrize + "$");
			checkAnsw = confirm("Do you want to play again?");
			if (checkAnsw) {
				range = 5;
				mainPrize = 10;
				attempt = 3;
				prize = 0;
				totalPrize = 0;
			} else {
 break; 
}
		}
		if (!checkAnsw) {
			totalPrize = prize;
			alert ("Thank you for a game. Your prize is: " + totalPrize + "$");
			checkAnsw = confirm("Do you want to play again?");
			if (checkAnsw) {
				range *= 1;
				mainPrize *= 1;
				attempt = 3;
				prize = 0;
				totalPrize = 0;
			} else {
 break; 
}
		}
	}
} else {
	alert ("You did not become a millionaire, but can.");
}
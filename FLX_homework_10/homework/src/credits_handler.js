const ZERO = 0;
const MAX_NUM_OF_CARDS = 3;

function userCard(index) {
	let cardOptions = {
		key: index,
		balance: 100,
		transactionLimit: 100,
		historyLogs: []
	};

	let cardMethods = {
		getCardOptions: function() {
			return cardOptions;
		},
		putCredits: function (fillCredits) {
			if (fillCredits > ZERO) {
				putInHistoryLog('Received credits', fillCredits);
				cardOptions.balance += fillCredits;
				return 'Current balance is ' + cardOptions.balance;
			} else {
				console.error('You can`t put credits!');
			}
		},
		takeCredits: function (reduceCredits) {
			if (cardOptions.balance > reduceCredits && cardOptions.transactionLimit > reduceCredits 
				&& reduceCredits > ZERO) {
				putInHistoryLog('Withdrawal of credits', reduceCredits);
				cardOptions.balance -= reduceCredits;
				return 'Current balance is ' + cardOptions.balance;
			} else {
				console.error('You can`t take credits!');
			}
		},
		setTransactionLimit: function(setLimit) {
			if (setLimit > ZERO) {
				putInHistoryLog('Transaction limit change', setLimit);
				cardOptions.transactionLimit = setLimit;
				return 'Transaction limit changed to ' + cardOptions.transactionLimit;
			} else {
				console.error('You can`t set transaction limit!');
			}
		},
		transferCredits: function(creditsForTrans, cardNum) {
			let tax = 0.005;
			if (cardOptions.balance > creditsForTrans && cardOptions.transactionLimit > creditsForTrans 
				&& creditsForTrans > ZERO) {
				this.takeCredits(creditsForTrans + creditsForTrans*tax);
				cardNum.putCredits(creditsForTrans);
				return 'Amount of trancferred credits is ' + creditsForTrans;
			} else {
				console.error('You can`t transfer credits!');
			}
		}
	}

	function putInHistoryLog(operationType, credits) {
		cardOptions.historyLogs.push({
			operationType: operationType,
			credits: credits,
			operationTime: new Date().toLocaleString('en-GB')
		});
	}
	return cardMethods;
 }

class UserAccount {
	constructor(username) {
		this.username = username;
		this.cards = [];
	}
	addCard() {
		if (this.cards.length <= MAX_NUM_OF_CARDS) {
			this.cards.push(userCard(this.cards.length + 1));
		} else {
			console.error('You can`t add one more card!');
		}
	}
	getCardByKey(index) {
		if (this.cards.length <= MAX_NUM_OF_CARDS) {
			return this.cards[index - 1];
		} else {
			console.error('You don`t have card with this index!');
		}
	}
}
function* upper(items) {
	for (let i = 0; i < items.length; i++) {
		if (typeof items[i] === 'string') {
			yield items[i].toUpperCase();
		} else {
			try {
				throw e;
			} catch(e) {
				yield null;
			}
		}
	}
}
var badItems = ['a', 'B', 1, 'c'];
for (let item of upper(badItems)) {
	console.log(item);
}
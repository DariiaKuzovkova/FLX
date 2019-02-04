var money = prompt("Please enter amount of money", ""),
 discount = prompt("Please enter your discount", "");

if ( isNaN(money) || isNaN(discount) || 
	money<0 || money>9999999 || discount<0 || 
	discount>99 || money === "" || discount === "") {
 alert("Invalid input data");
} else {
  var saved = (money*discount)/100;
  var price = money - saved;
  money = Math.floor(money*100)/100;
  discount = Math.floor(discount*100)/100;
  price = Math.floor(price*100)/100;
  saved = Math.floor(saved*100)/100;
  alert ("Price without discount: " + money + " \n" + 
  "Discount: " + discount + "% \n" + 
  "Price with discount: " + price + " \n" +
  "Saved: " + saved);
}

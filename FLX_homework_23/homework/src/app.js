class User {
  constructor(name, orderTotalPrice, weekendDiscount, nightDiscount, bonus) {
    this.name = name;
    this.orderTotalPrice = function() {
      return orderTotalPrice;
    };
    this.weekendDiscount = weekendDiscount;
    this.nightDiscount = nightDiscount;
    this.bonus = function() {
      return bonus;
    };
  }

  makeOrder() {
    return `Dear ${this.name}! For your order price after discount and including bonuses is ${this.orderTotalPrice()}`;
  }
}

const getDiscount = function(userObj) {
  let orderTotalPrice = userObj.orderTotalPrice();
  let weekendDiscount = userObj.weekendDiscount;
  let nightDiscount = userObj.nightDiscount;
  let currentDate = new Date();

  if (currentDate.getDay() === 0 || currentDate.getDay() === 6 &&
  currentDate.getHours() >= 23 || currentDate.getHours() <= 6) {
    let superDiscount = weekendDiscount + nightDiscount;
    userObj.orderTotalPrice = function() {
      return orderTotalPrice - superDiscount;
    };
  } else if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
    userObj.orderTotalPrice = function() {
      return orderTotalPrice - weekendDiscount;
    };
  } else if (currentDate.getHours() >= 23 || currentDate.getHours() <= 6) {
    userObj.orderTotalPrice = function() {
      return orderTotalPrice - nightDiscount;
    };
  } else {
    userObj.orderTotalPrice = function() {
      return orderTotalPrice;
    };
  }
};

const setBonus = function(userObj) {
  let orderTotalPrice = userObj.orderTotalPrice();
  let bon = userObj.bonus();

  if (orderTotalPrice > 100) {
    let bonus = parseInt(orderTotalPrice/100);
    bonus *= 5;
    userObj.bonus = function() {
      return bon + bonus;
    };
  }
};

const Daria = new User('Dara', 545, 20, 5, 3);

setBonus(Daria);
getDiscount(Daria);
Daria.makeOrder();

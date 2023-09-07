const { addToCartButton } = require("./pages/product");

email = { css: "#input-email" };
password = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//h2[text()="Мої замовлення"]' };

module.exports = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    
    login(user) {
      this.amOnPage('/');
      this.click(signInButton);
      this.fillField(email, user.email);
      this.fillField(password, user.password);
      this.click(loginButton);
      this.seeTextEquals("Мої замовлення", myOrdersText);
    },
  });
}

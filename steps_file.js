const { pause } = require("codeceptjs");
const { billingDetailsDropDown, newAddressRadioButton, firstName, lastName, address1, city, postCode, country, stateOption, confirmOrderButton } = require("./pages/checkout");
const { myAccountSpoiler, shoppingCartButton } = require("./pages/product");

email = { css: "#input-email" };
password = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//h2[text()="Мої замовлення"]' };

module.exports = function () {
  return actor({

    login(user) {
      this.amOnPage('/');
      this.click(signInButton);
      this.fillField(email, user.email);
      this.fillField(password, user.password);
      this.click(loginButton);
      this.seeTextEquals("Мої замовлення", myOrdersText);
    },

  openCart() {
    this.amOnPage('/index.php?route=product/product&product_id=44');
    this.click(myAccountSpoiler);
    this.click(shoppingCartButton);
  },

  proceedToCheckOut() {
    this.amOnPage('/index.php?route=checkout/cart');
    this.click(billingDetailsDropDown);
    this.click(newAddressRadioButton);
    this.fillField(firstName, "Tetiana");
    this.fillField(lastName, "33");
    this.fillField(address1, "Dubai str 1");
    this.fillField(city, "Dubai");
    this.fillField(postCode, "08711");
    this.click(country);
    this.click(stateOption);
    this.click(continueButton);
    this.click(continueButtonDeliveryDetails);
    this.click(continueButtonDeliveryMethod);
    this.click(termsCheckbox);
    this.click(continuePaymentButton);
    this.click(confirmOrderButton);
  },
});
}

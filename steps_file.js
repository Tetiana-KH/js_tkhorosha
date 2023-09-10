const { pause } = require("codeceptjs");
const { billingDetailsDropDown, newAddressRadioButton, firstName, lastName, address1, city, postCode, country, stateOption, confirmOrderButton } = require("./pages/cart");
const { myAccountSpoiler, shoppingCartButton } = require("./pages/product");
const { languageSelectDropDown, selectEnglishButton } = require("./pages/account");

email = { css: "#input-email" };
password = { css: "#input-password" };
signInButton = { xpath: '//a[text()="Sign In"]' };
loginButton = { xpath: '//input[@type="submit"]' };
myOrdersText = { xpath: '//*[@id="content"]/h2[2]' };

module.exports = function () {
  return actor({

    login(user) {
      this.amOnPage('/');
      this.click(languageSelectDropDown);
      this.click(selectEnglishButton);
      this.click(signInButton);
      this.fillField(email, user.email);
      this.fillField(password, user.password);
      this.click(loginButton);
      this.seeTextEquals("My Orders", myOrdersText);
    },
});
}

signInButton = { xpath: '//*[@id="page"]/header/div[1]/div[1]/div/div/div/div/div[2]/div/div[2]/a' };
emailField = { xpath: '//*[@id="input-email"]' };
passwordField = { xpath: '//*[@id="input-password"]' };
loginButton = { xpath: '//*[@id="content"]/div/div[2]/div/form/input' };
myOrdersText = { xpath: '//*[@id="content"]/h2[2]' };
languageSelectDropDown = { xpath: '//*[@id="form-language"]/div/span' };
selectEnglishButton = { xpath: '//*[@id="form-language"]/div/ul/li[1]/button' };

module.exports = function () {
  return actor({
    login(user) {
      this.amOnPage('/');
      this.click(languageSelectDropDown);
      this.click(selectEnglishButton);
      this.click(signInButton);
      this.fillField(emailField, user.email);
      this.fillField(passwordField, user.password);
      this.click(loginButton);
      this.seeTextEquals("My Orders", myOrdersText);
    }
  });
}
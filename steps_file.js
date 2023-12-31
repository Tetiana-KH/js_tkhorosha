const signInButton = { xpath: '//*[@id="page"]/header/div[1]/div[1]/div/div/div/div/div[2]/div/div[2]/a' };
const emailField = { xpath: '//*[@id="input-email"]' };
const passwordField = { xpath: '//*[@id="input-password"]' };
const loginButton = { xpath: '//*[@id="content"]/div/div[2]/div/form/input' };
const myOrdersText = { xpath: '//*[@id="content"]/h2[2]' };
const languageSelectDropDown = { xpath: '//*[@id="form-language"]/div/span' };
const selectEnglishButton = { xpath: '//*[@id="form-language"]/div/ul/li[1]/button' };

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
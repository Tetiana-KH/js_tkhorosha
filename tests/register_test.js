const NEW_USER = {
    firstName: "Tetiana",
    lastName: "33",
    email: Date.now() + '@test.com',
    telephone: Date.now() + 23,
    password: "password",
    passwordConfirm: "password",
};

Feature('register');

xScenario('register new user', ({ I, basePage, accountPage }) => {
    I.amOnPage('/');
    basePage.clickMyAccount();
    basePage.clickRegister();
    accountPage.verifyRegisterAccountPage();
    accountPage.fillNewUserForm(NEW_USER);
    accountPage.agreetoPrivacyPolicy();
    accountPage.submitNewUserForm();
    accountPage.verifySuccessfulRegistration();
});
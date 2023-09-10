const { I } = inject();

module.exports = {
  successContinueButton: { xpath: '//*[@id="content"]/div/div/a' },

  verifySuccessfulPurchase() {
    const regTitleText = 'Your order has been placed!';
    I.seeTextEquals(regTitleText, this.h1);
    I.click(this.successContinueButton);
  },
}
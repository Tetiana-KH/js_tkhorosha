const { I } = inject();

module.exports = {
  confirmOrderButton: { xpath: '//*[@id="button-confirm"]' },

  verifySuccessfulPurchase() {
    I.click(this.confirmOrderButton);
    const regTitleText = 'Your order has been placed!';
    I.seeTextEquals(regTitleText, this.h1);
  },
}
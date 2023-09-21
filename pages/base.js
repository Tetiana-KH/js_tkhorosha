const { I } = inject();

module.exports = {
  registerButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[1]/a' },
  shoppingCartIcon: { xpath: '//*[@id="cart"]/button/i' },
  removeProductButton: { xpath: '//*[@id="cart"]/ul/li[1]/div[1]/button[2]/i' },

  clickMyAccount() {
    I.click(this.myAccountSpoiler);
  },

  clickRegister() {
    I.click(this.registerButton);
  },

  async clearCart() {
    I.click(this.shoppingCartIcon);
    const numberOfVisibleElements = await I.grabNumberOfVisibleElements(this.removeProductButton);
    for (let i = 0; i < numberOfVisibleElements; i++) {
    I.click(this.removeProductButton);
    }
  },
}

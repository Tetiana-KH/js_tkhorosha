const { I } = inject();

module.exports = {
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  registerButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[1]/a' },
  shoppingCartButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[5]/a' },
  removeProductButton: { xpath: '//*[@id="content"]/form/div/table/tbody/tr[1]/td[4]/div/span/button[2]' },

  clickMyAccount() {
    I.click(this.myAccountSpoiler);
  },

  clickRegister() {
    I.click(this.registerButton);
  },

  async clearCart() {
    I.click(this.myAccountSpoiler);
    I.click(this.shoppingCartButton);
    const numberOfVisibleElements = await I.grabNumberOfVisibleElements(this.removeProductButton);
    for (let i = 0; i < numberOfVisibleElements; i++) {
    I.click(this.removeProductButton, 5);
    }
  },
}

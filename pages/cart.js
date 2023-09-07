const { I } = inject();

module.exports = {
  termsCheckBox: { xpath: '//*[@id="agree1"]' },
  continuePaymentButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotal: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[1]/td[2]' },
  totalPrice: { xpath: '//*[@id="cart"]/ul/li[2]/div/div[3]/div[2]' },
  flatShippingRate: { xpath: '//*[@id="collapse-shipping-method"]/div/p[3]' },

  payForProduct() {
    I.click(this.termsCheckBox);
    I.click(this.continuePaymentButton);
  },

  parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.-]/g, ''));
  },

  //async getTotalPrice() {
  //  return this.parsePrice(await I.grabTextFrom(this.totalPrice));
  //},

  async getDelivery() {
    console.log('subTotal:', this.parsePrice(await I.grabTextFrom(this.subTotal)));
    console.log('totalPrice:', this.parsePrice(await I.grabTextFrom(this.totalPrice)));
    console.log('flatShippingRate:', this.parsePrice(await I.grabTextFrom(this.flatShippingRate)));
    return this.parsePrice(await I.grabTextFrom(this.subTotal) + this.parsePrice(await I.grabTextFrom(this.flatShippingRate)));
  },

  confirmAndVerifyOrder() {

  }
}

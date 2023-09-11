const { I } = inject();

module.exports = {
  cartIcon: { xpath: '//*[@id="cart"]/button' },
  termsCheckBox: { xpath: '//*[@id="agree1"]' },
  continuePaymentButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotal: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[1]/td[2]' },
  totalPrice: { xpath: '//*[@id="cart"]/ul/li[2]/div/div[3]/div[2]' },
  flatShippingRate: { xpath: '//*[@id="collapse-shipping-method"]/div/p[3]' },
  shippingAndTaxesDropDown: { xpath: '//*[@id="accordion"]/div[2]/div[1]/h4/a' },
  getQuotesButton: { xpath: '//*[@id="button-quote"]' },
  flatRateText: { xpath: '//*[@id="collapse-shipping-method"]/div/p[2]' },
  checkOutButton: { xpath: '//*[@id="cart"]/ul/li[3]/div/a[2]' },
  billingDetailsContinueButton: { xpath: '//*[@id="button-payment-address"]' },
  deliveryDetailsContinueButton: { xpath: '//*[@id="button-shipping-address"]' },
  deliveryMethodContinueButton: { xpath: '//*[@id="button-shipping-method"]' },
  termsCheckbox: { xpath: '//*[@id="agree1"]' },
  paymentMethodContinueButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotalPrice: { xpath: '//table[@id="content"]/div[2]/div/table/tbody/tr/td[@class="text-right"]' },
  flatShippingRate: { xpath: '//td[@class="text-right"]' },
  totalPrice: { xpath: '//*[@id="cart"]/ul/li[2]/div/div[2]/div[2]' },
  confirmOrderButton: { xpath: '//*[@id="button-confirm"]' },

  payForProduct() {
    I.click(this.termsCheckBox);
    I.click(this.continuePaymentButton);
  },

  parsePrice(priceString) {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  },

  async getTotalPrice() {
    return this.parsePrice(await I.grabTextFrom(this.totalPrice));
  },

  async getFlatShippingRate() {
    return this.parsePrice(await I.grabTextFrom(this.flatShippingRate));
  },

  async proceedToCheckOut() {
    I.click(this.cartIcon);
    I.click(this.checkOutButton);
    I.click(this.billingDetailsContinueButton);
    I.click(this.deliveryDetailsContinueButton);
    I.waitForVisible(this.flatRateText, 5);
    I.click(this.deliveryMethodContinueButton);
    I.click(this.termsCheckbox);
    I.click(this.paymentMethodContinueButton);
    I.click(this.confirmOrderButton);
  },

  parsePrice(priceString) {
    console.log('parsed price:', parseFloat(priceString.replace(/[^0-9.]/g, '')));
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  },
}
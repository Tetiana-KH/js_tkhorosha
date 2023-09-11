const { I } = inject();

module.exports = {
  termsCheckBox: { xpath: '//*[@id="agree1"]' },
  continuePaymentButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotal: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[1]/td[2]' },
  totalPrice: { xpath: '//*[@id="cart"]/ul/li[2]/div/div[3]/div[2]' },
  flatShippingRate: { xpath: '//*[@id="collapse-shipping-method"]/div/p[3]' },
  shippingAndTaxesDropDown: { xpath: '//*[@id="accordion"]/div[2]/div[1]/h4/a' },
  getQuotesButton: { xpath: '//*[@id="button-quote"]' },
  flatShippingRateText: { xpath: '//*[@id="modal-shipping"]/div/div/div[2]/div/label' },
  flatShippingRateRadioButton: { xpath: '//*[@id="modal-shipping"]/div/div/div[2]/div/label/input' },
  applyShippingButton: { xpath: '//*[@id="button-shipping"]' },
  checkOutButton: { xpath: '//*[@id="content"]/div[3]/div[2]/a' },
  billingDetailsContinueButton: { xpath: '//*[@id="button-payment-address"]' },
  deliveryDetailsContinueButton: { xpath: '//*[@id="button-shipping-address"]' },
  deliveryMethodContinueButton: { xpath: '//*[@id="button-shipping-method"]' },
  termsCheckbox: { xpath: '//*[@id="agree1"]' },
  paymentMethodContinueButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotalPrice: { xpath: '//table[@id="content"]/div[2]/div/table/tbody/tr/td[@class="text-right"]' },
  flatShippingRate: { xpath: '//td[@class="text-right"]' },
  totalPrice: { xpath: '//table[@id="content"]/div[2]/div/table/tbody/tr/td[2]' },
  confirmOrderButton: { xpath: '//*[@id="content"]/div[3]/div[2]/a' },

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
    I.click(this.shippingAndTaxesDropDown);
    I.click(this.getQuotesButton);
    I.waitForVisible(this.flatShippingRateText, 5);
  },

  async proceedToLastStep() {
    I.click(this.flatShippingRateRadioButton);
    I.click(this.applyShippingButton);
  },

  async completePurchase() {
    I.click(this.checkOutButton);
    I.click(this.billingDetailsContinueButton);
    I.click(this.deliveryDetailsContinueButton);
    I.click(this.deliveryMethodContinueButton);
    I.click(this.termsCheckbox);
    I.click(this.paymentMethodContinueButton);
    I.click(this.confirmOrderButton);
  },

  parsePrice(priceString) {
    console.log('parsed price:', parseFloat(priceString.replace(/[^0-9.]/g, '')));
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  },

  async getTotalPrice() {
    return this.parsePrice(await I.grabTextFrom(this.subTotalPrice)) + this.parsePrice(await I.grabTextFrom(this.flatShippingRate));
  },
}
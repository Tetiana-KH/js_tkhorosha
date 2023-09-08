const { I } = inject();

module.exports = {
  shippingAndTaxesDropDown: { xpath: '//*[@id="accordion"]/div[2]/div[1]/h4/a' },
  getQuotesButton: { xpath: '//*[@id="button-quote"]' },
  flatShippingRateRadioButton: { xpath: '//*[@id="modal-shipping"]/div/div/div[2]/div/label/input' },
  applyShippingButton: { xpath: '//*[@id="button-shipping"]' },
  checkOutButton: { xpath: '//*[@id="content"]/div[3]/div[2]/a' },
  billingDetailsContinueButton: { xpath: '//*[@id="button-payment-address"]' },
  deliveryDetailsContinueButton: { xpath: '//*[@id="button-shipping-address"]' },
  deliveryMethodContinueButton: { xpath: '//*[@id="button-shipping-method"]' },
  termsCheckbox: { xpath: '//*[@id="agree1"]' },
  paymentMethodContinueButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotalPrice: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[1]/td[2]' },
  flatShippingRate: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[2]/td[2]' },
  totalPrice1: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[3]/td[2]' },
  confirmOrderButton: { xpath: '//*[@id="button-confirm"]' },

  proceedToCheckOut() {
    I.click(this.shippingAndTaxesDropDown);
    I.click(this.getQuotesButton);
    I.waitForVisible('//*[@id="modal-shipping"]/div/div/div[2]/div/label', 5);
    I.click(this.flatShippingRateRadioButton);
    I.click(this.applyShippingButton);
    I.click(this.checkOutButton);
    I.click(this.deliveryDetailsContinueButton);
    I.click(this.deliveryMethodContinueButton);
    I.click(this.termsCheckbox);
    I.click(this.paymentMethodContinueButton);
    I.click(this.confirmOrderButton);
  },

  parsePrice(priceString) {
    console.log('parsed price:', parseFloat(priceString.replace(/[^0-9.-]/g, '')));
    return parseFloat(priceString.replace(/[^0-9.-]/g, ''));
  },

  async getProductPrice() {
    return this.parsePrice(await I.grabTextFrom(this.subTotalPrice)) + this.parsePrice(await I.grabTextFrom(this.flatShippingRate));
  },
}
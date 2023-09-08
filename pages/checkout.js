const { I } = inject();

module.exports = {
  billingDetailsDropDown: { xpath: '//*[@id="accordion"]/div[2]/div[1]/h4/a' },
  newAddressRadioButton: { xpath: '//*[@id="payment_addressnew1"]' },
  firstName: { xpath: '//*[@id="input-payment-firstname"]' },
  lastName: { xpath: '//*[@id="input-payment-lastname"]' },
  address1: { xpath: '//*[@id="input-payment-address-1"]' },
  city: { xpath: '//*[@id="input-payment-city"]' },
  postCode: { xpath: '//*[@id="input-payment-postcode"]' },
  country: { xpath: '//*[@id="sbOptions_31838719"]/li[238]/a' },
  stateOption: { xpath: '//*[@id="sbOptions_372522"]/li[6]/a' },
  continueButton: { xpath: '//*[@id="button-payment-address"]' },
  continueButtonDeliveryDetails: { xpath: '//*[@id="button-shipping-address"]' },
  continueButtonDeliveryMethod: { xpath: '//*[@id="button-shipping-method"]' },
  termsCheckbox: { xpath: '//*[@id="agree1"]' },
  continuePaymentButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotalPrice: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[1]/td[2]' },
  flatShippingRate: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[2]/td[2]' },
  totalPrice1: { xpath: '//*[@id="collapse-checkout-confirm"]/div/div[1]/table/tfoot/tr[3]/td[2]' },
  confirmOrderButton: { xpath: '//*[@id="button-confirm"]' },

  proceedToCheckOut() {
    I.click(this.billingDetailsDropDown);
    I.click(this.newAddressRadioButton);
    I.fillField(this.firstName, "Tetiana");
    I.fillField(this.lastName, "33");
    I.fillField(this.address1, "Dubai str 1");
    I.fillField(this.city, "Dubai");
    I.fillField(this.postCode, "08711");
    I.click(this.country);
    I.click(this.stateOption);
    I.click(this.continueButton);
    I.click(this.continueButtonDeliveryDetails);
    I.click(this.continueButtonDeliveryMethod);
    I.click(this.termsCheckbox);
    I.click(this.continuePaymentButton);
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
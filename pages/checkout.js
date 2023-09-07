const { I } = inject();

module.exports = {
  billingDetailsDropDown: { xpath: '//*[@id="accordion"]/div[2]/div[1]/h4/a' },
  addressRadioButton: { xpath: '//*[@id="payment_addressnew1"]' },


  proceedToCheckout() {
    I.click(this.billingDetailsDropDown);
    I.click(this.addressRadioButton);
  },
}

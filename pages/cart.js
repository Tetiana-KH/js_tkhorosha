const { I } = inject();

module.exports = {
  cartIcon: { xpath: '//*[@id="cart"]/button' },
  termsCheckBox: { xpath: '//*[@id="agree1"]' },
  continuePaymentButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotal: { xpath: '//strong[text()="Sub-Total:"]/parent::td/following-sibling::td' },
  totalPrice: { xpath: '//strong[text()="Total:"]/parent::td/following-sibling::td' },
  flatShippingRate: { xpath: '//strong[text()="Flat Shipping Rate:"]/parent::td/following-sibling::td' },
  shippingAndTaxesDropDown: { xpath: '//*[@id="accordion"]/div[2]/div[1]/h4/a' },
  getQuotesButton: { xpath: '//*[@id="button-quote"]' },
  flatRateText: { xpath: '//*[@id="collapse-shipping-method"]/div/p[2]' },
  checkOutButton: { xpath: '//div/a[contains(text(), "Checkout")]' },
  billingDetailsContinueButton: { xpath: '//*[@id="button-payment-address"]' },
  deliveryDetailsContinueButton: { xpath: '//*[@id="button-shipping-address"]' },
  deliveryMethodContinueButton: { xpath: '//*[@id="button-shipping-method"]' },
  termsCheckbox: { xpath: '//*[@id="agree1"]' },
  paymentMethodContinueButton: { xpath: '//*[@id="button-payment-method"]' },
  subTotalPrice: { xpath: '//table[@id="content"]/div[2]/div/table/tbody/tr/td[@class="text-right"]' },
  unavailableProduct: { xpath: '//*[@id="content"]/form/div/table/tbody/tr[1]/td[2]/span' },

  payForProduct() {
    I.click(this.termsCheckBox);
    I.click(this.continuePaymentButton);
  },

  async getTotalPrice() {
    const totalPriceString = await I.grabTextFrom(this.totalPrice);
    const totalPrice = await I.grabPriceFromString(totalPriceString);
    return totalPrice;
  },

  async getFlatShippingRate() {
    const flatShippingRateString = await I.grabTextFrom(this.flatShippingRate);
    const flatShippingRate = await I.grabPriceFromString(flatShippingRateString);
    return flatShippingRate;
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
  },

  async parsePrice(priceString) {
    const price = await I.grabPriceFromString(priceString);
    console.log('total price:', price);
    return price;
  },

  async isProductUnavailable() {
    return await tryTo(() => I.seeElement(this.unavailableProduct));
  },

  async throwNewError() {
    if (!(await this.isProductUnavailable())) {
      throw new Error("Product is n/a");
    }
  },
}
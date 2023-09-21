const { I } = inject();

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div/ul/li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },
  productPriceText: { xpath: '//*[@id="content"]/div[1]/div[2]/div/div[1]/span' },
  flatShippingRate: { xpath: '//td[@class="text-right"]' },
  addToCartButton: { xpath: '//*[@id="button-cart"]' },
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  shoppingCartButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[5]/a' },

  async selectColor() {
    if (await this.checkColorExists()) {
      I.click(this.colorDropDown);
      I.click(this.colorOption);
    }
  },

  async selectSize() {
    if (await this.checkSizeExists()) {
      I.click(this.sizeDropDown);
      I.click(this.sizeOption);
    }
  },

  async checkColorExists() {
    return Boolean(await I.grabNumberOfVisibleElements(this.colorDropDown));
  },

  async checkSizeExists() {
    return await tryTo(() => I.seeElement(this.sizeDropDown));
  },

  parsePrice(priceString) {
    console.log('product price:', parseFloat(priceString.replace(/[^0-9.]/g, '')));
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  },

  async getProductPrice() {
    let totalPrice = this.parsePrice(await I.grabTextFrom(this.productPriceText));
    if (await this.checkColorExists()) {
      I.click(this.colorDropDown);
      I.click(this.colorOption);
      totalPrice += this.parsePrice(await I.grabTextFrom(this.colorOption));
    }
    if (await this.checkSizeExists()) {
      I.click(this.sizeDropDown);
      I.click(this.sizeOption);
      totalPrice += this.parsePrice(await I.grabTextFrom(this.sizeOption));
    }
    return totalPrice;
  },

  addToCart() {
    I.click(this.addToCartButton);
  },
}
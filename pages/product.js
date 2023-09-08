const { I } = inject();

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div/ul/li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },
  productPriceText: { xpath: '//*[@id="content"]/div[1]/div[2]/div/div[1]/span[1]' },
  addToCartButton: { xpath: '//*[@id="button-cart"]' },
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  shoppingCartButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[5]/a' },

  selectColor() {
    I.click(this.colorDropDown);
    I.click(this.colorOption);
  },

  selectSize() {
    I.click(this.sizeDropDown);
    I.click(this.sizeOption);
  },

  parsePrice(priceString) {
    console.log('parsed price:', parseFloat(priceString.replace(/[^0-9.-]/g, '')));
    return parseFloat(priceString.replace(/[^0-9.-]/g, ''));
  },

  async getProductPrice() {
    return this.parsePrice(await I.grabTextFrom(this.productPriceText)) + this.parsePrice(await I.grabTextFrom(this.colorOption)) + this.parsePrice(await I.grabTextFrom(this.sizeOption));
  },

  addToCart() {
    I.click(this.addToCartButton);
    I.click(this.myAccountSpoiler);
    I.click(this.shoppingCartButton);
  },
}
const { I } = inject();
const { grabPriceFromString } = require('../helpers/pricegrabber_helper');
const elementChecker = require('../helpers/elementChecker_helper');

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div/ul/li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },
  productPriceText: { xpath: '//div[@id="content"]//div[@class="price"]/span' },
  flatShippingRate: { xpath: '//td[@class="text-right"]' },
  addToCartButton: { xpath: '//*[@id="button-cart"]' },
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  shoppingCartButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[5]/a' },
  
  async selectColor() {
    if (await this.checkIfColorDropdownExists()) {
      I.click(this.colorDropDown);
      I.click(this.colorOption);
    }
  },

  async selectSize() {
    if (await this.checkIfSizeDropdownExists()) {
      I.click(this.sizeDropDown);
      I.click(this.sizeOption);
    }
  },

async getProductPrice() {
  const productPrice = await I.grabTextFrom(this.productPriceText);
  const colorPrice = await I.grabTextFrom(this.colorOption);
  const parsedColorPrice = await grabPriceFromString(colorPrice);
  const sizePrice = await I.grabTextFrom(this.sizeOption);
  return parsedColorPrice;
},

async checkIfColorDropdownExists() {
  const colorDropdownExists = await elementChecker.tryElementExist(this.colorDropDown);
  return colorDropdownExists;
},

async checkIfSizeDropdownExists() {
  const sizeDropdownExists = await elementChecker.tryElementExist(this.sizeDropDown);
  return sizeDropdownExists;
},

  addToCart() {
    I.click(this.addToCartButton);
  },
}
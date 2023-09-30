const { I } = inject();
const PriceGrabber = require('../helpers/pricegrabber_helper');
const elementChecker = require('../helpers/elementChecker_helper');
const ElementChecker = require('../helpers/elementChecker_helper');

module.exports = {
  colorDropDown: { xpath: '//label[text()="Color"]/following-sibling::div/a[1]' },
  sizeDropDown: { xpath: '//label[text()="Size"]/following-sibling::div/a[1]' },
  colorOption: { xpath: '//label[text()="Color"]/following-sibling::div//li[2]' },
  sizeOption: { xpath: '//label[text()="Size"]/following-sibling::div/ul/li[2]' },
  productPriceText: { xpath: '//div[@id="content"]//div[@class="price"]/span' },
  flatShippingRate: { xpath: '//td[@class="text-right"]' },
  addToCartButton: { xpath: '//*[@id="button-cart"]' },
  myAccountSpoiler: { xpath: '//*[@id="top-links"]/ul/li/span/span' },
  shoppingCartButton: { xpath: '//*[@id="top-links"]/ul/li/ul/li[5]/a' },

  /* async selectColor() {
    if (await this.checkIfColorDropdownExists()) {
      await I.waitForElement(this.colorOption);
      I.click(this.colorOption);
    }
  },

  async selectSize() {
    if (await this.checkIfSizeDropdownExists()) {
      await I.waitForElement(this.sizeOption);
      I.click(this.sizeOption);
    }
  }, */

  /* async getProductPrice() {
    const priceGrabber = new PriceGrabber(this.helpers);
    const parsedProductPrice = await priceGrabber.grabPriceFromString(await I.grabTextFrom(this.productPriceText));
    const colorPrice = await I.grabTextFrom(this.colorOption);
    const parsedColorPrice = await priceGrabber.grabPriceFromString(colorPrice);
    const sizePrice = await I.grabTextFrom(this.sizeOption);
    const parsedSizePrice = await priceGrabber.grabPriceFromString(sizePrice);
    const totalPrice = parsedProductPrice + parsedColorPrice + parsedSizePrice;
    return totalPrice;
  }, */

  async getProductPrice() {
    const priceGrabber = new PriceGrabber(this.helpers);
    const parsedProductPrice = await priceGrabber.grabPriceFromString(await I.grabTextFrom(this.productPriceText));
    let totalPrice = parsedProductPrice;
    const elementChecker = new ElementChecker(this.helpers);
    const colorExists = await elementChecker.tryElementExist(this.colorDropDown);
    const sizeExists = await elementChecker.tryElementExist(this.sizeDropDown);
    if (colorExists) {
      const colorPrice = await I.grabTextFrom(this.colorOption);
      const parsedColorPrice = await priceGrabber.grabPriceFromString(colorPrice);
      totalPrice += parsedColorPrice;
    }
    if (sizeExists) {
      const sizePrice = await I.grabTextFrom(this.sizeOption);
      const parsedSizePrice = await priceGrabber.grabPriceFromString(sizePrice);
      totalPrice += parsedSizePrice;
    }
    return totalPrice;
  },

  /* async checkIfColorDropdownExists() {
    const colorDropdownExists = await elementChecker.tryElementExist(this.colorDropDown);
    return colorDropdownExists;
  },

  async checkIfSizeDropdownExists() {
    const sizeDropdownExists = await elementChecker.tryElementExist(this.sizeDropDown);
    return sizeDropdownExists;
  }, */

  async addProductToCart() {
    const colorExists = await elementChecker.tryElementExist(this.colorDropDown);
    const sizeExists = await elementChecker.tryElementExist(this.sizeDropDown);
    if (colorExists && sizeExists) {
      I.click(this.colorOption);
      I.click(this.sizeOption);
      I.click(this.addToCartButton);
    } else if (colorExists) {
      I.click(this.colorOption);
      I.click(this.addToCartButton);
    } else if (sizeExists) {
      I.click(this.sizeOption);
      I.click(this.addToCartButton);
    } else {
      I.click(this.addToCartButton);
    }
  },
}